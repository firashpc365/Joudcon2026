import { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface LoadingScreenProps {
  onComplete: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLImageElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          // Exit animation
          gsap.to(containerRef.current, {
            opacity: 0,
            duration: 0.8,
            ease: 'power2.inOut',
            onComplete,
          });
        },
      });

      // Logo entrance
      tl.fromTo(
        logoRef.current,
        { opacity: 0, scale: 0.5, rotateY: 180 },
        { opacity: 1, scale: 1, rotateY: 0, duration: 1.2, ease: 'back.out(1.7)' }
      );

      // Progress bar fill
      tl.fromTo(
        progressRef.current,
        { scaleX: 0 },
        { scaleX: 1, duration: 2, ease: 'power2.inOut' },
        '-=0.5'
      );

      // Text reveal
      tl.fromTo(
        textRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' },
        '-=1.5'
      );

      // Hold for a moment then fade everything
      tl.to({}, { duration: 0.5 });

      tl.to(logoRef.current, {
        scale: 0.9,
        opacity: 0,
        duration: 0.5,
        ease: 'power2.in',
      });

      tl.to(
        [progressRef.current, textRef.current],
        {
          opacity: 0,
          duration: 0.3,
          ease: 'power2.in',
        },
        '-=0.3'
      );
    }, containerRef);

    return () => ctx.revert();
  }, [onComplete]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center"
      style={{
        background: 'linear-gradient(135deg, #001B44 0%, #0A1128 50%, #001B44 100%)',
      }}
    >
      {/* Animated background glow */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-20"
          style={{
            background: 'radial-gradient(circle, rgba(249,178,51,0.4) 0%, transparent 70%)',
            animation: 'pulse 3s ease-in-out infinite',
          }}
        />
      </div>

      {/* Logo */}
      <div className="relative z-10 mb-8 perspective-1000">
        <img
          ref={logoRef}
          src="/images/JOUD logo and color-01 (1).png"
          alt="Joudcon"
          className="h-32 lg:h-40 w-auto"
          style={{
            filter: 'drop-shadow(0 0 30px rgba(249,178,51,0.5))',
          }}
        />
      </div>

      {/* Loading Text */}
      <div ref={textRef} className="relative z-10 text-center">
        <p className="text-white/60 text-sm uppercase tracking-[0.3em] mb-2">
          Loading Experience
        </p>
        <p className="arabic text-gold/80 text-lg">
          جودكون
        </p>
      </div>

      {/* Progress Bar */}
      <div className="relative z-10 mt-8 w-48 h-0.5 bg-white/10 rounded-full overflow-hidden">
        <div
          ref={progressRef}
          className="absolute inset-y-0 left-0 bg-gradient-to-r from-gold/50 via-gold to-gold/50 rounded-full origin-left"
          style={{
            boxShadow: '0 0 20px rgba(249,178,51,0.5)',
          }}
        />
      </div>

      {/* Decorative particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-gold/40 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${3 + Math.random() * 4}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 2}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
}
