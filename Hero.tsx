import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronDown } from 'lucide-react';
import { heroConfig } from '../config';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const loadTl = gsap.timeline({ delay: 3.2 });

      loadTl.fromTo(
        '.hero-title',
        { opacity: 0, y: 80, scale: 0.95, filter: 'blur(10px)' },
        { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)', duration: 1.4, ease: 'power3.out' }
      );

      loadTl.fromTo(
        '.hero-subtitle-ar',
        { opacity: 0, x: -80, filter: 'blur(8px)' },
        { opacity: 1, x: 0, filter: 'blur(0px)', duration: 1.2, ease: 'power3.out' },
        '-=0.8'
      );

      loadTl.fromTo(
        '.hero-subtitle-en',
        { opacity: 0, x: 80, filter: 'blur(8px)' },
        { opacity: 1, x: 0, filter: 'blur(0px)', duration: 1.2, ease: 'power3.out' },
        '-=0.9'
      );

      loadTl.fromTo(
        '.hero-divider',
        { scaleX: 0, opacity: 0 },
        { scaleX: 1, opacity: 1, duration: 0.8, ease: 'power3.out' },
        '-=0.6'
      );

      loadTl.fromTo(
        '.hero-tagline',
        { opacity: 0, y: 30, filter: 'blur(5px)' },
        { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1, ease: 'power3.out' },
        '-=0.5'
      );

      loadTl.fromTo(
        '.hero-cta',
        { opacity: 0, y: 40, scale: 0.9 },
        { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: 'back.out(1.7)' },
        '-=0.4'
      );

      loadTl.fromTo(
        '.hero-scroll',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
        '-=0.3'
      );

      gsap.to('.parallax-layer-1', {
        y: '-15%',
        ease: 'none',
        scrollTrigger: { trigger: heroRef.current, start: 'top top', end: 'bottom top', scrub: 1 },
      });

      gsap.to('.parallax-layer-2', {
        y: '-25%',
        ease: 'none',
        scrollTrigger: { trigger: heroRef.current, start: 'top top', end: 'bottom top', scrub: 1 },
      });

      gsap.to('.parallax-layer-3', {
        y: '-40%',
        scale: 1.1,
        ease: 'none',
        scrollTrigger: { trigger: heroRef.current, start: 'top top', end: 'bottom top', scrub: 1 },
      });

      gsap.to('.card-stroke-shadow', {
        opacity: 0.5,
        duration: 2.5,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const scrollToAbout = () => {
    const lenis = (window as any).lenis;
    if (lenis) {
      lenis.scrollTo('#about', { duration: 2 });
    } else {
      document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const parseHighlightedText = (text: string) => {
    if (!text) return null;
    const parts = text.split(/(\[\[brand\]\].*?\[\[\/brand\]\])/g);
    return parts.map((part, index) => {
      if (part.startsWith('[[brand]]') && part.endsWith('[[/brand]]')) {
        const content = part.replace('[[brand]]', '').replace('[[/brand]]', '');
        return <span key={index} className="text-gold">{content}</span>;
      }
      return <span key={index}>{part}</span>;
    });
  };

  return (
    <section
      id="hero"
      ref={heroRef}
      className="section-container min-h-screen relative flex items-center justify-center overflow-hidden"
    >
      {/* Video Background */}
      <div className="parallax-layer-1 absolute inset-0 z-0">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
          style={{ filter: 'contrast(1.3) saturate(1.4) brightness(0.85)' }}
          poster={heroConfig.backgroundImage}
        >
          <source src={heroConfig.backgroundVideo} type="video/mp4" />
        </video>
      </div>

      {/* Color Grade Overlays */}
      <div className="parallax-layer-2 absolute inset-0 z-[1] pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(135deg, rgba(0,80,100,0.45) 0%, rgba(0,50,70,0.35) 30%, rgba(200,100,30,0.3) 70%, rgba(249,178,51,0.25) 100%)',
            mixBlendMode: 'overlay',
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse at 30% 20%, rgba(0,150,180,0.3) 0%, transparent 50%), radial-gradient(ellipse at 70% 80%, rgba(249,140,60,0.25) 0%, transparent 50%)',
          }}
        />
        <div
          className="absolute inset-0"
          style={{ background: 'radial-gradient(ellipse at center, transparent 35%, rgba(0,10,30,0.7) 100%)' }}
        />
      </div>

      {/* Floating Elements */}
      <div className="parallax-layer-3 absolute inset-0 z-[2] pointer-events-none">
        <div className="absolute top-[15%] left-[10%] w-64 h-64 rounded-full opacity-30" style={{ background: 'radial-gradient(circle, rgba(249,178,51,0.3) 0%, transparent 70%)', filter: 'blur(40px)', animation: 'float 8s ease-in-out infinite' }} />
        <div className="absolute top-[60%] right-[5%] w-48 h-48 rounded-full opacity-25" style={{ background: 'radial-gradient(circle, rgba(249,178,51,0.25) 0%, transparent 70%)', filter: 'blur(30px)', animation: 'float 10s ease-in-out infinite 2s' }} />
        <div className="absolute bottom-[20%] left-[30%] w-32 h-32 rounded-full opacity-20" style={{ background: 'radial-gradient(circle, rgba(0,150,180,0.3) 0%, transparent 70%)', filter: 'blur(25px)', animation: 'float 12s ease-in-out infinite 4s' }} />
      </div>

      {/* Card Stroke Shadow */}
      <div className="card-stroke-shadow absolute z-[4] pointer-events-none" style={{ width: '90%', maxWidth: '800px', minHeight: '500px', borderRadius: '24px', boxShadow: '0 0 80px rgba(249,178,51,0.12), 0 0 160px rgba(249,178,51,0.06), inset 0 0 80px rgba(249,178,51,0.04)', border: '1px solid rgba(249,178,51,0.08)', opacity: 0.4 }} />

      {/* Hero Card - ALWAYS INVISIBLE, NO HOVER EFFECT */}
      <div className="relative z-[5] flex items-center justify-center" style={{ width: '90%', maxWidth: '800px', minHeight: '500px', backgroundColor: 'rgba(0,27,68,0)', borderRadius: '24px', border: '1px solid rgba(249,178,51,0.08)' }}>
        <div className="hero-content-inner w-full px-8 lg:px-16 py-12 lg:py-20 text-center relative z-10">
          <p className="hero-subtitle-ar arabic text-white text-lg lg:text-2xl mb-4 font-medium tracking-wide">{parseHighlightedText(heroConfig.subtitleAr)}</p>
          <h1 className="hero-title text-5xl sm:text-6xl lg:text-8xl xl:text-9xl font-black text-white mb-6 tracking-tight" style={{ textShadow: '0 0 60px rgba(249,178,51,0.15), 0 4px 20px rgba(0,0,0,0.5)' }}>{parseHighlightedText(heroConfig.title)}</h1>
          <p className="hero-subtitle-en text-white text-lg lg:text-xl mb-6 font-light tracking-widest uppercase">{parseHighlightedText(heroConfig.subtitleEn)}</p>
          <div className="hero-divider w-32 h-px bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mb-6 origin-center" />
          <p className="hero-tagline text-white text-base lg:text-lg italic mb-10 font-light" style={{ textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}>{parseHighlightedText(heroConfig.tagline)}</p>
          <button onClick={scrollToAbout} className="hero-cta group relative px-12 py-4 bg-transparent font-bold text-lg rounded-xl overflow-hidden" style={{ border: '1.5px solid rgba(249,178,51,0.6)', color: '#F9B233' }}>
            <span className="absolute inset-0 bg-gold scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left ease-out" />
            <span className="relative z-10 group-hover:text-navy transition-colors duration-500 flex items-center gap-3">{heroConfig.ctaText}<ChevronDown className="w-5 h-5 group-hover:translate-y-0.5 transition-transform duration-300" /></span>
          </button>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="hero-scroll absolute bottom-8 left-1/2 -translate-x-1/2 z-20">
        <button onClick={scrollToAbout} className="flex flex-col items-center gap-2 text-white/40 hover:text-gold transition-colors duration-500 group">
          <span className="text-xs uppercase tracking-[0.3em] group-hover:tracking-[0.5em] transition-all duration-500">Scroll</span>
          <ChevronDown className="animate-bounce" size={24} />
        </button>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none z-[3]" style={{ background: 'linear-gradient(to top, #0A1128, transparent)' }} />
    </section>
  );
}
