import { useState, useEffect, useRef } from 'react';
import { Menu, X } from 'lucide-react';
import { navigationConfig } from '../config';

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 3400);

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timer);
    };
  }, []);

  const scrollToSection = (href: string) => {
    const lenis = (window as any).lenis;
    if (lenis) {
      lenis.scrollTo(href, { duration: 2.5, easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
    } else {
      const element = document.querySelector(href);
      if (element) element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  const handleMagneticHover = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    el.style.transform = `translate(${x * 0.25}px, ${y * 0.25}px)`;
  };

  const handleMagneticLeave = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.currentTarget.style.transform = 'translate(0, 0)';
    e.currentTarget.style.transition = 'transform 0.5s cubic-bezier(0.23, 1, 0.32, 1)';
  };

  return (
    <>
      <nav
        ref={navRef}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
          isVisible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
        } ${isScrolled ? 'glass-dark py-3' : 'bg-transparent py-5'}`}
      >
        <div className="w-full px-6 lg:px-12">
          <div className="flex items-center justify-between">
            <a href="#hero" onClick={(e) => { e.preventDefault(); scrollToSection('#hero'); }} className="flex items-center gap-3 group">
              <img src={navigationConfig.logoImage} alt={navigationConfig.logo} className="h-10 w-auto transition-all duration-500 group-hover:scale-110 group-hover:drop-shadow-[0_0_10px_rgba(249,178,51,0.5)]" />
              <span className="text-xl font-bold text-white tracking-tight hidden sm:block">{navigationConfig.logo}</span>
            </a>

            <div className="hidden lg:flex items-center gap-1">
              {navigationConfig.navLinks.map((link) => (
                <a key={link.href} href={link.href} onClick={(e) => { e.preventDefault(); scrollToSection(link.href); }} onMouseMove={handleMagneticHover} onMouseLeave={handleMagneticLeave} className="relative px-4 py-2 text-sm text-white/70 hover:text-white transition-colors duration-300 group" style={{ transition: 'transform 0.15s ease-out' }}>
                  {link.label}
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-px bg-gold transition-all duration-500 ease-out group-hover:w-full" style={{ boxShadow: '0 0 8px rgba(249, 178, 51, 0.6)' }} />
                  <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-gold opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ boxShadow: '0 0 6px rgba(249, 178, 51, 0.8)' }} />
                </a>
              ))}
            </div>

            <div className="hidden lg:block">
              <button onClick={() => scrollToSection('#contact')} className="group relative px-6 py-2.5 font-semibold rounded-lg overflow-hidden" style={{ border: '1.5px solid rgba(249, 178, 51, 0.5)', color: '#F9B233' }}>
                <span className="absolute inset-0 bg-gold scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left ease-out" />
                <span className="relative z-10 group-hover:text-navy transition-colors duration-500">{navigationConfig.ctaText}</span>
              </button>
            </div>

            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="lg:hidden relative w-10 h-10 flex items-center justify-center rounded-lg text-white hover:text-gold transition-colors" style={{ border: '1px solid rgba(255,255,255,0.1)' }}>
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </nav>

      <div className={`fixed inset-0 z-40 lg:hidden transition-all duration-500 ${isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'}`}>
        <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={() => setIsMobileMenuOpen(false)} />
        <div className={`absolute top-20 left-4 right-4 glass-card rounded-2xl p-6 transition-all duration-500 ${isMobileMenuOpen ? 'translate-y-0 opacity-100' : '-translate-y-8 opacity-0'}`}>
          <div className="flex flex-col gap-1">
            {navigationConfig.navLinks.map((link, index) => (
              <a key={link.href} href={link.href} onClick={(e) => { e.preventDefault(); scrollToSection(link.href); }} className="text-lg text-white/80 hover:text-gold transition-all duration-300 py-3 border-b border-white/5 hover:pl-4" style={{ transitionDelay: `${index * 50}ms` }}>{link.label}</a>
            ))}
            <button onClick={() => scrollToSection('#contact')} className="mt-4 w-full py-3 bg-gold text-navy font-bold rounded-lg hover:shadow-lg hover:shadow-gold/30 transition-all">{navigationConfig.ctaText}</button>
          </div>
        </div>
      </div>
    </>
  );
}
