import { useEffect, useRef } from 'react';

export default function MagneticCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const isMoving = useRef(false);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;

    const moveCursor = () => {
      const diffX = mouseX - cursorX;
      const diffY = mouseY - cursorY;
      
      cursorX += diffX * 0.25;
      cursorY += diffY * 0.25;
      
      cursor.style.transform = `translate(${cursorX - 10}px, ${cursorY - 10}px)`;
      
      if (isMoving.current) {
        requestAnimationFrame(moveCursor);
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      
      if (!isMoving.current) {
        isMoving.current = true;
        moveCursor();
      }
    };

    const handleMouseLeave = () => {
      isMoving.current = false;
      cursor.style.opacity = '0';
    };

    const handleMouseEnter = () => {
      cursor.style.opacity = '1';
    };

    const handleMouseDown = () => {
      cursor.style.transform += ' scale(0.8)';
    };

    const handleMouseUp = () => {
      cursor.style.transform = cursor.style.transform.replace(' scale(0.8)', '');
    };

    // Create magnetic fragments on click
    const createMagneticFragments = (e: MouseEvent) => {
      const fragmentCount = 8;
      
      for (let i = 0; i < fragmentCount; i++) {
        const fragment = document.createElement('div');
        fragment.className = 'magnetic-fragment';
        
        const angle = (i / fragmentCount) * Math.PI * 2;
        const distance = 50 + Math.random() * 30;
        const startX = Math.cos(angle) * distance;
        const startY = Math.sin(angle) * distance;
        
        fragment.style.cssText = `
          position: fixed;
          left: ${e.clientX}px;
          top: ${e.clientY}px;
          --start-x: ${startX}px;
          --start-y: ${startY}px;
          z-index: 9998;
          pointer-events: none;
        `;
        
        document.body.appendChild(fragment);
        
        setTimeout(() => {
          if (fragment.parentNode) {
            fragment.parentNode.removeChild(fragment);
          }
        }, 1500);
      }
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('click', createMagneticFragments);

    return () => {
      isMoving.current = false;
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('click', createMagneticFragments);
    };
  }, []);

  return <div ref={cursorRef} className="magnetic-cursor" data-testid="magnetic-cursor" />;
}