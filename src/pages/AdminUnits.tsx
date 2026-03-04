"use client";

import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Loader2, Edit, Trash2, RefreshCw } from "lucide-react";
import { cn } from "@/lib/utils";
import { showSuccess, showError } from "@/utils/toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { NocoDBUnit } from "@/hooks/useUnitsData";

const NOCODB_API_BASE_URL = "https://auto-nocodb.fesqdn.easypanel.host/api/v2/tables";
const NOCODB_TABLE_ID = "m02vprrpto5vac3";
const NOCODB_VIEW_ID = "vw97xyuevbzk8sj0";
const NOCODB_API_TOKEN = import.meta.env.VITE_NOCODB_API_TOKEN; // Usando variável de ambiente

const headers = {
  "Content-Type": "application/json",
  "xc-token": NOCODB_API_TOKEN,
};

const unitSchema = z.object({
  Id: z.number().optional(),
  Unidade: z.string().min(1, "O nome da unidade é obrigatório."),
  Endereco: z.string().min(1, "O endereço é obrigatório."),
  Horario: z.string().optional(),
  Modalidade: z.string().optional(),
  Foto: z.string().url("URL da foto inválida.").or(z.literal("")).optional(),
  WhatsApp: z.string().optional(),
  Descricao: z.string().optional(),
  Latitude: z.coerce.number().min(-90).max(90).optional(),
  Longitude: z.coerce.number().min(-180).max(180).optional(),
  Status: z.enum(["Ativo", "Inativo", "Em Manutenção"]).optional(),
  DataCadastro: z.string().optional(),
  Promocao: z.boolean().optional(),
  Instagram: z.string().url("URL do Instagram inválida.").or(z.literal("")).optional(),
  'Link de compra': z.string().url("URL do link de compra inválida.").or(z.literal("")).optional(),
  'Em Breve': z.boolean().optional(),
  idBranch: z.coerce.number().optional(), // NOVO: ID da filial da API EVO
});

type UnitFormData = z.infer<typeof unitSchema>;

const AdminUnits: React.FC = () => {
  const queryClient = useQueryClient();
  const [editingUnitId, setEditingUnitId] = useState<number | null>(null);

  const form = useForm<UnitFormData>({
    resolver: zodResolver(unitSchema),
    defaultValues: {
      Unidade: "",
      Endereco: "",
      Horario: "",
      Modalidade: "",
      Foto: "",
      WhatsApp: "",
      Descricao: "",
      Latitude: undefined,
      Longitude: undefined,
      Status: "Ativo",
      DataCadastro: "",
      Promocao: false,
      Instagram: "",
      'Link de compra': "",
      'Em Breve': false,
      idBranch: undefined, // NOVO: Valor padrão
    },
  });

  const { data: units, isLoading, isError, refetch } = useQuery<NocoDBUnit[], Error>({
    queryKey: ["adminUnits"],
    queryFn: async () => {
      const url = `${NOCODB_API_BASE_URL}/${NOCODB_TABLE_ID}/records?viewId=${NOCODB_VIEW_ID}&limit=100&sort=-Id`;
      const response = await fetch(url, { headers });
      if (!response.ok) {
        throw new Error(`Erro ao carregar unidades: ${response.statusText}`);
      }
      const data = await response.json();
      return data.list || [];
    },
  });

  const addUnitMutation = useMutation<any, Error, UnitFormData>({
    mutationFn: async (newUnit) => {
      const url = `${NOCODB_API_BASE_URL}/${NOCODB_TABLE_ID}/records`;
      const response = await fetch(url, {
        method: "POST",
        headers,
        body: JSON.stringify([newUnit]),
      });
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Erro ao criar unidade: ${errorText}`);
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["adminUnits"] });
      queryClient.invalidateQueries({ queryKey: ["unitsData"] });
      showSuccess("Unidade criada com sucesso!");
      form.reset();
      setEditingUnitId(null);
    },
    onError: (error) => {
      showError(`Erro ao criar unidade: ${error.message}`);
    },
  });

  const updateUnitMutation = useMutation<any, Error, UnitFormData>({
    mutationFn: async (updatedUnit) => {
      const url = `${NOCODB_API_BASE_URL}/${NOCODB_TABLE_ID}/records`;
      const payload = [{ Id: updatedUnit.Id, ...updatedUnit }];
      const response = await fetch(url, {
        method: "PATCH",
        headers,
        body: JSON.stringify(payload),
      });
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Erro ao atualizar unidade: ${errorText}`);
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["adminUnits"] });
      queryClient.invalidateQueries({ queryKey: ["unitsData"] });
      showSuccess("Unidade atualizada com sucesso!");
      form.reset();
      setEditingUnitId(null);
    },
    onError: (error) => {
      showError(`Erro ao atualizar unidade: ${error.message}`);
    },
  });

  const deleteUnitMutation = useMutation<any, Error, number>({
    mutationFn: async (unitId) => {
      const url = `${NOCODB_API_BASE_URL}/${NOCODB_TABLE_ID}/records`;
      const payload = [{ Id: unitId }];
      const response = await fetch(url, {
        method: "DELETE",
        headers,
        body: JSON.stringify(payload),
      });
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Erro ao excluir unidade: ${errorText}`);
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["adminUnits"] });
      queryClient.invalidateQueries({ queryKey: ["unitsData"] });
      showSuccess("Unidade excluída com sucesso!");
    },
    onError: (error) => {
      showError(`Erro ao excluir unidade: ${error.message}`);
    },
  });

  const onSubmit = (data: UnitFormData) => {
    if (editingUnitId) {
      updateUnitMutation.mutate({ ...data, Id: editingUnitId });
    } else {
      addUnitMutation.mutate({ ...data, DataCadastro: new Date().toISOString().split('T')[0] });
    }
  };

  const handleEdit = (unit: NocoDBUnit) => {
    setEditingUnitId(unit.Id);
    // Aplicando cast para o Status para resolver o erro de tipagem
    form.reset({
      ...unit,
      Status: unit.Status as "Ativo" | "Inativo" | "Em Manutenção" | undefined,
      Latitude: unit.Latitude || undefined,
      Longitude: unit.Longitude || undefined,
      Promocao: unit.Promocao || false,
      'Em Breve': unit['Em Breve'] || false,
      idBranch: unit.idBranch || undefined, // NOVO: Carrega o idBranch
    });
    showSuccess(`Editando unidade: ${unit.Unidade}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleClearForm = () => {
    form.reset();
    setEditingUnitId(null);
    showSuccess("Formulário limpo.");
  };

  const formatWhatsApp = (whatsapp?: string) => {
    if (!whatsapp) return "-";
    const numbers = whatsapp.replace(/\D/g, "");
    if (numbers.length === 11) {
      return `(${numbers.substring(0, 2)}) ${numbers.substring(2, 7)}-${numbers.substring(7)}`;
    }
    return whatsapp;
  };

  const createMapsLink = (lat?: number, lng?: number) => {
    if (!lat || !lng) return "-";
    return (
      <a
        href={`https://maps.google.com/?q=${lat},${lng}`}
        target="_blank"
        rel="noopener noreferrer"
        className="text-primary hover:underline"
      >
        Ver no Maps
      </a>
    );
  };

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <h1 className="text-4xl font-bold text-center mb-8 font-display gradient-text">
        Gerenciamento de Unidades
      </h1>
      
      <Card className="mb-12 p-6 md:p-8">
        <CardHeader className="p-0 mb-6">
          <CardTitle className="text-2xl font-bold text-primary">
            {editingUnitId ? "Editar Unidade" : "Adicionar Nova Unidade"}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div>
                <Label htmlFor="Unidade">Unidade</Label>
                <Input id="Unidade" {...form.register("Unidade")} />
              </div>
              <div>
                <Label htmlFor="Endereco">Endereço</Label>
                <Input id="Endereco" {...form.register("Endereco")} />
              </div>
              <div>
                <Label htmlFor="Horario">Horário</Label>
                <Input id="Horario" {...form.register("Horario")} />
              </div>
              <div>
                <Label htmlFor="Foto">URL Foto</Label>
                <Input id="Foto" {...form.register("Foto")} />
              </div>
              <div>
                <Label htmlFor="WhatsApp">WhatsApp</Label>
                <Input id="WhatsApp" {...form.register("WhatsApp")} />
              </div>
              <div>
                <Label htmlFor="Instagram">Instagram</Label>
                <Input id="Instagram" {...form.register("Instagram")} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="Latitude">Latitude</Label>
                  <Input id="Latitude" type="number" step="any" {...form.register("Latitude")} />
                </div>
                <div>
                  <Label htmlFor="Longitude">Longitude</Label>
                  <Input id="Longitude" type="number" step="any" {...form.register("Longitude")} />
                </div>
              </div>
              <div>
                <Label htmlFor="idBranch">ID Filial (EVO API)</Label> {/* NOVO CAMPO */}
                <Input id="idBranch" type="number" {...form.register("idBranch")} />
              </div>
              <div>
                <Label htmlFor="Status">Status</Label>
                <Select
                  onValueChange={(value) => form.setValue("Status", value as "Ativo" | "Inativo" | "Em Manutenção")}
                  value={form.watch("Status")}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Ativo">Ativo</SelectItem>
                    <SelectItem value="Inativo">Inativo</SelectItem>
                    <SelectItem value="Em Manutenção">Em Manutenção</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="Promocao"
                  checked={form.watch("Promocao")}
                  onCheckedChange={(checked) => form.setValue("Promocao", checked)}
                />
                <Label htmlFor="Promocao">Promoção</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="Em Breve"
                  checked={form.watch("Em Breve")}
                  onCheckedChange={(checked) => form.setValue("Em Breve", checked)}
                />
                <Label htmlFor="Em Breve">Em Breve</Label>
              </div>
            </div>

            <div className="flex gap-4 pt-4 border-t">
              <Button type="submit" disabled={addUnitMutation.isPending || updateUnitMutation.isPending}>
                {editingUnitId ? "Atualizar" : "Salvar"}
              </Button>
              <Button type="button" variant="outline" onClick={handleClearForm}>Limpar</Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <Card className="p-6 md:p-8">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Unidade</TableHead>
                <TableHead>Endereço</TableHead>
                <TableHead>ID Filial</TableHead> {/* NOVO: Coluna na tabela */}
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {units?.map((unit) => (
                <TableRow key={unit.Id}>
                  <TableCell>{unit.Unidade}</TableCell>
                  <TableCell>{unit.Endereco}</TableCell>
                  <TableCell>{unit.idBranch || "-"}</TableCell> {/* NOVO: Exibe o idBranch */}
                  <TableCell className="flex gap-2">
                    <Button variant="outline" size="icon" onClick={() => handleEdit(unit)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="destructive" size="icon">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Excluir?</AlertDialogTitle>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Não</AlertDialogCancel>
                          <AlertDialogAction onClick={() => deleteUnitMutation.mutate(unit.Id)}>Sim</AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminUnits;