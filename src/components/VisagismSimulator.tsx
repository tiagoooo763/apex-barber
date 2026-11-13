import { useState } from 'react';
import type { FC } from 'react';
import { Sparkles, Scissors, Check, ArrowRight, ShieldCheck } from 'lucide-react';
import { SERVICES } from '../data/services';
import type { Service } from '../types';

interface VisagismSimulatorProps {
  onSelectService: (service: Service) => void;
}

interface FaceShape {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  recommendedCut: string;
  recommendedBeard: string;
  objective: string;
  proTip: string;
}

const FACE_SHAPES: FaceShape[] = [
  {
    id: 'quadrado',
    name: 'Rosto Quadrado',
    subtitle: 'Mandíbula bem definida e testa proporcional',
    description: 'Um formato naturalmente imponente e masculino, com largura equilibrada entre maçãs e mandíbula.',
    recommendedCut: 'Fade gradual médio ou alto, texturização no topo com tesoura (Pompadour moderno ou Quiff) para alongar suavemente.',
    recommendedBeard: 'Barba alinhada com contorno milimétrico nas bochechas e levemente mais cheia no queixo para suavizar as quinas.',
    objective: 'Alongar suavemente a silhueta facial e harmonizar os ângulos sem perder a masculinidade marcante.',
    proTip: 'Evite cortes muito baixos e retos no topo, pois acentuam o aspecto de caixa.'
  },
  {
    id: 'oval',
    name: 'Rosto Oval',
    subtitle: 'Proporções simétricas e queixo suave',
    description: 'Considerado o formato mais versátil da geometria facial masculina, aceita ampla variedade de estilos.',
    recommendedCut: 'Corte Clássico Executivo na tesoura, Slicked Back ou Taper Fade natural com volume equilibrado.',
    recommendedBeard: 'Barba cerrada desenhada, degradê suave da costeleta até a ponta ou queixo demarcado.',
    objective: 'Valorizar a simetria natural do rosto sem criar volumes desproporcionais nas laterais.',
    proTip: 'Cuidado apenas com franjas muito caídas que escondem a testa e achatam o rosto.'
  },
  {
    id: 'redondo',
    name: 'Rosto Redondo',
    subtitle: 'Comprimento e largura similares, ângulos suaves',
    description: 'Linhas faciais suaves com maçãs do rosto proeminentes e mandíbula curva.',
    recommendedCut: 'Low ou Mid Skin Fade bem raspado nas laterais e volume angular no topo (Crop francês ou Topete estruturado).',
    recommendedBeard: 'Barba mais comprida e desenhada em ângulo reto no queixo, com laterais bem aparadas.',
    objective: 'Criar ilusão de altura e ângulos mais firmes e geométricos no maxilar.',
    proTip: 'Costeletas cheias e barba redonda aumentam a percepção de largura facial.'
  },
  {
    id: 'diamante',
    name: 'Rosto Diamante',
    subtitle: 'Maçãs salientes, testa e queixo estreitos',
    description: 'Estrutura óssea refinada com maçãs do rosto proeminentes e queixo afilado.',
    recommendedCut: 'Corte com textura média nas laterais (Scissor Work) e topo volumoso para equilibrar a largura das maçãs.',
    recommendedBeard: 'Barba cheia e quadrada na base inferior para conferir maior robustez ao queixo.',
    objective: 'Suavizar as maçãs laterais e encorpar a área da mandíbula.',
    proTip: 'Fades extremamente raspados nas têmporas podem destacar excessivamente as maçãs do rosto.'
  },
  {
    id: 'triangular',
    name: 'Rosto Triangular',
    subtitle: 'Mandíbula proeminente e testa mais estreita',
    description: 'A mandíbula é o ponto de maior destaque do rosto, com redução gradual em direção à testa.',
    recommendedCut: 'Corte texturizado com bastante volume superior e laterais preservadas para balancear o topo com a base.',
    recommendedBeard: 'Barba curta e limpa nas laterais, com cavanhaque sutil ou barba por fazer discreta.',
    objective: 'Transferir o ponto de atenção para os olhos e testa, equilibrando com o peso da mandíbula.',
    proTip: 'Barbas volumosas nas laterais ampliam ainda mais a base do rosto.'
  }
];

export const VisagismSimulator: FC<VisagismSimulatorProps> = ({ onSelectService }) => {
  const [selectedShapeId, setSelectedShapeId] = useState<string>('quadrado');

  const selectedShape = FACE_SHAPES.find(s => s.id === selectedShapeId) || FACE_SHAPES[0];
  const visagistService = SERVICES.find(s => s.id === 'corte-visagista') || SERVICES[0];

  return (
    <section id="visagismo-consultoria" className="py-24 bg-white relative border-b border-zinc-200 overflow-hidden">
      {/* Background Accent Gradients */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-[#d4af37]/10 rounded-full blur-3xl pointer-events-none -translate-y-1/2" />
      <div className="absolute top-1/3 right-0 w-80 h-80 bg-zinc-200/40 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-zinc-50 border border-[#d4af37]/40 text-[#b48316] text-xs font-bold tracking-widest uppercase mb-4 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" />
            <span>Consultoria Interativa</span>
          </div>

          <h2 className="font-serif-luxury text-3xl sm:text-4xl md:text-5xl font-black tracking-wider text-[#09090b] uppercase mb-4">
            SIMULADOR VISAGISTA APEX
          </h2>

          <p className="text-base sm:text-lg text-zinc-600 font-normal leading-relaxed">
            Descubra como a geometria facial e o visagismo transformam sua presença. Selecione o formato do seu rosto para ver as orientações personalizadas dos nossos especialistas.
          </p>

          {/* Face Shape Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2.5 mt-8">
            {FACE_SHAPES.map(shape => {
              const isActive = shape.id === selectedShapeId;
              return (
                <button
                  key={shape.id}
                  onClick={() => setSelectedShapeId(shape.id)}
                  className={`px-4 sm:px-5 py-2.5 rounded-full text-xs font-bold tracking-wider uppercase transition-all duration-200 cursor-pointer flex items-center gap-2 ${
                    isActive
                      ? 'bg-[#09090b] text-[#d4af37] shadow-lg shadow-black/10 border border-[#d4af37] scale-105'
                      : 'bg-white text-zinc-600 hover:text-black border border-zinc-200 hover:border-zinc-400'
                  }`}
                >
                  <Scissors className={`w-3.5 h-3.5 ${isActive ? 'text-[#d4af37]' : 'text-zinc-400'}`} />
                  <span>{shape.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Interactive Result Card */}
        <div className="max-w-5xl mx-auto rounded-3xl bg-white border-2 border-[#d4af37]/35 shadow-xl p-6 sm:p-10 lg:p-12 relative overflow-hidden">
          {/* Top Decorative Filigree Accent */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#d4af37] via-[#09090b] to-[#d4af37]" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Summary Box */}
            <div className="lg:col-span-5 space-y-5 bg-zinc-50/80 rounded-2xl p-6 sm:p-7 border border-zinc-200/80">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-black uppercase tracking-widest text-[#b48316]">
                  Diagnóstico Morfológico
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-[#09090b] text-[#d4af37] text-[10px] font-bold uppercase border border-[#d4af37]/40">
                  Visagismo
                </span>
              </div>

              <div>
                <h3 className="font-serif-luxury text-2xl sm:text-3xl font-black text-[#09090b]">
                  {selectedShape.name}
                </h3>
                <p className="text-xs text-zinc-500 font-semibold mt-1">
                  {selectedShape.subtitle}
                </p>
              </div>

              <p className="text-xs sm:text-sm text-zinc-700 leading-relaxed font-medium">
                {selectedShape.description}
              </p>

              <div className="p-3.5 rounded-xl bg-white border border-[#d4af37]/30 shadow-sm text-xs">
                <strong className="text-[#09090b] font-bold block mb-1">
                  💡 Dica do Visagista:
                </strong>
                <p className="text-zinc-600 leading-snug">
                  {selectedShape.proTip}
                </p>
              </div>
            </div>

            {/* Right Recommendations Grid */}
            <div className="lg:col-span-7 space-y-6">
              <div className="space-y-4">
                {/* Recommended Cut */}
                <div className="p-5 rounded-2xl bg-white border border-zinc-200 shadow-sm hover:border-[#d4af37] transition-all">
                  <div className="flex items-center gap-2 mb-1.5">
                    <div className="w-6 h-6 rounded-full bg-[#d4af37]/20 text-[#b48316] flex items-center justify-center shrink-0">
                      <Scissors className="w-3.5 h-3.5" />
                    </div>
                    <h4 className="text-xs font-black uppercase tracking-wider text-[#09090b]">
                      Corte Ideal Recomendado
                    </h4>
                  </div>
                  <p className="text-xs sm:text-sm text-zinc-700 leading-relaxed pl-8 font-medium">
                    {selectedShape.recommendedCut}
                  </p>
                </div>

                {/* Recommended Beard */}
                <div className="p-5 rounded-2xl bg-white border border-zinc-200 shadow-sm hover:border-[#d4af37] transition-all">
                  <div className="flex items-center gap-2 mb-1.5">
                    <div className="w-6 h-6 rounded-full bg-[#09090b] text-[#d4af37] flex items-center justify-center shrink-0 border border-[#d4af37]/40">
                      <Check className="w-3.5 h-3.5" />
                    </div>
                    <h4 className="text-xs font-black uppercase tracking-wider text-[#09090b]">
                      Alinhamento de Barba
                    </h4>
                  </div>
                  <p className="text-xs sm:text-sm text-zinc-700 leading-relaxed pl-8 font-medium">
                    {selectedShape.recommendedBeard}
                  </p>
                </div>

                {/* Objective */}
                <div className="p-5 rounded-2xl bg-zinc-50 border border-zinc-200/80">
                  <div className="flex items-center gap-2 mb-1.5">
                    <ShieldCheck className="w-4 h-4 text-[#b48316]" />
                    <h4 className="text-xs font-black uppercase tracking-wider text-[#09090b]">
                      Objetivo da Harmonização
                    </h4>
                  </div>
                  <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed pl-6">
                    {selectedShape.objective}
                  </p>
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-center sm:text-left">
                  <span className="text-[10px] uppercase font-bold text-zinc-400 block">
                    Serviço Especializado
                  </span>
                  <span className="text-sm font-black text-[#09090b]">
                    {visagistService.name} — R$ {visagistService.price.toFixed(2).replace('.', ',')}
                  </span>
                </div>

                <button
                  onClick={() => onSelectService(visagistService)}
                  className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-[#09090b] hover:bg-[#18181b] text-white font-bold text-xs uppercase tracking-wider transition-all duration-300 shadow-md hover:shadow-xl active:scale-95 cursor-pointer flex items-center justify-center gap-2.5 border border-[#d4af37]"
                >
                  <span>Agendar com Visagista</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#d4af37]" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
