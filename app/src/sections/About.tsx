import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { aboutConfig } from '../config';
import { Calendar, MapPin, Sparkles } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Section header reveal with blur effect
      gsap.fromTo(
        '.about-header',
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

      // Animate the timeline line drawing with glow
      gsap.fromTo(
        lineRef.current,
        { scaleY: 0, opacity: 0 },
        {
          scaleY: 1,
          opacity: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: timelineRef.current,
            start: 'top 60%',
            end: 'bottom 40%',
            scrub: 1,
          },
        }
      );

      // Animate each timeline node with dramatic entrance
      const nodes = gsap.utils.toArray<HTMLElement>('.timeline-node');
      nodes.forEach((node, index) => {
        const isEven = index % 2 === 0;
        const content = node.querySelector('.node-content');
        const image = node.querySelector('.node-image');
        const circle = node.querySelector('.node-circle');
        const icon = node.querySelector('.node-icon');

        // Content card slides in with blur
        gsap.fromTo(
          content,
          {
            opacity: 0,
            x: isEven ? -100 : 100,
            filter: 'blur(8px)',
          },
          {
            opacity: 1,
            x: 0,
            filter: 'blur(0px)',
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: node,
              start: 'top 75%',
              toggleActions: 'play none none reverse',
            },
          }
        );

        // Image reveals with scale
        if (image) {
          gsap.fromTo(
            image,
            {
              opacity: 0,
              scale: 0.8,
              filter: 'blur(10px)',
            },
            {
              opacity: 1,
              scale: 1,
              filter: 'blur(0px)',
              duration: 1.2,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: node,
                start: 'top 70%',
                toggleActions: 'play none none reverse',
              },
            }
          );
        }

        // Node circle pops in with elastic bounce
        gsap.fromTo(
          circle,
          { scale: 0, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.6,
            ease: 'elastic.out(1, 0.5)',
            scrollTrigger: {
              trigger: node,
              start: 'top 70%',
              toggleActions: 'play none none reverse',
            },
          }
        );

        // Icon fades in
        if (icon) {
          gsap.fromTo(
            icon,
            { opacity: 0, scale: 0 },
            {
              opacity: 1,
              scale: 1,
              duration: 0.4,
              delay: 0.3,
              ease: 'back.out(2)',
              scrollTrigger: {
                trigger: node,
                start: 'top 70%',
                toggleActions: 'play none none reverse',
              },
            }
          );
        }

        // Card hover parallax effect
        const card = node.querySelector('.timeline-card');
        if (card) {
          card.addEventListener('mousemove', (e) => {
            const rect = (card as HTMLElement).getBoundingClientRect();
            const x = (e as MouseEvent).clientX - rect.left;
            const y = (e as MouseEvent).clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            gsap.to(card, {
              rotateX: -rotateX,
              rotateY: -rotateY,
              duration: 0.4,
              ease: 'power2.out',
            });
          });

          card.addEventListener('mouseleave', () => {
            gsap.to(card, {
              rotateX: 0,
              rotateY: 0,
              duration: 0.6,
              ease: 'power2.out',
            });
          });
        }
      });

      // Floating decorative elements parallax
      gsap.to('.about-float-1', {
        y: -80,
        rotation: 15,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
      });

      gsap.to('.about-float-2', {
        y: -120,
        rotation: -10,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const nodeIcons = [Calendar, MapPin, Sparkles];

  return (
    <section
      id="about"
      ref={sectionRef}
      className="section-container py-24 lg:py-32 relative overflow-hidden"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#001B44]/30 to-transparent" />

      {/* Floating decorative elements */}
      <div className="about-float-1 absolute top-20 right-[10%] w-40 h-40 pointer-events-none">
        <div 
          className="w-full h-full rounded-full opacity-20"
          style={{
            background: 'radial-gradient(circle, rgba(249,178,51,0.3) 0%, transparent 70%)',
            filter: 'blur(30px)',
          }}
        />
      </div>
      <div className="about-float-2 absolute bottom-40 left-[5%] w-32 h-32 pointer-events-none">
        <div 
          className="w-full h-full rounded-full opacity-15"
          style={{
            background: 'radial-gradient(circle, rgba(0,150,180,0.3) 0%, transparent 70%)',
            filter: 'blur(25px)',
          }}
        />
      </div>

      <div className="relative z-10 w-full px-6 lg:px-12">
        {/* Section Header */}
        <div className="about-header text-center mb-20">
          <span className="text-gold text-sm uppercase tracking-[0.3em] mb-4 block">
            {aboutConfig.sectionLabel}
          </span>
          <h2 className="text-4xl lg:text-6xl xl:text-7xl font-bold text-white mb-6">
            {aboutConfig.heading}{' '}
            <span className="text-gold">{aboutConfig.headingAccent}</span>
          </h2>
          <p className="text-white/70 text-lg max-w-2xl mx-auto leading-relaxed">
            {aboutConfig.description}
          </p>
        </div>

        {/* Timeline */}
        <div ref={timelineRef} className="relative max-w-5xl mx-auto">
          {/* Center Line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 hidden lg:block">
            <div className="w-full h-full bg-gradient-to-b from-transparent via-white/10 to-transparent" />
            <div
              ref={lineRef}
              className="absolute top-0 left-0 w-full origin-top"
              style={{
                height: '100%',
                background: 'linear-gradient(to bottom, transparent 0%, #F9B233 15%, #F9B233 85%, transparent 100%)',
                boxShadow: '0 0 20px rgba(249, 178, 51, 0.5), 0 0 40px rgba(249, 178, 51, 0.2)',
                transform: 'scaleY(0)',
              }}
            />
          </div>

          {/* Timeline Nodes */}
          <div className="space-y-20 lg:space-y-32">
            {aboutConfig.timeline.map((node, index) => {
              const isEven = index % 2 === 0;
              const IconComponent = nodeIcons[index % nodeIcons.length];
              return (
                <div
                  key={index}
                  className={`timeline-node relative flex flex-col lg:flex-row items-center gap-8 lg:gap-16 ${
                    isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'
                  }`}
                >
                  {/* Content Card */}
                  <div
                    className={`node-content flex-1 ${
                      isEven ? 'lg:text-right' : 'lg:text-left'
                    }`}
                  >
                    <div 
                      className="timeline-card glass-card rounded-2xl p-6 lg:p-8 transition-all duration-500 hover:border-gold/50 group preserve-3d"
                      style={{
                        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
                      }}
                    >
                      {/* Year Badge */}
                      <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold/10 mb-4 ${isEven ? 'lg:ml-auto' : ''}`}>
                        <IconComponent className="w-4 h-4 text-gold" />
                        <span className="text-gold text-sm font-semibold uppercase tracking-wider">
                          {node.year}
                        </span>
                      </div>

                      <h3 className="text-xl lg:text-2xl font-bold text-white mb-4 group-hover:text-gold transition-colors duration-300">
                        {node.title}
                      </h3>
                      <p className="text-white/70 leading-relaxed text-sm lg:text-base">
                        {node.description}
                      </p>

                      {/* Decorative line */}
                      <div className={`mt-6 w-16 h-px bg-gradient-to-r ${isEven ? 'lg:ml-auto' : ''} from-gold/50 to-transparent`} />
                    </div>
                  </div>

                  {/* Center Node */}
                  <div className="relative flex-shrink-0 z-10">
                    <div 
                      className="node-circle w-12 h-12 rounded-full flex items-center justify-center glow-gold"
                      style={{
                        background: 'linear-gradient(135deg, #F9B233 0%, #E5A020 100%)',
                        boxShadow: '0 0 20px rgba(249, 178, 51, 0.6), 0 0 40px rgba(249, 178, 51, 0.3), inset 0 1px 0 rgba(255,255,255,0.3)',
                      }}
                    >
                      <span className="text-navy font-bold text-lg">{index + 1}</span>
                    </div>
                    {/* Pulse ring */}
                    <div 
                      className="absolute inset-0 rounded-full animate-ping"
                      style={{
                        background: 'rgba(249, 178, 51, 0.3)',
                        animationDuration: '3s',
                      }}
                    />
                  </div>

                  {/* Image */}
                  <div className="node-image flex-1">
                    <div className="relative rounded-2xl overflow-hidden group">
                      <img
                        src={node.image}
                        alt={node.title}
                        className="w-full h-48 lg:h-64 object-cover transition-all duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#001B44]/80 via-[#001B44]/20 to-transparent" />
                      
                      {/* Hover overlay with icon */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        <div className="w-16 h-16 rounded-full bg-gold/20 backdrop-blur-sm flex items-center justify-center">
                          <IconComponent className="w-8 h-8 text-gold" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
