import type { FC } from 'react';
import { Star, MessageSquare, Quote, CheckCircle2 } from 'lucide-react';
import { REVIEWS } from '../data/reviews';
import { COMPANY_INFO } from '../data/company';

export const ReviewsSection: FC = () => {
  return (
    <section className="py-24 bg-white relative border-b border-zinc-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-zinc-100 border border-[#d4af37]/40 text-[#b48316] text-xs font-bold tracking-widest uppercase mb-4 shadow-sm">
            <MessageSquare className="w-3.5 h-3.5 text-[#d4af37]" />
            <span>Depoimentos Reais</span>
          </div>

          <h2 className="font-serif-luxury text-3xl sm:text-4xl md:text-5xl font-black tracking-wider text-[#09090b] uppercase mb-4">
            O QUE NOSSOS CLIENTES DIZEM
          </h2>

          {/* Google Score Banner */}
          <div className="inline-flex items-center gap-4 px-6 py-3 rounded-full bg-white border border-zinc-200 shadow-md mt-2">
            <div className="flex items-center gap-1.5">
              <span className="text-xl font-black text-[#09090b]">5,0</span>
              <div className="flex text-[#d4af37]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-[#d4af37]" />
                ))}
              </div>
            </div>
            <div className="h-4 w-[1px] bg-zinc-200" />
            <div className="text-left text-xs text-[#52525b]">
              <span className="text-[#09090b] font-bold block">{COMPANY_INFO.googleReviews.totalCount} avaliações</span>
              <span>no Google Meu Negócio</span>
            </div>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {REVIEWS.map(review => (
            <div
              key={review.id}
              className="rounded-2xl p-7 bg-[#fafafa] border border-zinc-200 hover:border-[#d4af37] transition-all duration-300 flex flex-col justify-between group hover:shadow-lg"
            >
              <div>
                {/* Header with stars and quote icon */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex text-[#d4af37]">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[#d4af37]" />
                    ))}
                  </div>
                  <Quote className="w-6 h-6 text-zinc-300 group-hover:text-[#d4af37] transition-colors" />
                </div>

                {/* Comment Text */}
                <p className="text-sm text-[#27272a] leading-relaxed italic mb-6 font-medium">
                  "{review.comment}"
                </p>
              </div>

              {/* Author & Verification Footer */}
              <div className="pt-4 border-t border-zinc-200 flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-1.5">
                    <h4 className="text-xs font-bold text-[#09090b] uppercase font-display">
                      {review.author}
                    </h4>
                    {review.verified && (
                      <span title="Cliente Verificado">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#b48316]" />
                      </span>
                    )}
                  </div>
                  {review.serviceUsed && (
                    <span className="text-[11px] text-[#71717a] block mt-0.5 font-medium">
                      {review.serviceUsed}
                    </span>
                  )}
                </div>

                <span className="text-[10px] text-[#71717a] font-medium">
                  {review.date}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
