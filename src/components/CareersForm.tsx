"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ChevronRight, Upload } from "lucide-react";
import { showSuccess, showError } from "@/utils/toast";
import { submitCareerForm, NocoDBCareer } from "@/hooks/useCareersData";

const careerSchema = z.object({
  Nome: z.string().min(2, "O nome deve ter pelo menos 2 caracteres."),
  Email: z.string().email("Insira um e-mail válido."),
  Telefone: z.string().min(10, "O telefone deve ter pelo menos 10 dígitos."),
  Cargo: z.string().min(1, "O cargo é obrigatório."),
  Mensagem: z.string().min(10, "A mensagem deve ter pelo menos 10 caracteres."),
  Curriculo: z.string().url("Insira uma URL válida para o currículo (Google Drive, Dropbox, etc).").min(1, "O link do currículo é obrigatório."),
});

type CareerFormData = z.infer<typeof careerSchema>;

const CareersForm: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const onSubmit = async (data: CareerFormData) => {
    setIsSubmitting(true);
    try {
      // Fazemos o cast para NocoDBCareer pois o schema do Zod garante que todos os campos obrigatórios estão presentes
      await submitCareerForm(data as NocoDBCareer);
      showSuccess("Candidatura enviada com sucesso! Boa sorte.");
      form.reset();
    } catch (error) {
      showError("Erro ao enviar candidatura. Tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-zinc-950/50 border border-white/10 p-8 md:p-12 relative overflow-hidden">
      {/* Decorative background element */}
      <div className="absolute top-0 right-0 p-4 opacity-5">
        <Upload size={120} className="text-white" />
      </div>

      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-2">
            <Label htmlFor="Nome" className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40">Nome Completo</Label>
            <Input 
              id="Nome" 
              {...form.register("Nome")} 
              className="bg-white/5 border-white/10 rounded-none h-12 focus:border-white/30 transition-all"
              placeholder="SEU NOME"
            />
            {form.formState.errors.Nome && <p className="text-[10px] text-red-500 font-bold uppercase">{form.formState.errors.Nome.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="Email" className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40">E-mail de Contato</Label>
            <Input 
              id="Email" 
              type="email" 
              {...form.register("Email")} 
              className="bg-white/5 border-white/10 rounded-none h-12 focus:border-white/30 transition-all"
              placeholder="EMAIL@EXEMPLO.COM"
            />
            {form.formState.errors.Email && <p className="text-[10px] text-red-500 font-bold uppercase">{form.formState.errors.Email.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="Telefone" className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40">WhatsApp / Telefone</Label>
            <Input 
              id="Telefone" 
              {...form.register("Telefone")} 
              className="bg-white/5 border-white/10 rounded-none h-12 focus:border-white/30 transition-all"
              placeholder="(00) 00000-0000"
            />
            {form.formState.errors.Telefone && <p className="text-[10px] text-red-500 font-bold uppercase">{form.formState.errors.Telefone.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="Cargo" className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40">Cargo Desejado</Label>
            <Input 
              id="Cargo" 
              {...form.register("Cargo")} 
              className="bg-white/5 border-white/10 rounded-none h-12 focus:border-white/30 transition-all"
              placeholder="EX: INSTRUTOR, RECEPÇÃO"
            />
            {form.formState.errors.Cargo && <p className="text-[10px] text-red-500 font-bold uppercase">{form.formState.errors.Cargo.message}</p>}
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="Curriculo" className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40">Link do Currículo (PDF Online)</Label>
          <Input 
            id="Curriculo" 
            {...form.register("Curriculo")} 
            className="bg-white/5 border-white/10 rounded-none h-12 focus:border-white/30 transition-all"
            placeholder="HTTPS://DRIVE.GOOGLE.COM/..."
          />
          <p className="text-[9px] text-white/20 uppercase tracking-widest">Dica: Use Google Drive ou Dropbox e certifique-se que o link é público.</p>
          {form.formState.errors.Curriculo && <p className="text-[10px] text-red-500 font-bold uppercase">{form.formState.errors.Curriculo.message}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="Mensagem" className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40">Por que você quer ser DARK'S?</Label>
          <Textarea 
            id="Mensagem" 
            rows={4} 
            {...form.register("Mensagem")} 
            className="bg-white/5 border-white/10 rounded-none focus:border-white/30 transition-all resize-none"
            placeholder="CONTE-NOS SUA TRAJETÓRIA..."
          />
          {form.formState.errors.Mensagem && <p className="text-[10px] text-red-500 font-bold uppercase">{form.formState.errors.Mensagem.message}</p>}
        </div>

        <Button 
          type="submit" 
          disabled={isSubmitting}
          className="w-full h-16 rounded-none bg-white text-black font-black text-lg uppercase tracking-[0.2em] hover:bg-zinc-200 transition-all group"
        >
          {isSubmitting ? "ENVIANDO..." : "ENVIAR CANDIDATURA"}
          {!isSubmitting && <ChevronRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-2" />}
        </Button>
      </form>
    </div>
  );
};

export default CareersForm;