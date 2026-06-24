import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function ScrollProgress() {
  const progressRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const progress = progressRef.current;
    const glow = glowRef.current;
    if (!progress || !glow) return;

    gsap.to(progress, {
      scaleX: 1,
      ease: 'none',
      scrollTrigger: {
        trigger: document.body,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.3,
      },
    });

    // Glow follows the progress edge
    gsap.to(glow, {
      left: '100%',
      ease: 'none',
      scrollTrigger: {
        trigger: document.body,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.3,
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => {
        if (t.vars.trigger === document.body) t.kill();
      });
    };
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-[60] h-0.5 bg-white/5">
      {/* Progress bar */}
      <div
        ref={progressRef}
        className="absolute inset-y-0 left-0 origin-left"
        style={{
          background: 'linear-gradient(90deg, #F9B233, #FFD700, #F9B233)',
          transform: 'scaleX(0)',
          boxShadow: '0 0 10px rgba(249, 178, 51, 0.5)',
        }}
      />
      {/* Glow effect at the edge */}
      <div
        ref={glowRef}
        className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full pointer-events-none"
        style={{
          left: '0%',
          background: '#F9B233',
          boxShadow: '0 0 15px 5px rgba(249, 178, 51, 0.6), 0 0 30px 10px rgba(249, 178, 51, 0.3)',
          transform: 'translate(-50%, -50%)',
        }}
      />
    </div>
  );
}
