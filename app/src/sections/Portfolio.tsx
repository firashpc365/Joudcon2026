import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronLeft, ChevronRight, X, Play, ExternalLink } from 'lucide-react';
import { portfolioConfig, type PortfolioItem } from '../config';

gsap.registerPlugin(ScrollTrigger);

export default function Portfolio() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.portfolio-header', { opacity: 0, y: 60, filter: 'blur(10px)' }, {
        opacity: 1, y: 0, filter: 'blur(0px)', duration: 1.2, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 70%', toggleActions: 'play none none reverse' },
      });

      const cards = gsap.utils.toArray<HTMLElement>('.portfolio-card');
      cards.forEach((card, i) => {
        gsap.fromTo(card, { opacity: 0, x: 120, rotateY: 15, filter: 'blur(8px)' }, {
          opacity: 1, x: 0, rotateY: 0, filter: 'blur(0px)', duration: 1, delay: i * 0.15, ease: 'power3.out',
          scrollTrigger: { trigger: card, start: 'top 85%', toggleActions: 'play none none reverse' },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: direction === 'left' ? -420 : 420, behavior: 'smooth' });
    }
  };

  return (
    <section id="portfolio" ref={sectionRef} className="section-container py-24 lg:py-32 relative overflow-hidden">
      <div className="relative z-10">
        <div className="portfolio-header text-center mb-16 px-6 lg:px-12">
          <span className="text-gold text-sm uppercase tracking-[0.3em] mb-4 block">{portfolioConfig.sectionLabel}</span>
          <h2 className="text-4xl lg:text-6xl xl:text-7xl font-bold text-white mb-6">{portfolioConfig.heading} <span className="text-gold">{portfolioConfig.headingAccent}</span></h2>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">{portfolioConfig.description}</p>
        </div>

        <div className="relative">
          <button onClick={() => scroll('left')} className="absolute left-4 lg:left-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full glass-card flex items-center justify-center text-white hover:text-gold hover:border-gold/50 transition-all duration-300">
            <ChevronLeft size={24} />
          </button>
          <button onClick={() => scroll('right')} className="absolute right-4 lg:right-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full glass-card flex items-center justify-center text-white hover:text-gold hover:border-gold/50 transition-all duration-300">
            <ChevronRight size={24} />
          </button>

          <div ref={scrollContainerRef} className="flex gap-6 overflow-x-auto hide-scrollbar px-16 lg:px-24 py-4 snap-x snap-mandatory">
            {portfolioConfig.items.map((item) => (
              <div key={item.id} className="portfolio-card flex-shrink-0 w-[320px] lg:w-[400px] snap-center">
                <div className="glass-card rounded-2xl overflow-hidden cursor-pointer group h-full hover:border-gold/40 transition-all duration-500" onClick={() => setSelectedItem(item)}>
                  <div className="relative h-56 lg:h-64 overflow-hidden">
                    <img src={item.images[0]} alt={item.title} className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#001B44] via-transparent to-transparent" />
                    {item.images[0].endsWith('.mp4') && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-16 h-16 rounded-full bg-gold/90 flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300" style={{ boxShadow: '0 0 30px rgba(249,178,51,0.4)' }}>
                          <Play className="w-6 h-6 text-navy ml-1" fill="currentColor" />
                        </div>
                      </div>
                    )}
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-gold/90 text-navy text-xs font-semibold rounded-full">{item.category}</span>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-2 text-gold text-sm mb-2"><span>{item.client}</span><span className="text-white/30">•</span><span>{item.date}</span></div>
                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-gold transition-colors duration-300">{item.title}</h3>
                    <p className="text-white/60 text-sm line-clamp-2">{item.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {selectedItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={() => setSelectedItem(null)}>
          <div className="absolute inset-0 bg-black/90 backdrop-blur-lg" />
          <div className="relative w-full max-w-5xl max-h-[90vh] overflow-auto glass-card rounded-3xl" onClick={(e) => e.stopPropagation()} style={{ boxShadow: '0 25px 80px rgba(0,0,0,0.6), 0 0 40px rgba(249,178,51,0.1)' }}>
            <button onClick={() => setSelectedItem(null)} className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full flex items-center justify-center text-white transition-all duration-300 hover:scale-110" style={{ background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)' }}>
              <X size={20} />
            </button>
            <div className="relative h-80 lg:h-[500px]">
              {selectedItem.images[0].endsWith('.mp4') ? (
                <video src={selectedItem.images[0]} controls autoPlay className="w-full h-full object-cover" />
              ) : (
                <img src={selectedItem.images[0]} alt={selectedItem.title} className="w-full h-full object-cover" />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-[#001B44] via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <div className="flex items-center gap-3 mb-3">
                  <span className="px-3 py-1 bg-gold text-navy text-xs font-semibold rounded-full">{selectedItem.category}</span>
                  <span className="text-white/60 text-sm">{selectedItem.date}</span>
                </div>
                <h3 className="text-3xl lg:text-4xl font-bold text-white">{selectedItem.title}</h3>
                <p className="text-gold text-lg mt-2">{selectedItem.client}</p>
              </div>
            </div>
            <div className="p-8">
              <p className="text-white/80 text-lg leading-relaxed">{selectedItem.description}</p>
              <div className="mt-8 pt-8 border-t border-white/10">
                <button onClick={() => { setSelectedItem(null); const lenis = (window as any).lenis; if (lenis) lenis.scrollTo('#contact', { duration: 2 }); else document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }); }} className="w-full py-4 bg-gold text-navy font-bold rounded-xl hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2" style={{ boxShadow: '0 0 20px rgba(249,178,51,0.3)' }}>
                  <ExternalLink className="w-5 h-5" />Start Your Project
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="absolute top-1/2 left-0 w-64 h-64 bg-gold/5 rounded-full blur-3xl -translate-y-1/2 pointer-events-none" />
    </section>
  );
}
