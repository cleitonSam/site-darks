"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { showSuccess, showError } from "@/utils/toast";
import { submitCareerForm, NocoDBCareer } from "@/hooks/useCareersData";

const careerSchema = z.object({
  Nome: z.string().min(2, "O nome deve ter pelo menos 2 caracteres."),
  Email: z.string().email("Insira um e-mail válido."),
  Telefone: z.string().min(10, "O telefone deve ter pelo menos 10 dígitos."),
  Cargo: z.string().min(1, "O cargo é obrigatório."),
  Mensagem: z.string().min(10, "A mensagem deve ter pelo menos 10 caracteres."),
  Curriculo: z.string().url("Insira uma URL válida para o currículo.").min(1, "O currículo é obrigatório."),
});

type CareerFormData = z.infer<typeof careerSchema>;

const CareersForm: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [fileUrl, setFileUrl] = useState<string | null>(null);

  const form = useForm<CareerFormData>({
    resolver: zodResolver(careerSchema),
    defaultValues: {
      Nome: "",
      Email: "",
      Telefone: "",
      Cargo: "",
      Mensagem: "",
      Curriculo: "",
    },
  });

  const onFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Criar URL temporária para o arquivo
    const fileUrl = URL.createObjectURL(file);
    setFileUrl(fileUrl);

    // Simular upload para um serviço de armazenamento
    // Aqui você precisaria integrar com um serviço real como AWS S3, Cloudinary, etc.
    // Para este exemplo, vamos apenas usar a URL temporária
    form.setValue("Curriculo", fileUrl);
  };

  const onSubmit = async (data: CareerFormData) => {
    setIsSubmitting(true);

    try {
      // Cast data to NocoDBCareer to satisfy TypeScript
      await submitCareerForm(data as NocoDBCareer);
      showSuccess("Formulário enviado com sucesso! Entraremos em contato em breve.");
      form.reset();
      setFileUrl(null);
    } catch (error) {
      showError(`Erro ao enviar formulário: ${error instanceof Error ? error.message : 'Erro desconhecido'}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-zinc-950/50 border border-white/10 rounded-xl p-8">
      <h3 className="text-2xl font-bold text-white mb-6">Trabalhe Conosco</h3>
      
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label htmlFor="Nome">Nome Completo</Label>
            <Input id="Nome" {...form.register("Nome")} />
          </div>
          <div>
            <Label htmlFor="Email">E-mail</Label>
            <Input id="Email" type="email" {...form.register("Email")} />
          </div>
          <div>
            <Label htmlFor="Telefone">Telefone</Label>
            <Input id="Telefone" type="tel" placeholder="(00) 00000-0000" {...form.register("Telefone")} />
          </div>
          <div>
            <Label htmlFor="Cargo">Cargo Desejado</Label>
            <Input id="Cargo" {...form.register("Cargo")} />
          </div>
        </div>

        <div>
          <Label htmlFor="Mensagem">Mensagem</Label>
          <Textarea id="Mensagem" rows={4} {...form.register("Mensagem")} />
        </div>

        <div>
          <Label htmlFor="Curriculo">Currículo (PDF, DOCX, ou link)</Label>
          <div className="flex items-center gap-3">
            <input
              type="file"
              id="Curriculo"
              accept=".pdf,.doc,.docx,.txt"
              onChange={onFileSelect}
              className="hidden"
            />
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => document.getElementById('Curriculo')?.click()}
            >
              {fileUrl ? "Trocar Arquivo" : "Selecionar Arquivo"}
            </Button>
            {fileUrl && (
              <Badge variant="secondary">{fileUrl.split('/').pop()?.split('?')[0] || "Arquivo selecionado"}</Badge>
            )}
          </div>
        </div>

        <Button 
          type="submit" 
          disabled={isSubmitting}
          className="w-full"
        >
          {isSubmitting ? "Enviando..." : "Enviar Formulário"}
        </Button>
      </form>
    </div>
  );
};

export default CareersForm;