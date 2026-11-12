import React, { useEffect, useRef } from 'react';

export const CustomCursor: React.FC = () => {
  const dotRef = useRef<HTMLDivElement | null>(null);
  const ringRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let ringX = 0;
    let ringY = 0;
    let mouseCurrX = 0;
    let mouseCurrY = 0;
    let rafId = 0;

    const handleMouseMove = (e: MouseEvent) => {
      mouseCurrX = e.clientX;
      mouseCurrY = e.clientY;
      dot.style.left = `${mouseCurrX}px`;
      dot.style.top = `${mouseCurrY}px`;

      // Dynamic Mouse-Tracking Spotlight Glow on Liquid Glass Cards
      const cards = document.querySelectorAll<HTMLElement>('.liquid-glass');
      cards.forEach((card) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
      });
    };

    const updateCursorRing = () => {
      ringX += (mouseCurrX - ringX) * 0.22;
      ringY += (mouseCurrY - ringY) * 0.22;
      ring.style.left = `${ringX}px`;
      ring.style.top = `${ringY}px`;
      rafId = requestAnimationFrame(updateCursorRing);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (target?.closest('a, button, [contenteditable="true"], input, textarea')) {
        ring.classList.add('hovered');
      } else {
        ring.classList.remove('hovered');
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseover', handleMouseOver, { passive: true });
    rafId = requestAnimationFrame(updateCursorRing);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseover', handleMouseOver);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="cursor-dot" />
      <div ref={ringRef} className="cursor-ring" />
    </>
  );
};
