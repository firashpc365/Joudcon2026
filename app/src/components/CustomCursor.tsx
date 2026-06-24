import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    const checkTouch = window.matchMedia('(pointer: coarse)').matches;
    if (checkTouch) {
      setIsTouch(true);
      return;
    }

    // Add cursor-none class to body for desktop
    document.body.classList.add('cursor-none');

    const style = document.createElement('style');
    style.textContent = `
      body.cursor-none, body.cursor-none * {
        cursor: none !important;
      }
    `;
    document.head.appendChild(style);

    const cursor = cursorRef.current;
    const cursorDot = cursorDotRef.current;
    if (!cursor || !cursorDot) return;

    let mouseX = 0;
    let mouseY = 0;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      gsap.to(cursor, {
        x: mouseX,
        y: mouseY,
        duration: 0.12,
        ease: 'power3.out',
      });

      gsap.to(cursorDot, {
        x: mouseX,
        y: mouseY,
        duration: 0.02,
        ease: 'none',
      });
    };

    const onMouseEnterInteractive = () => {
      gsap.to(cursor, {
        scale: 2.5,
        backgroundColor: 'rgba(249, 178, 51, 0.1)',
        borderColor: 'rgba(249, 178, 51, 0.9)',
        duration: 0.3,
        ease: 'power2.out',
      });
      gsap.to(cursorDot, { scale: 0, duration: 0.2 });
    };

    const onMouseLeaveInteractive = () => {
      gsap.to(cursor, {
        scale: 1,
        backgroundColor: 'rgba(249, 178, 51, 0.05)',
        borderColor: 'rgba(249, 178, 51, 0.4)',
        duration: 0.3,
        ease: 'power2.out',
      });
      gsap.to(cursorDot, { scale: 1, duration: 0.2 });
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });

    const addInteractiveListeners = () => {
      const interactiveEls = document.querySelectorAll('a, button, [role="button"], input, textarea, select, .cursor-pointer, [data-cursor-hover]');
      interactiveEls.forEach((el) => {
        el.addEventListener('mouseenter', onMouseEnterInteractive);
        el.addEventListener('mouseleave', onMouseLeaveInteractive);
      });
      return interactiveEls;
    };

    let interactiveEls = addInteractiveListeners();

    // Re-attach listeners on DOM changes
    const observer = new MutationObserver(() => {
      interactiveEls.forEach((el) => {
        el.removeEventListener('mouseenter', onMouseEnterInteractive);
        el.removeEventListener('mouseleave', onMouseLeaveInteractive);
      });
      interactiveEls = addInteractiveListeners();
    });

    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      interactiveEls.forEach((el) => {
        el.removeEventListener('mouseenter', onMouseEnterInteractive);
        el.removeEventListener('mouseleave', onMouseLeaveInteractive);
      });
      observer.disconnect();
      document.body.classList.remove('cursor-none');
      style.remove();
    };
  }, []);

  if (isTouch) return null;

  return (
    <>
      <div ref={cursorRef} className="fixed top-0 left-0 pointer-events-none z-[9998] -translate-x-1/2 -translate-y-1/2 mix-blend-screen" style={{ width: '36px', height: '36px', borderRadius: '50%', border: '1px solid rgba(249, 178, 51, 0.4)', backgroundColor: 'rgba(249, 178, 51, 0.05)', willChange: 'transform' }} />
      <div ref={cursorDotRef} className="fixed top-0 left-0 pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2" style={{ width: '5px', height: '5px', borderRadius: '50%', backgroundColor: '#F9B233', boxShadow: '0 0 10px rgba(249, 178, 51, 0.8), 0 0 20px rgba(249, 178, 51, 0.4)', willChange: 'transform' }} />
    </>
  );
}
