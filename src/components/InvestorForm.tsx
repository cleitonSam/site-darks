"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ChevronRight, TrendingUp } from "lucide-react";
import { showSuccess, showError } from "@/utils/toast";
import { submitInvestorForm, NocoDBInvestor } from "@/hooks/useInvestorData";

const investorSchema = z.object({
  Nome: z.string().min(2, "O nome deve ter pelo menos 2 caracteres."),
  Sobrenome: z.string().min(2, "O sobrenome deve ter pelo menos 2 caracteres."),
  Email: z.string().email("Insira um e-mail válido."),
  WhatsApp: z.string().min(10, "O WhatsApp deve ter pelo menos 10 dígitos."),
  Investimento: z.string().min(1, "Selecione um valor de investimento."),
});

type InvestorFormData = z.infer<typeof investorSchema>;

const VALORES_INVESTIMENTO = [
  "R$ 400.000",
  "R$ 600.000",
  "R$ 800.000",
  "R$ 1.000.000",
  "R$ 2.000.000",
];

const InvestorForm: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<InvestorFormData>({
    resolver: zodResolver(investorSchema),
    defaultValues: {
      Nome: "",
      Sobrenome: "",
      Email: "",
      WhatsApp: "",
      Investimento: "",
    },
  });

  const onSubmit = async (data: InvestorFormData) => {
    setIsSubmitting(true);
    try {
      const payload: NocoDBInvestor = {
        Nome: data.Nome,
        Sobrenome: data.Sobrenome,
        Email: data.Email,
        WhatsApp: data.WhatsApp,
        Investimento: data.Investimento,
      };

      await submitInvestorForm(payload);
      showSuccess("Interesse registrado com sucesso! Nossa equipe entrará em contato.");
      form.reset();
    } catch (error: any) {
      showError(`Erro ao enviar dados: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-zinc-950/50 border border-white/10 p-8 md:p-12 relative overflow-hidden">
      <div className="absolute top-0 right-0 p-4 opacity-5">
        <TrendingUp size={120} className="text-white" />
      </div>

      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-2">
            <Label htmlFor="Nome" className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40">Nome</Label>
            <Input 
              id="Nome" 
              {...form.register("Nome")} 
              className="bg-white/5 border-white/10 rounded-none h-12 focus:border-white/30 transition-all uppercase placeholder:text-white/10"
              placeholder="SEU NOME"
            />
            {form.formState.errors.Nome && <p className="text-[10px] text-red-500 font-bold uppercase">{form.formState.errors.Nome.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="Sobrenome" className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40">Sobrenome</Label>
            <Input 
              id="Sobrenome" 
              {...form.register("Sobrenome")} 
              className="bg-white/5 border-white/10 rounded-none h-12 focus:border-white/30 transition-all uppercase placeholder:text-white/10"
              placeholder="SEU SOBRENOME"
            />
            {form.formState.errors.Sobrenome && <p className="text-[10px] text-red-500 font-bold uppercase">{form.formState.errors.Sobrenome.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="Email" className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40">E-mail</Label>
            <Input 
              id="Email" 
              type="email" 
              {...form.register("Email")} 
              className="bg-white/5 border-white/10 rounded-none h-12 focus:border-white/30 transition-all uppercase placeholder:text-white/10"
              placeholder="EMAIL@EXEMPLO.COM"
            />
            {form.formState.errors.Email && <p className="text-[10px] text-red-500 font-bold uppercase">{form.formState.errors.Email.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="WhatsApp" className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40">WhatsApp</Label>
            <Input 
              id="WhatsApp" 
              {...form.register("WhatsApp")} 
              className="bg-white/5 border-white/10 rounded-none h-12 focus:border-white/30 transition-all placeholder:text-white/10"
              placeholder="(00) 00000-0000"
            />
            {form.formState.errors.WhatsApp && <p className="text-[10px] text-red-500 font-bold uppercase">{form.formState.errors.WhatsApp.message}</p>}
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="Investimento" className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40">Valor de Investimento</Label>
          <Select onValueChange={(value) => form.setValue("Investimento", value)}>
            <SelectTrigger className="bg-white/5 border-white/10 rounded-none h-12 focus:ring-0 focus:ring-offset-0 text-left">
              <SelectValue placeholder="SELECIONE O VALOR" />
            </SelectTrigger>
            <SelectContent className="bg-zinc-950 border-white/10 text-white">
              {VALORES_INVESTIMENTO.map((valor) => (
                <SelectItem key={valor} value={valor} className="focus:bg-white/10 focus:text-white cursor-pointer">
                  {valor}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {form.formState.errors.Investimento && <p className="text-[10px] text-red-500 font-bold uppercase">{form.formState.errors.Investimento.message}</p>}
        </div>

        <Button 
          type="submit" 
          disabled={isSubmitting}
          className="w-full h-16 rounded-none bg-white text-black font-black text-lg uppercase tracking-[0.2em] hover:bg-zinc-200 transition-all group"
        >
          {isSubmitting ? "PROCESSANDO..." : "SOLICITAR CONTATO"}
          {!isSubmitting && <ChevronRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-2" />}
        </Button>
      </form>
    </div>
  );
};

export default InvestorForm;
