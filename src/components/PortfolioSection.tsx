import { useState } from 'react';
import type { FC } from 'react';
import { Camera, ZoomIn } from 'lucide-react';
import { PORTFOLIO_ITEMS } from '../data/portfolio';
import type { PortfolioItem } from '../types';
import { Lightbox } from './Lightbox';

export const PortfolioSection: FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('todos');
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null);

  const categories = [
    { id: 'todos', label: 'Todos' },
    { id: 'visagismo', label: 'Visagismo' },
    { id: 'corte', label: 'Cortes & Fade' },
    { id: 'barba', label: 'Barba' },
    { id: 'ambiente', label: 'Ambiente' }
  ];

  const filteredItems = activeCategory === 'todos'
    ? PORTFOLIO_ITEMS
    : PORTFOLIO_ITEMS.filter(item => item.category === activeCategory);

  return (
    <section id="portfolio" className="py-24 bg-white relative border-b border-zinc-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-zinc-100 border border-[#d4af37]/40 text-[#b48316] text-xs font-bold tracking-widest uppercase mb-4 shadow-sm">
            <Camera className="w-3.5 h-3.5 text-[#d4af37]" />
            <span>Galeria & Resultados</span>
          </div>

          <h2 className="font-serif-luxury text-3xl sm:text-4xl md:text-5xl font-black tracking-wider text-[#09090b] uppercase mb-4">
            TRABALHOS RECENTES
          </h2>

          <p className="text-base sm:text-lg text-[#52525b] font-normal leading-relaxed">
            Excelência técnica em cada corte, barba esculpida e ambiente projetado para seu bem-estar.
          </p>

          {/* Category Filter Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 rounded-full text-xs font-bold tracking-wider uppercase transition-all duration-200 cursor-pointer ${
                  activeCategory === cat.id
                    ? 'bg-[#09090b] text-[#d4af37] shadow-md border border-[#d4af37]/50'
                    : 'bg-white text-[#52525b] hover:text-[#09090b] border border-zinc-200 hover:border-zinc-400'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Portfolio Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {filteredItems.map(item => (
            <div
              key={item.id}
              onClick={() => setSelectedItem(item)}
              className="group relative rounded-xl overflow-hidden aspect-[4/5] bg-zinc-100 border border-zinc-200 cursor-pointer shadow-sm hover:border-[#d4af37] hover:shadow-xl transition-all duration-300"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />

              {/* Hover Dark Vignette & Caption */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5">
                <span className="text-[10px] font-bold text-[#d4af37] uppercase tracking-widest mb-1">
                  {item.category}
                </span>
                <h4 className="text-sm font-bold text-white font-display">
                  {item.title}
                </h4>
                <p className="text-xs text-[#e4e4e7] mt-1 line-clamp-2">
                  {item.description}
                </p>
                <div className="mt-3 flex items-center gap-1.5 text-[11px] text-[#d4af37] font-semibold">
                  <ZoomIn className="w-3.5 h-3.5" />
                  <span>Ampliar foto</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      <Lightbox
        item={selectedItem}
        items={filteredItems}
        onClose={() => setSelectedItem(null)}
        onSelect={(item) => setSelectedItem(item)}
      />
    </section>
  );
};
