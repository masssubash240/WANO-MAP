import { useEffect, useRef } from 'react';

const PETALS = ['🌸', '🌺', '🍂', '✿'];

export default function SakuraPetals({ count = 12 }) {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const petals = Array.from({ length: count }, (_, i) => {
      const el = document.createElement('span');
      el.textContent = PETALS[i % PETALS.length];
      el.className = 'sakura-petal';
      el.style.left = `${Math.random() * 100}vw`;
      el.style.fontSize = `${10 + Math.random() * 12}px`;
      el.style.animationDuration = `${6 + Math.random() * 8}s`;
      el.style.animationDelay = `${Math.random() * 8}s`;
      el.style.opacity = `${0.3 + Math.random() * 0.5}`;
      container.appendChild(el);
      return el;
    });

    return () => petals.forEach((p) => p.remove());
  }, [count]);

  return <div ref={containerRef} className="pointer-events-none" />;
}
