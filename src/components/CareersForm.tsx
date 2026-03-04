"use client";

import React, { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ChevronRight, Paperclip, X } from "lucide-react";
import { showSuccess, showError } from "@/utils/toast";
import { submitCareerForm, uploadFile, NocoDBCareer } from "@/hooks/useCareersData";

const careerSchema = z.object({
  Nome: z.string().min(2, "O nome deve ter pelo menos 2 caracteres."),
  Email: z.string().email("Insira um e-mail válido."),
  Telefone: z.string().min(10, "O telefone deve ter pelo menos 10 dígitos."),
  Mensagem: z.string().min(10, "A mensagem deve ter pelo menos 10 caracteres."),
});

type CareerFormData = z.infer<typeof careerSchema>;

const CareersForm: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const form = useForm<CareerFormData>({
    resolver: zodResolver(careerSchema),
    defaultValues: {
      Nome: "",
      Email: "",
      Telefone: "",
      Mensagem: "",
    },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.size > 5 * 1024 * 1024) {
        showError("O arquivo deve ter no máximo 5MB.");
        return;
      }
      setSelectedFile(file);
    }
  };

  const removeFile = () => {
    setSelectedFile(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const onSubmit = async (data: CareerFormData) => {
    if (!selectedFile) {
      showError("Por favor, anexe seu currículo.");
      return;
    }

    setIsSubmitting(true);
    try {
      // 1. Upload do arquivo para o NocoDB
      const uploadResponse = await uploadFile(selectedFile);
      
      // 2. Envio dos dados com a referência do arquivo
      const payload: NocoDBCareer = {
        Nome: data.Nome,
        "E-mail": data.Email,
        Telefone: data.Telefone,
        "Currículo": uploadResponse, // O NocoDB espera o array/objeto retornado pelo upload
        Motivo: data.Mensagem,
      };

      await submitCareerForm(payload);
      showSuccess("Candidatura enviada com sucesso!");
      form.reset();
      removeFile();
    } catch (error: any) {
      console.error(error);
      showError(`Erro ao enviar candidatura: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-zinc-950/50 border border-white/10 p-8 md:p-12 relative overflow-hidden">
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

          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="Telefone" className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40">WhatsApp / Telefone</Label>
            <Input 
              id="Telefone" 
              {...form.register("Telefone")} 
              className="bg-white/5 border-white/10 rounded-none h-12 focus:border-white/30 transition-all"
              placeholder="(00) 00000-0000"
            />
            {form.formState.errors.Telefone && <p className="text-[10px] text-red-500 font-bold uppercase">{form.formState.errors.Telefone.message}</p>}
          </div>
        </div>

        <div className="space-y-4">
          <Label className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40">Anexar Currículo (PDF ou DOCX)</Label>
          
          {!selectedFile ? (
            <div 
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-white/10 p-8 text-center cursor-pointer hover:border-white/30 transition-all bg-white/[0.02]"
            >
              <Paperclip className="mx-auto h-8 w-8 text-white/20 mb-2" />
              <p className="text-xs font-bold text-white/40 uppercase tracking-widest">Clique para selecionar o arquivo</p>
              <p className="text-[9px] text-white/20 mt-1">PDF, DOCX (MÁX. 5MB)</p>
            </div>
          ) : (
            <div className="flex items-center justify-between p-4 bg-white/5 border border-white/20">
              <div className="flex items-center gap-3">
                <Paperclip className="h-4 w-4 text-primary" />
                <span className="text-xs font-bold text-white uppercase truncate max-w-[200px]">{selectedFile.name}</span>
              </div>
              <button type="button" onClick={removeFile} className="text-white/40 hover:text-red-500 transition-colors">
                <X size={16} />
              </button>
            </div>
          )}
          
          <input 
            type="file" 
            ref={fileInputRef}
            onChange={handleFileChange}
            accept=".pdf,.doc,.docx"
            className="hidden"
          />
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