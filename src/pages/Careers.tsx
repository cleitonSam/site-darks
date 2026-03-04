"use client";

import React from "react";
import { useCareersData } from "@/hooks/useCareersData";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Trash2, Edit, Eye } from "lucide-react";
import { cn } from "@/lib/utils";
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
import { NocoDBCareer } from "@/hooks/useCareersData";

const Careers: React.FC = () => {
  const queryClient = useQueryClient();
  const { data: careers, isLoading, isError, refetch } = useCareersData();

  const deleteCareer = async (id: number) => {
    const url = `https://auto-nocodb.fesqdn.easypanel.host/api/v2/tables/b4b62cfe-d329-4b29-bdc2-a203234f0e11/records`;
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

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Erro ao excluir: ${errorText}`);
      }

      queryClient.invalidateQueries({ queryKey: ["careersData"] });
      showSuccess("Candidatura excluída com sucesso!");
    } catch (error) {
      showError(`Erro ao excluir: ${error instanceof Error ? error.message : 'Erro desconhecido'}`);
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <p className="text-white/50">Carregando candidaturas...</p>
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white/30 mx-auto mt-4"></div>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <p className="text-white/50">Erro ao carregar candidaturas.</p>
          <Button onClick={() => refetch()} className="mt-4">Tentar Novamente</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8 font-display gradient-text">
        Trabalhe Conosco
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="lg:col-span-1">
          <CareersForm />
        </div>

        <div className="lg:col-span-1">
          <h2 className="text-2xl font-bold text-white mb-6">Candidaturas Recentes</h2>
          
          {careers?.length === 0 ? (
            <div className="bg-zinc-950/50 border border-white/10 rounded-xl p-8 text-center text-white/50">
              <p className="text-lg mb-2">Nenhuma candidatura encontrada.</p>
              <p className="text-sm">Seja o primeiro a se candidatar!</p>
            </div>
          ) : (
            <div className="space-y-4">
              {careers.map((career) => (
                <div 
                  key={career.Id} 
                  className="bg-zinc-950/50 border border-white/10 rounded-xl p-4 flex items-center justify-between"
                >
                  <div className="flex-1">
                    <h4 className="text-white font-bold text-sm mb-1">{career.Nome}</h4>
                    <p className="text-white/70 text-xs mb-2">{career.Cargo}</p>
                    <div className="flex items-center gap-2 text-xs text-white/50">
                      <span>{new Date(career.DataCadastro || 0).toLocaleDateString('pt-BR')}</span>
                      <Badge variant="secondary">{career.Status || 'Pendente'}</Badge>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button 
                      size="sm" 
                      variant="outline" 
                      onClick={() => window.open(career.Curriculo, '_blank')}
                    >
                      Ver Currículo
                    </Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button size="sm" variant="destructive">
                          <Trash2 size={14} />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Excluir Candidatura?</AlertDialogTitle>
                        </AlertDialogHeader>
                        <AlertDialogDescription>
                          Tem certeza que deseja excluir esta candidatura?
                        </AlertDialogDescription>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancelar</AlertDialogCancel>
                          <AlertDialogAction onClick={() => deleteCareer(career.Id)}>Excluir</AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Careers;