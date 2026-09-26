import { useEffect } from 'react';
import type { FC } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import type { PortfolioItem } from '../types';

interface LightboxProps {
  item: PortfolioItem | null;
  items: PortfolioItem[];
  onClose: () => void;
  onSelect: (item: PortfolioItem) => void;
}

export const Lightbox: FC<LightboxProps> = ({
  item,
  items,
  onClose,
  onSelect
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!item) return;
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [item, items]);

  if (!item) return null;

  const currentIndex = items.findIndex(i => i.id === item.id);

  const handlePrev = () => {
    const prevIdx = (currentIndex - 1 + items.length) % items.length;
    onSelect(items[prevIdx]);
  };

  const handleNext = () => {
    const nextIdx = (currentIndex + 1) % items.length;
    onSelect(items[nextIdx]);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Visualização de Imagem"
      className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200"
    >
      {/* Close button */}
      <button
        onClick={onClose}
        aria-label="Fechar visualização"
        className="absolute top-5 right-5 z-50 w-11 h-11 rounded-full bg-[#18181b] border border-white/20 text-white hover:text-[#d4af37] flex items-center justify-center cursor-pointer transition-colors"
      >
        <X className="w-6 h-6" />
      </button>

      {/* Navigation arrows */}
      {items.length > 1 && (
        <>
          <button
            onClick={handlePrev}
            aria-label="Imagem anterior"
            className="absolute left-4 sm:left-8 z-50 w-11 h-11 rounded-full bg-[#18181b]/80 border border-white/20 text-white hover:text-[#d4af37] flex items-center justify-center cursor-pointer transition-colors backdrop-blur-md"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={handleNext}
            aria-label="Próxima imagem"
            className="absolute right-4 sm:right-8 z-50 w-11 h-11 rounded-full bg-[#18181b]/80 border border-white/20 text-white hover:text-[#d4af37] flex items-center justify-center cursor-pointer transition-colors backdrop-blur-md"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </>
      )}

      {/* Content wrapper */}
      <div className="max-w-4xl w-full flex flex-col items-center">
        <div className="relative rounded-xl overflow-hidden border border-white/10 shadow-2xl max-h-[75vh] w-auto">
          <img
            src={item.image}
            alt={item.title}
            className="w-auto h-auto max-h-[75vh] object-contain mx-auto"
          />
        </div>

        <div className="mt-4 text-center max-w-xl">
          <span className="text-[10px] uppercase font-bold tracking-widest text-[#d4af37] block mb-1">
            {item.category}
          </span>
          <h3 className="text-lg sm:text-xl font-bold text-white font-display">
            {item.title}
          </h3>
          <p className="text-xs sm:text-sm text-[#a1a1aa] mt-1">
            {item.description}
          </p>
          <span className="text-[11px] text-[#71717a] mt-2 block">
            {currentIndex + 1} de {items.length}
          </span>
        </div>
      </div>
    </div>
  );
};
