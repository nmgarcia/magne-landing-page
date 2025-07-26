import { useEffect, useRef } from 'react';

declare global {
  interface Window {
    anime: any;
    gsap: any;
    ScrollTrigger: any;
  }
}

export function useAnimations() {
  const isInitialized = useRef(false);

  useEffect(() => {
    if (!isInitialized.current && window.gsap && window.anime) {
      isInitialized.current = true;
      initializeAnimations();
    }
  }, []);

  const initializeAnimations = () => {
    // Register GSAP ScrollTrigger
    if (window.gsap && window.ScrollTrigger) {
      window.gsap.registerPlugin(window.ScrollTrigger);
    }
  };

  const animateHeroElements = () => {
    if (window.anime) {
      // Magnetic text animation
      window.anime.timeline({
        easing: 'easeOutExpo',
        duration: 1000,
        delay: 2500
      })
      .add({
        targets: '.magnetic-word',
        translateY: [100, 0],
        opacity: [0, 1],
        delay: window.anime.stagger(200)
      })
      .add({
        targets: '.hero-subtitle',
        translateY: [50, 0],
        opacity: [0, 1]
      }, '-=500')
      .add({
        targets: '.hero-cta',
        translateY: [30, 0],
        opacity: [0, 1]
      }, '-=300')
      .add({
        targets: '.hero-badge',
        scale: [0.8, 1],
        opacity: [0, 1]
      }, '-=800');

      // Floating icons animation
      window.anime({
        targets: '.floating-icon',
        translateY: [-20, 20],
        rotate: [-5, 5],
        duration: 3000,
        direction: 'alternate',
        loop: true,
        easing: 'easeInOutSine',
        delay: window.anime.stagger(500)
      });
    }
  };

  const animateServicesSection = () => {
    if (window.gsap && window.anime) {
      // Create magnetic assembly effect
      const createMagneticAssembly = (selector: string, delay = 0) => {
        const elements = document.querySelectorAll(selector);
        elements.forEach((element, index) => {
          // Create scattered fragments that will attract to form the element
          const fragmentCount = 12;
          const fragments: HTMLElement[] = [];
          
          for (let i = 0; i < fragmentCount; i++) {
            const fragment = document.createElement('div');
            fragment.className = 'magnetic-fragment';
            const angle = (i / fragmentCount) * Math.PI * 2;
            const distance = 150 + Math.random() * 100;
            const x = Math.cos(angle) * distance;
            const y = Math.sin(angle) * distance;
            
            fragment.style.cssText = `
              position: absolute;
              width: 3px;
              height: 3px;
              background: hsl(25, 95%, 53%);
              border-radius: 50%;
              top: 50%;
              left: 50%;
              transform: translate(${x}px, ${y}px);
              opacity: 0;
            `;
            
            element.appendChild(fragment);
            fragments.push(fragment);
          }
          
          // Trigger magnetic assembly on scroll
          window.gsap.timeline({
            scrollTrigger: {
              trigger: element,
              start: 'top 85%',
              onEnter: () => {
                // Animate fragments converging
                window.anime({
                  targets: fragments,
                  translateX: 0,
                  translateY: 0,
                  opacity: [0, 1, 0],
                  scale: [0.5, 1, 0],
                  duration: 1000,
                  delay: window.anime.stagger(50, { start: delay + index * 100 }),
                  easing: 'easeOutExpo',
                  complete: () => {
                    fragments.forEach(f => f.remove());
                    element.classList.add('assembled');
                  }
                });
              }
            }
          });
        });
      };

      // Apply magnetic assembly to different elements
      createMagneticAssembly('.services-title', 0);
      createMagneticAssembly('.services-subtitle', 200);
      createMagneticAssembly('.service-card', 400);

      // Original GSAP animations with magnetic attraction effect
      window.gsap.set(['.services-title', '.services-subtitle', '.service-card'], { 
        className: '+=magnetic-element' 
      });
    }
  };

  const animateAboutSection = () => {
    if (window.gsap && window.anime) {
      // Create magnetic assembly for about section
      const createMagneticAssembly = (selector: string, delay = 0) => {
        const elements = document.querySelectorAll(selector);
        elements.forEach((element, index) => {
          const fragmentCount = 15;
          const fragments: HTMLElement[] = [];
          
          for (let i = 0; i < fragmentCount; i++) {
            const fragment = document.createElement('div');
            fragment.className = 'magnetic-fragment';
            const angle = (i / fragmentCount) * Math.PI * 2;
            const distance = 120 + Math.random() * 80;
            const x = Math.cos(angle) * distance;
            const y = Math.sin(angle) * distance;
            
            fragment.style.cssText = `
              position: absolute;
              width: 2px;
              height: 2px;
              background: hsl(262, 72%, 57%);
              border-radius: 50%;
              top: 50%;
              left: 50%;
              transform: translate(${x}px, ${y}px);
              opacity: 0;
            `;
            
            element.appendChild(fragment);
            fragments.push(fragment);
          }
          
          window.gsap.timeline({
            scrollTrigger: {
              trigger: element,
              start: 'top 80%',
              onEnter: () => {
                window.anime({
                  targets: fragments,
                  translateX: 0,
                  translateY: 0,
                  opacity: [0, 0.8, 0],
                  scale: [0.3, 1.2, 0],
                  duration: 1200,
                  delay: window.anime.stagger(40, { start: delay + index * 150 }),
                  easing: 'easeOutExpo',
                  complete: () => {
                    fragments.forEach(f => f.remove());
                    element.classList.add('assembled');
                  }
                });
              }
            }
          });
        });
      };

      createMagneticAssembly('.about-title', 0);
      createMagneticAssembly('.about-description', 300);
      createMagneticAssembly('.vision-item', 600);
      createMagneticAssembly('.mission-item', 700);
      createMagneticAssembly('.value-card', 900);

      window.gsap.set(['.about-title', '.about-description', '.vision-item', '.mission-item', '.value-card'], { 
        className: '+=magnetic-element' 
      });
    }
  };

  const animateContactSection = () => {
    if (window.gsap && window.anime) {
      const createMagneticAssembly = (selector: string, delay = 0) => {
        const elements = document.querySelectorAll(selector);
        elements.forEach((element, index) => {
          const fragmentCount = 20;
          const fragments: HTMLElement[] = [];
          
          for (let i = 0; i < fragmentCount; i++) {
            const fragment = document.createElement('div');
            fragment.className = 'magnetic-fragment';
            const angle = (i / fragmentCount) * Math.PI * 2;
            const distance = 100 + Math.random() * 120;
            const x = Math.cos(angle) * distance;
            const y = Math.sin(angle) * distance;
            
            fragment.style.cssText = `
              position: absolute;
              width: 2px;
              height: 2px;
              background: hsl(25, 95%, 53%);
              border-radius: 50%;
              top: 50%;
              left: 50%;
              transform: translate(${x}px, ${y}px);
              opacity: 0;
              box-shadow: 0 0 4px hsl(25, 95%, 53%);
            `;
            
            element.appendChild(fragment);
            fragments.push(fragment);
          }
          
          window.gsap.timeline({
            scrollTrigger: {
              trigger: element,
              start: 'top 75%',
              onEnter: () => {
                window.anime({
                  targets: fragments,
                  translateX: 0,
                  translateY: 0,
                  opacity: [0, 1, 0],
                  scale: [0.2, 1.5, 0],
                  duration: 1500,
                  delay: window.anime.stagger(30, { start: delay + index * 100 }),
                  easing: 'easeOutExpo',
                  complete: () => {
                    fragments.forEach(f => f.remove());
                    element.classList.add('assembled');
                  }
                });
              }
            }
          });
        });
      };

      createMagneticAssembly('.contact-title', 0);
      createMagneticAssembly('.contact-description', 200);
      createMagneticAssembly('.contact-method', 400);
      createMagneticAssembly('.contact-form', 600);

      window.gsap.set(['.contact-title', '.contact-description', '.contact-method', '.contact-form'], { 
        className: '+=magnetic-element' 
      });
    }
  };

  const initMagneticEffects = () => {
    if (window.anime) {
      // Magnetic button effects
      document.querySelectorAll('.magnetic-btn').forEach(btn => {
        btn.addEventListener('mouseenter', function(this: Element) {
          window.anime({
            targets: this,
            scale: 1.05,
            rotate: '1deg',
            duration: 300,
            easing: 'easeOutElastic(1, .6)'
          });
        });

        btn.addEventListener('mouseleave', function(this: Element) {
          window.anime({
            targets: this,
            scale: 1,
            rotate: '0deg',
            duration: 300,
            easing: 'easeOutElastic(1, .6)'
          });
        });
      });

      // Service cards magnetic effect
      document.querySelectorAll('.service-card').forEach(card => {
        card.addEventListener('mousemove', function(this: Element, e: MouseEvent) {
          const rect = this.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          const centerX = rect.width / 2;
          const centerY = rect.height / 2;
          const rotateX = (y - centerY) / 10;
          const rotateY = (centerX - x) / 10;

          window.anime({
            targets: this,
            rotateX: rotateX,
            rotateY: rotateY,
            duration: 200,
            easing: 'easeOutQuad'
          });
        });

        card.addEventListener('mouseleave', function(this: Element) {
          window.anime({
            targets: this,
            rotateX: 0,
            rotateY: 0,
            duration: 300,
            easing: 'easeOutElastic(1, .6)'
          });
        });
      });
    }
  };

  return {
    animateHeroElements,
    animateServicesSection,
    animateAboutSection,
    animateContactSection,
    initMagneticEffects
  };
}
