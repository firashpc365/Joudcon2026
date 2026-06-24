import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { X, Building2, Sparkles, Truck, Check, ArrowRight } from 'lucide-react';
import { servicesConfig, type Service } from '../config';

gsap.registerPlugin(ScrollTrigger);

const iconMap: Record<string, React.ElementType> = {
  Building2,
  Sparkles,
  Truck,
};

export default function Services() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header animation with blur reveal
      gsap.fromTo(
        '.services-header',
        { opacity: 0, y: 60, filter: 'blur(10px)' },
        {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Cards stagger animation with 3D perspective
      gsap.fromTo(
        '.service-card',
        { opacity: 0, y: 100, rotateX: 20, filter: 'blur(8px)' },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          filter: 'blur(0px)',
          duration: 1,
          stagger: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.services-grid',
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // 3D tilt effect handler
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, cardId: string) => {
    if (hoveredCard !== cardId) return;
    
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = (y - centerY) / 12;
    const rotateY = (centerX - x) / 12;
    
    gsap.to(card, {
      rotateX: -rotateX,
      rotateY: -rotateY,
      scale: 1.02,
      duration: 0.4,
      ease: 'power2.out',
    });
  };

  const handleMouseEnter = (cardId: string, e: React.MouseEvent<HTMLDivElement>) => {
    setHoveredCard(cardId);
    const card = e.currentTarget;
    
    // Animate background image opacity
    const bgImage = card.querySelector('.card-bg-image');
    if (bgImage) {
      gsap.to(bgImage, { opacity: 0.35, duration: 0.5 });
    }
    
    // Animate inner glow border
    const innerGlow = card.querySelector('.card-inner-glow');
    if (innerGlow) {
      gsap.to(innerGlow, { opacity: 1, duration: 0.4 });
    }
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    gsap.to(e.currentTarget, {
      rotateX: 0,
      rotateY: 0,
      scale: 1,
      duration: 0.6,
      ease: 'power2.out',
    });
    
    const bgImage = e.currentTarget.querySelector('.card-bg-image');
    if (bgImage) {
      gsap.to(bgImage, { opacity: 0.2, duration: 0.5 });
    }
    
    const innerGlow = e.currentTarget.querySelector('.card-inner-glow');
    if (innerGlow) {
      gsap.to(innerGlow, { opacity: 0, duration: 0.4 });
    }
    
    setHoveredCard(null);
  };

  return (
    <section
      id="services"
      ref={sectionRef}
      className="section-container py-24 lg:py-32 relative overflow-hidden"
    >
      <div className="relative z-10 w-full px-6 lg:px-12">
        {/* Section Header */}
        <div className="services-header text-center mb-16">
          <span className="text-gold text-sm uppercase tracking-[0.3em] mb-4 block">
            {servicesConfig.sectionLabel}
          </span>
          <h2 className="text-4xl lg:text-6xl xl:text-7xl font-bold text-white mb-6">
            {servicesConfig.heading}{' '}
            <span className="text-gold">{servicesConfig.headingAccent}</span>
          </h2>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            {servicesConfig.description}
          </p>
        </div>

        {/* Services Grid */}
        <div className="services-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto perspective-1000">
          {servicesConfig.services.map((service) => {
            const IconComponent = iconMap[service.icon] || Sparkles;
            return (
              <div
                key={service.id}
                className="service-card preserve-3d"
              >
                <div
                  className="relative glass-card rounded-2xl p-8 h-full cursor-pointer overflow-hidden group"
                  onMouseMove={(e) => handleMouseMove(e, service.id)}
                  onMouseEnter={(e) => handleMouseEnter(service.id, e)}
                  onMouseLeave={handleMouseLeave}
                  onClick={() => setSelectedService(service)}
                  style={{
                    transformStyle: 'preserve-3d',
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255,255,255,0.05)',
                  }}
                >
                  {/* Background Image */}
                  {service.image && (
                    <div className="absolute inset-0 z-0">
                      <img
                        src={service.image}
                        alt=""
                        className="card-bg-image w-full h-full object-cover"
                        style={{ opacity: 0.2 }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#001B44] via-[#001B44]/85 to-[#001B44]/70" />
                    </div>
                  )}

                  {/* Inner glow border on hover */}
                  <div 
                    className="card-inner-glow absolute inset-0 rounded-2xl opacity-0 pointer-events-none z-[1]"
                    style={{
                      boxShadow: 'inset 0 0 40px rgba(249, 178, 51, 0.08), inset 0 1px 0 rgba(255,255,255,0.1)',
                      border: '1px solid rgba(249, 178, 51, 0.3)',
                    }}
                  />

                  {/* Content */}
                  <div className="relative z-10">
                    {/* Icon */}
                    <div 
                      className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition-all duration-500 group-hover:scale-110"
                      style={{
                        background: 'linear-gradient(135deg, rgba(249, 178, 51, 0.15) 0%, rgba(249, 178, 51, 0.05) 100%)',
                        border: '1px solid rgba(249, 178, 51, 0.2)',
                      }}
                    >
                      <IconComponent className="w-8 h-8 text-gold" />
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-bold text-white mb-4 group-hover:text-gold transition-colors duration-500">
                      {service.title}
                    </h3>

                    {/* Short Description */}
                    <p className="text-white/60 text-sm leading-relaxed mb-8">
                      {service.shortDescription}
                    </p>

                    {/* Learn More */}
                    <div className="flex items-center gap-2 text-gold text-sm font-medium group/link">
                      <span>Learn More</span>
                      <ArrowRight className="w-4 h-4 transform group-hover/link:translate-x-2 transition-transform duration-300" />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Service Detail Modal */}
      {selectedService && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedService(null)}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/90 backdrop-blur-lg" />

          {/* Modal Content */}
          <div
            className="relative w-full max-w-4xl max-h-[90vh] overflow-auto glass-card rounded-3xl"
            onClick={(e) => e.stopPropagation()}
            style={{
              boxShadow: '0 25px 80px rgba(0, 0, 0, 0.6), 0 0 40px rgba(249, 178, 51, 0.1)',
            }}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedService(null)}
              className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full flex items-center justify-center text-white transition-all duration-300"
              style={{
                background: 'rgba(255,255,255,0.1)',
                backdropFilter: 'blur(10px)',
              }}
            >
              <X size={20} />
            </button>

            {/* Modal Header Image */}
            <div className="relative h-64 lg:h-80">
              <img
                src={selectedService.image}
                alt={selectedService.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#001B44] via-[#001B44]/50 to-transparent" />
              
              {/* Title Overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <h3 className="text-3xl lg:text-4xl font-bold text-white mb-2">
                  {selectedService.title}
                </h3>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-8">
              {/* Full Description */}
              <p className="text-white/80 text-lg leading-relaxed mb-8">
                {selectedService.fullDescription}
              </p>

              {/* Features List */}
              <div>
                <h4 className="text-gold font-semibold mb-4 uppercase tracking-wider text-sm">
                  What We Offer
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {selectedService.features.map((feature, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 text-white/70 p-3 rounded-lg bg-white/5"
                    >
                      <div 
                        className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0"
                        style={{ background: 'rgba(249, 178, 51, 0.2)' }}
                      >
                        <Check className="w-3.5 h-3.5 text-gold" />
                      </div>
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <div className="mt-8 pt-8 border-t border-white/10">
                <button
                  onClick={() => {
                    setSelectedService(null);
                    const lenis = (window as any).lenis;
                    if (lenis) {
                      lenis.scrollTo('#contact', { duration: 2 });
                    } else {
                      document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  className="w-full py-4 bg-gold text-navy font-bold rounded-xl transition-all duration-300 hover:shadow-xl"
                  style={{
                    boxShadow: '0 0 20px rgba(249, 178, 51, 0.3)',
                  }}
                >
                  Get a Quote
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gold/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-gold/5 rounded-full blur-3xl" />
    </section>
  );
}
