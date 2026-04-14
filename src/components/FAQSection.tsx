"use client";

import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQSection = () => {
  const faqs = [
    {
      question: "A ACADEMIA REALMENTE FUNCIONA 24 HORAS?",
      answer: "Sim. Nossas unidades operam 24 horas por dia, 7 dias por semana, incluindo feriados. Você tem liberdade total para treinar quando quiser.",
    },
    {
      question: "QUAIS SÃO AS MODALIDADES INCLUÍDAS?",
      answer: "Dependendo do plano escolhido, você tem acesso a Musculação, Cardio, Lutas, Spinning e Aulas Coletivas. Verifique os detalhes na seção de unidades.",
    },
    {
      question: "POSSO TREINAR EM QUALQUER UNIDADE?",
      answer: "Sim, membros com planos específicos (como o Plano Darks) possuem acesso livre a todas as unidades da rede sem custo adicional.",
    },
    {
      question: "EXISTE TAXA DE CANCELAMENTO?",
      answer: "Nossos planos recorrentes não possuem fidelidade, permitindo o cancelamento a qualquer momento sem multas, respeitando o aviso prévio do contrato.",
    },
  ];

  return (
    <section className="py-24 bg-zinc-950/50 border-y border-white/5">
      <div className="container mx-auto px-6 max-w-3xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter text-white mb-4">
            DÚVIDAS <span className="text-white/20">FREQUENTES</span>
          </h2>
          <div className="h-1 w-20 bg-white/10 mx-auto" />
        </div>

        <Accordion type="single" collapsible className="w-full space-y-4">
          {faqs.map((faq, i) => (
            <AccordionItem key={i} value={`item-${i}`} className="border-white/10 bg-black/40 px-6 rounded-xl">
              <AccordionTrigger className="text-white font-bold uppercase tracking-tighter hover:no-underline py-6 text-left">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-white/50 font-medium leading-relaxed pb-6">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default FAQSection;