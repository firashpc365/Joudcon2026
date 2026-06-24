import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Particles, { initParticlesEngine } from '@tsparticles/react';
import { loadSlim } from '@tsparticles/slim';

import Navigation from './components/Navigation';
import LoadingScreen from './components/LoadingScreen';
import CustomCursor from './components/CustomCursor';
import ScrollProgress from './components/ScrollProgress';
import BackToTop from './components/BackToTop';
import Hero from './sections/Hero';
import About from './sections/About';
import Services from './sections/Services';
import Portfolio from './sections/Portfolio';
import Clients from './sections/Clients';
import Contact from './sections/Contact';
import Footer from './sections/Footer';

import './App.css';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const mainRef = useRef<HTMLDivElement>(null);
  const [init, setInit] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const lenisRef = useRef<any>(null);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  useEffect(() => {
    if (isLoading) return;

    let lenisInstance: any = null;

    const initLenis = async () => {
      const Lenis = (await import('@studio-freight/lenis')).default;

      const lenis = new Lenis({
        duration: 1.8,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothWheel: true,
        wheelMultiplier: 0.8,
        touchMultiplier: 1.5,
        infinite: false,
      });

      lenisInstance = lenis;
      lenisRef.current = lenis;

      lenis.on('scroll', ScrollTrigger.update);

      gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
      });

      gsap.ticker.lagSmoothing(0);

      (window as any).lenis = lenis;
    };

    initLenis();

    return () => {
      if (lenisInstance) {
        lenisInstance.destroy();
      }
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [isLoading]);

  return (
    <div ref={mainRef} className="relative min-h-screen">
      {isLoading && <LoadingScreen onComplete={handleLoadingComplete} />}
      <CustomCursor />
      <ScrollProgress />

      {init && (
        <Particles
          id="particles"
          options={{
            fullScreen: { enable: true, zIndex: -1 },
            particles: {
              number: { value: 120, density: { enable: true, width: 800, height: 800 } },
              color: { value: '#F9B233' },
              shape: { type: 'circle' },
              opacity: { value: { min: 0.05, max: 0.6 }, animation: { enable: true, speed: 0.8 } },
              size: { value: { min: 1, max: 3 }, animation: { enable: true, speed: 1.5 } },
              links: { enable: true, distance: 180, color: '#F9B233', opacity: 0.15, width: 1 },
              move: { enable: true, speed: 0.6, direction: 'none', random: true, straight: false, outModes: { default: 'out' }, attract: { enable: true, rotate: { x: 600, y: 1200 } } },
            },
            interactivity: { events: { onHover: { enable: true, mode: 'grab' }, onClick: { enable: true, mode: 'push' }, resize: { enable: true } }, modes: { grab: { distance: 200, links: { opacity: 0.4 } }, push: { quantity: 3 } } },
          }}
        />
      )}

      <Navigation />
      <main className="relative z-10">
        <Hero />
        <About />
        <Services />
        <Portfolio />
        <Clients />
        <Contact />
      </main>
      <Footer />
      <BackToTop />
    </div>
  );
}

export default App;
