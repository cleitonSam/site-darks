"use client";

import React from "react";
import { useCareersData, NOCODB_CAREERS_TABLE_ID } from "@/hooks/useCareersData";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Trash2, Mail, Phone, AlertCircle } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const AdminCareers: React.FC = () => {
  const queryClient = useQueryClient();
  const { data: careers, isLoading, isError, error } = useCareersData();

  const deleteCareer = async (id: number | undefined) => {
    if (!id) return;

    const url = `https://auto-nocodb.fesqdn.easypanel.host/api/v2/tables/${NOCODB_CAREERS_TABLE_ID}/records`;
    const payload = [{ Id: id }];

    try {
      const response = await fetch(url, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "xc-token": "nrUcWLti4g7sq9DDozerYytubAt8_7lvFEw0Ek6H",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error("Erro ao excluir");

      queryClient.invalidateQueries({ queryKey: ["careersData"] });
      showSuccess("Candidatura removida.");
    } catch (error) {
      showError("Erro ao excluir candidatura.");
    }
  };

  if (isLoading) return <div className="p-20 text-center text-white/50">Carregando...</div>;

  if (isError) {
    return (
      <div className="container mx-auto p-20 text-center">
        <AlertCircle className="mx-auto h-12 w-12 text-destructive mb-4" />
        <h2 className="text-2xl font-bold text-white mb-2">Erro de Conexão</h2>
        <p className="text-white/50 mb-4">{error?.message}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex justify-between items-center mb-12">
        <h1 className="text-4xl font-black italic uppercase tracking-tighter text-white">
          Gestão de <span className="text-white/20">Talentos</span>
        </h1>
        <Badge variant="outline" className="text-white/40 border-white/10">
          {careers?.length || 0} Candidaturas
        </Badge>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {careers?.length === 0 ? (
          <div className="text-center py-20 border border-dashed border-white/10 rounded-xl">
            <p className="text-white/30 uppercase tracking-widest font-bold">Nenhuma candidatura encontrada</p>
          </div>
        ) : (
          careers?.map((career) => (
            <Card key={career.Id} className="bg-zinc-950 border-white/5 overflow-hidden">
              <CardHeader className="border-b border-white/5 bg-white/[0.02] flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="text-xl font-bold text-white uppercase italic">{career.Nome}</CardTitle>
                  <p className="text-xs font-black text-primary uppercase tracking-widest mt-1">{career["Currículo"]}</p>
                </div>
                <div className="flex gap-2">
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button size="sm" variant="destructive">
                        <Trash2 size={14} />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent className="bg-zinc-950 border-white/10">
                      <AlertDialogHeader>
                        <AlertDialogTitle className="text-white">Remover Candidatura?</AlertDialogTitle>
                        <AlertDialogDescription className="text-white/50">
                          Esta ação não pode ser desfeita.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel className="bg-transparent border-white/10 text-white">Cancelar</AlertDialogCancel>
                        <AlertDialogAction onClick={() => deleteCareer(career.Id)} className="bg-red-600 text-white">Remover</AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </CardHeader>
              <CardContent className="p-6 grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-white/70">
                    <Mail size={16} className="text-white/30" />
                    <span className="text-sm">{career["E-mail"]}</span>
                  </div>
                  <div className="flex items-center gap-3 text-white/70">
                    <Phone size={16} className="text-white/30" />
                    <span className="text-sm">{career.Telefone}</span>
                  </div>
                </div>
                <div className="md:col-span-2">
                  <span className="text-[10px] font-black text-white/20 uppercase tracking-widest">Motivo / Apresentação</span>
                  <p className="text-sm text-white/70 leading-relaxed mt-2 bg-white/[0.02] p-4 rounded-lg border border-white/5">
                    {career.Motivo}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default AdminCareers;