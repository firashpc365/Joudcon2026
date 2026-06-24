import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { clientsConfig } from '../config';

gsap.registerPlugin(ScrollTrigger);

export default function Clients() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.clients-header', { opacity: 0, y: 60, filter: 'blur(10px)' }, {
        opacity: 1, y: 0, filter: 'blur(0px)', duration: 1.2, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 70%', toggleActions: 'play none none reverse' },
      });

      gsap.fromTo('.stats-item', { opacity: 0, y: 40, scale: 0.9 }, {
        opacity: 1, y: 0, scale: 1, duration: 0.8, stagger: 0.1, ease: 'back.out(1.5)',
        scrollTrigger: { trigger: '.stats-grid', start: 'top 80%', toggleActions: 'play none none reverse' },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const getClients = () => {
    const stored = localStorage.getItem('joudcon_clients');
    if (stored) return JSON.parse(stored);
    return clientsConfig.clients;
  };

  const clients = getClients();
  const duplicatedClients = [...clients, ...clients, ...clients, ...clients];

  const renderMarqueeRow = (reverse: boolean, rowKey: string) => (
    <div className="relative mb-6" onMouseEnter={() => setIsPaused(true)} onMouseLeave={() => setIsPaused(false)}>
      <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-24 lg:w-32 bg-gradient-to-r from-[#001B44] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-24 lg:w-32 bg-gradient-to-l from-[#001B44] to-transparent z-10 pointer-events-none" />
      <div className="flex overflow-hidden">
        <div className="flex" style={{ animation: isPaused ? 'none' : `${reverse ? 'marquee-reverse' : 'marquee'} 45s linear infinite` }}>
          {(reverse ? [...duplicatedClients].reverse() : duplicatedClients).map((client: any, index: number) => (
            <div key={`${rowKey}-${index}`} className="flex-shrink-0 mx-3 sm:mx-4 lg:mx-6">
              <div className="glass-card rounded-xl px-6 sm:px-8 py-4 sm:py-5 min-w-[140px] sm:min-w-[180px] lg:min-w-[220px] text-center hover:border-gold/40 transition-all duration-300 group" style={{ boxShadow: '0 4px 20px rgba(0,0,0,0.2)' }}>
                {client.logo ? (
                  <img src={client.logo} alt={client.name} className="h-10 sm:h-12 lg:h-14 w-auto mx-auto mb-2 object-contain filter brightness-90 group-hover:brightness-110 transition-all duration-300" />
                ) : (
                  <div className="h-10 sm:h-12 lg:h-14 flex items-center justify-center mb-2">
                    <span className="text-xl sm:text-2xl font-bold text-gold">{client.name.charAt(0)}</span>
                  </div>
                )}
                <h3 className="text-white font-medium text-xs sm:text-sm group-hover:text-gold transition-colors duration-300">{client.name}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <section id="clients" ref={sectionRef} className="section-container py-24 lg:py-32 relative overflow-hidden">
      <div className="relative z-10">
        <div className="clients-header text-center mb-16 px-6 lg:px-12">
          <span className="text-gold text-sm uppercase tracking-[0.3em] mb-4 block">{clientsConfig.sectionLabel}</span>
          <h2 className="text-4xl lg:text-6xl xl:text-7xl font-bold text-white mb-6">{clientsConfig.heading} <span className="text-gold">{clientsConfig.headingAccent}</span></h2>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">{clientsConfig.description}</p>
        </div>

        {renderMarqueeRow(false, 'row1')}
        {renderMarqueeRow(true, 'row2')}

        <div className="stats-grid mt-16 lg:mt-20 px-6 lg:px-12">
          <div className="max-w-4xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8">
            {[
              { value: '15+', label: 'Years Experience' },
              { value: '500+', label: 'Events Delivered' },
              { value: '50+', label: 'Corporate Clients' },
              { value: '100%', label: 'Client Satisfaction' },
            ].map((stat, index) => (
              <div key={index} className="stats-item text-center p-4 rounded-2xl glass-card">
                <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gold mb-1" style={{ textShadow: '0 0 20px rgba(249,178,51,0.3)' }}>{stat.value}</div>
                <div className="text-white/60 text-xs sm:text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="absolute top-0 right-1/4 w-96 h-96 bg-gold/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-64 h-64 bg-gold/5 rounded-full blur-3xl pointer-events-none" />
    </section>
  );
}
