import React from "react";
import { Zap, Bike, MapPin, Dumbbell, Clock, Shield } from "lucide-react";
import { cn } from "@/lib/utils";

const ProgramCard = ({ 
  icon, 
  title, 
  description, 
  index 
}: { 
  icon: React.ReactNode, 
  title: string, 
  description: string,
  index: number
}) => (
  <div className={cn(
    "premium-card group p-8 flex flex-col justify-between transition-all duration-700 hover:bg-white/[0.02] h-full cursor-default",
  )}>
    {/* Background Number for visual interest */}
    <span className="absolute -bottom-4 -right-2 text-9xl font-black text-white/[0.02] select-none group-hover:text-white/[0.05] transition-colors duration-700 italic">
      0{index + 1}
    </span>

    <div className="relative z-10">
      <div className="mb-8 w-14 h-14 flex items-center justify-center rounded-2xl bg-white/5 text-white/70 transition-all duration-500 group-hover:bg-white group-hover:text-black group-hover:scale-110 shadow-xl border border-white/5">
        {React.cloneElement(icon as React.ReactElement, { className: "w-6 h-6" })}
      </div>
      
      <h3 className="text-2xl font-bold text-white mb-4 uppercase tracking-tighter italic">
        {title}
      </h3>
      <p className="text-white/40 text-sm leading-relaxed font-medium max-w-[280px]">
        {description}
      </p>
    </div>

    <div className="relative z-10 mt-8 flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-white/20 group-hover:text-white/60 transition-colors">
      <span>Explorar Diferencial</span>
      <div className="h-[1px] w-8 bg-white/10 group-hover:w-12 group-hover:bg-white/40 transition-all duration-500"></div>
    </div>
  </div>
);

const ProgramsSection = () => {
  const programs = [
    {
      icon: <Dumbbell />,
      title: "Equipamentos de Elite",
      description: "Mais de 14 marcas nacionais e internacionais. O melhor aço do mundo para o seu treino de alto nível.",
    },
    {
      icon: <Clock />,
      title: "Liberdade Total",
      description: "Treine no seu ritmo. Portas abertas 24h por dia, 365 dias por ano, sem exceções.",
    },
    {
      icon: <Zap />,
      title: "Alta Performance",
      description: "Equipamentos cardio de última geração configurados para o máximo rendimento metabólico.",
    },
    {
      icon: <Shield />,
      title: "Arena de Luta",
      description: "Espaço dedicado às artes marciais com tatames profissionais e estrutura de elite.",
    },
    {
      icon: <Bike />,
      title: "Spinning Pro",
      description: "Imersão total em som e luz para queimar calorias em um ambiente eletrizante.",
    },
    {
      icon: <MapPin />,
      title: "Fácil Acesso",
      description: "Estacionamento exclusivo com segurança total para sua máxima conveniência.",
    },
  ];

  return (
    <section className="py-16 relative">
      {/* Decorative vertical lines */}
      <div className="absolute top-0 left-1/4 w-[1px] h-full bg-gradient-to-b from-transparent via-white/5 to-transparent hidden lg:block"></div>
      <div className="absolute top-0 right-1/4 w-[1px] h-full bg-gradient-to-b from-transparent via-white/5 to-transparent hidden lg:block"></div>

      <div className="relative z-10 container mx-auto px-6 mb-20">
        <div className="max-w-4xl group/title">
          <div className="inline-block px-4 py-1 mb-6 border border-white/10 rounded-full bg-white/5">
            <p className="text-white/40 font-bold tracking-[0.4em] uppercase text-[10px]">Padrão Internacional</p>
          </div>
          
          {/* Título em uma linha com estilo de contorno, agora com stroke branco (opacidade 1) */}
          <h2 className="text-5xl md:text-7xl font-black text-white italic uppercase tracking-tighter leading-none">
            Diferenciais 
            <span 
              className="block sm:inline text-transparent transition-all duration-500 sm:ml-4" 
              style={{ WebkitTextStroke: "1px rgba(255,255,255,1)" }}
            >
              DE ELITE
            </span>
          </h2>
        </div>
      </div>
      
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {programs.map((program, index) => (
          <ProgramCard 
            key={program.title} 
            index={index}
            {...program} 
          />
        ))}
      </div>
    </section>
  );
};

export default ProgramsSection;