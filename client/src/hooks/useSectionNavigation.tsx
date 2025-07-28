import { useState, useEffect, useCallback } from 'react';

interface SectionPosition {
  id: string;
  element: HTMLElement;
  top: number;
  height: number;
}

export const useSectionNavigation = () => {
  const [currentSection, setCurrentSection] = useState<number>(0);
  const [sections, setSections] = useState<SectionPosition[]>([]);
  const [isScrolling, setIsScrolling] = useState(false);

  // Initialize sections
  useEffect(() => {
    const sectionElements = [
      document.getElementById('hero'),
      document.getElementById('services'),
      document.getElementById('about'),
      document.getElementById('contact')
    ].filter(Boolean) as HTMLElement[];

    const sectionPositions = sectionElements.map((element, index) => ({
      id: element.id,
      element,
      top: element.offsetTop,
      height: element.offsetHeight
    }));

    setSections(sectionPositions);
  }, []);

  // Fixed scroll to section
  const scrollToSection = useCallback((sectionIndex: number) => {
    if (isScrolling || !sections[sectionIndex]) return;
    
    setIsScrolling(true);
    const targetSection = sections[sectionIndex];
    
    window.gsap.to(window, {
      scrollTo: {
        y: targetSection.top,
        autoKill: false
      },
      duration: 1.2,
      ease: "power2.inOut",
      onComplete: () => {
        setCurrentSection(sectionIndex);
        setIsScrolling(false);
      }
    });
  }, [sections, isScrolling]);

  // Handle wheel events for fixed section scrolling
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (isScrolling) {
        e.preventDefault();
        return;
      }

      const delta = e.deltaY;
      const threshold = 50;

      if (Math.abs(delta) > threshold) {
        e.preventDefault();
        
        if (delta > 0 && currentSection < sections.length - 1) {
          // Scroll down
          scrollToSection(currentSection + 1);
        } else if (delta < 0 && currentSection > 0) {
          // Scroll up
          scrollToSection(currentSection - 1);
        }
      }
    };

    // Only enable fixed scrolling on desktop
    const isMobile = window.innerWidth <= 768;
    if (!isMobile) {
      window.addEventListener('wheel', handleWheel, { passive: false });
    }

    // Detect current section on scroll for mobile
    const handleScroll = () => {
      if (isScrolling || !sections.length) return;
      
      const scrollY = window.scrollY + window.innerHeight / 2;
      const newCurrentSection = sections.findIndex((section, index) => {
        const nextSection = sections[index + 1];
        return scrollY >= section.top && (!nextSection || scrollY < nextSection.top);
      });

      if (newCurrentSection !== -1 && newCurrentSection !== currentSection) {
        setCurrentSection(newCurrentSection);
      }
    };

    if (isMobile) {
      window.addEventListener('scroll', handleScroll, { passive: true });
    }

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [currentSection, sections, isScrolling, scrollToSection]);

  return {
    currentSection,
    scrollToSection,
    isScrolling
  };
};