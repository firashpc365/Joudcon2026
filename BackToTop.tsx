import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUp } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function BackToTop() {
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const button = buttonRef.current;
    if (!button) return;

    // Show/hide based on scroll position
    ScrollTrigger.create({
      trigger: document.body,
      start: 'top -500px',
      onEnter: () => {
        gsap.to(button, {
          opacity: 1,
          scale: 1,
          duration: 0.4,
          ease: 'back.out(2)',
        });
      },
      onLeaveBack: () => {
        gsap.to(button, {
          opacity: 0,
          scale: 0.8,
          duration: 0.3,
          ease: 'power2.in',
        });
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => {
        if (t.vars.trigger === document.body && t.vars.start === 'top -500px') {
          t.kill();
        }
      });
    };
  }, []);

  const scrollToTop = () => {
    const lenis = (window as any).lenis;
    if (lenis) {
      lenis.scrollTo(0, { duration: 2 });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <button
      ref={buttonRef}
      onClick={scrollToTop}
      className="fixed bottom-8 right-8 z-50 w-14 h-14 rounded-full flex items-center justify-center opacity-0 scale-75 group"
      style={{
        background: 'rgba(0, 27, 68, 0.6)',
        backdropFilter: 'blur(15px)',
        WebkitBackdropFilter: 'blur(15px)',
        border: '1px solid rgba(249, 178, 51, 0.3)',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3), 0 0 20px rgba(249, 178, 51, 0.1)',
      }}
      aria-label="Back to top"
    >
      {/* Glow effect on hover */}
      <div className="absolute inset-0 rounded-full bg-gold/0 group-hover:bg-gold/10 transition-all duration-300" />
      
      {/* Border glow on hover */}
      <div 
        className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          boxShadow: '0 0 20px rgba(249, 178, 51, 0.4), inset 0 0 10px rgba(249, 178, 51, 0.1)',
        }}
      />

      <ArrowUp 
        className="w-6 h-6 text-gold group-hover:-translate-y-0.5 transition-transform duration-300" 
      />
    </button>
  );
}
