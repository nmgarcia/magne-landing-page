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
    if (window.gsap && window.ScrollTrigger) {
      // Enhanced bidirectional scroll animation system
      const createBidirectionalAnimation = (selector: string, staggerDelay = 0.1) => {
        const elements = document.querySelectorAll(selector);
        
        elements.forEach((element, index) => {
          // Add magnetic-element class for CSS transitions
          element.classList.add('magnetic-element');
          
          // Create ScrollTrigger for bidirectional animation
          window.gsap.timeline({
            scrollTrigger: {
              trigger: element,
              start: 'top 90%',
              end: 'bottom 10%',
              toggleActions: 'play reverse play reverse',
              onEnter: () => {
                setTimeout(() => {
                  element.classList.add('assembled');
                  element.classList.remove('disassembled');
                }, index * staggerDelay * 1000);
              },
              onLeave: () => {
                element.classList.add('disassembled');
                element.classList.remove('assembled');
              },
              onEnterBack: () => {
                setTimeout(() => {
                  element.classList.add('assembled');
                  element.classList.remove('disassembled');
                }, (elements.length - index - 1) * staggerDelay * 1000);
              },
              onLeaveBack: () => {
                element.classList.add('disassembled');
                element.classList.remove('assembled');
              }
            }
          });

          // Subtle bottom-to-top particle animation based on scroll
          const createParticleAssembly = () => {
            const particleCount = selector.includes('service-card') ? 8 : 6;
            const sectionRect = element.getBoundingClientRect();

            for (let i = 0; i < particleCount; i++) {
              const particle = document.createElement('div');
              const startX = sectionRect.left + Math.random() * sectionRect.width;
              const startY = sectionRect.bottom + 20;
              
              particle.style.cssText = `
                position: absolute;
                width: 3px;
                height: 3px;
                background: hsl(25, 95%, 53%);
                border-radius: 50%;
                left: ${startX}px;
                top: ${startY}px;
                opacity: 0.7;
                box-shadow: 0 0 8px hsl(25, 95%, 53%);
                z-index: 1;
                pointer-events: none;
              `;
              
              document.body.appendChild(particle);
              
              // Bottom-to-top scroll-based animation
              if (window.anime) {
                window.anime({
                  targets: particle,
                  translateY: [-sectionRect.height - 100],
                  translateX: [Math.random() * 60 - 30],
                  opacity: [0.7, 0.9, 0.5, 0],
                  scale: [0.3, 1.2, 0.8, 0],
                  duration: 2500 + Math.random() * 1500,
                  delay: i * 150,
                  easing: 'easeOutQuad',
                  complete: () => particle.remove()
                });
              }
            }
          };

          // Trigger particle effect on assembly
          window.gsap.timeline({
            scrollTrigger: {
              trigger: element,
              start: 'top 85%',
              onEnter: createParticleAssembly
            }
          });
        });
      };

      // Apply enhanced animations to services elements with staggered assembly
      createBidirectionalAnimation('.services-title', 0);
      createBidirectionalAnimation('.services-subtitle', 0.1);
      createBidirectionalAnimation('.service-card', 0.15);
    }
  };

  const animateAboutSection = () => {
    if (window.gsap && window.ScrollTrigger) {
      const createAboutBidirectionalAnimation = (selector: string, staggerDelay = 0.12, particleColor = 'hsl(262, 72%, 57%)') => {
        const elements = document.querySelectorAll(selector);
        
        elements.forEach((element, index) => {
          element.classList.add('magnetic-element');
          
          // Enhanced bidirectional animation for about section
          window.gsap.timeline({
            scrollTrigger: {
              trigger: element,
              start: 'top 85%',
              end: 'bottom 15%',
              toggleActions: 'play reverse play reverse',
              onEnter: () => {
                setTimeout(() => {
                  element.classList.add('assembled');
                  element.classList.remove('disassembled');
                }, index * staggerDelay * 1000);
              },
              onLeave: () => {
                element.classList.add('disassembled');
                element.classList.remove('assembled');
              },
              onEnterBack: () => {
                setTimeout(() => {
                  element.classList.add('assembled');
                  element.classList.remove('disassembled');
                }, (elements.length - index - 1) * staggerDelay * 1000);
              },
              onLeaveBack: () => {
                element.classList.add('disassembled');
                element.classList.remove('assembled');
              }
            }
          });

          // Subtle left-to-right particle animation across screen width
          const createAboutParticleEffect = () => {
            const particleCount = selector.includes('value-card') ? 4 : 6;
            const sectionRect = element.getBoundingClientRect();

            for (let i = 0; i < particleCount; i++) {
              const particle = document.createElement('div');
              const startY = sectionRect.top + Math.random() * sectionRect.height;
              
              particle.style.cssText = `
                position: absolute;
                width: 2.5px;
                height: 2.5px;
                background: ${particleColor};
                border-radius: 50%;
                left: -20px;
                top: ${startY}px;
                opacity: 0.8;
                box-shadow: 0 0 6px ${particleColor};
                z-index: 1;
                pointer-events: none;
              `;
              
              document.body.appendChild(particle);
              
              if (window.anime) {
                window.anime({
                  targets: particle,
                  translateX: [window.innerWidth + 40],
                  translateY: [Math.random() * 80 - 40],
                  opacity: [0.8, 1, 0.6, 0],
                  scale: [0.4, 1.5, 1, 0],
                  duration: 3500 + Math.random() * 2000,
                  delay: i * 400,
                  easing: 'easeInOutQuad',
                  complete: () => particle.remove()
                });
              }
            }
          };

          window.gsap.timeline({
            scrollTrigger: {
              trigger: element,
              start: 'top 80%',
              onEnter: createAboutParticleEffect
            }
          });
        });
      };

      // Apply enhanced animations with different colors and timings
      createAboutBidirectionalAnimation('.about-title', 0, 'hsl(262, 72%, 57%)');
      createAboutBidirectionalAnimation('.about-description', 0.1, 'hsl(217, 91%, 60%)');
      createAboutBidirectionalAnimation('.vision-item', 0.12, 'hsl(25, 95%, 53%)');
      createAboutBidirectionalAnimation('.mission-item', 0.14, 'hsl(262, 72%, 57%)');
      createAboutBidirectionalAnimation('.value-card', 0.08, 'hsl(25, 95%, 53%)');
    }
  };

  const animateContactSection = () => {
    if (window.gsap && window.ScrollTrigger) {
      const createContactBidirectionalAnimation = (selector: string, staggerDelay = 0.15, particleColor = 'hsl(217, 91%, 60%)') => {
        const elements = document.querySelectorAll(selector);
        
        elements.forEach((element, index) => {
          element.classList.add('magnetic-element');
          
          // Enhanced bidirectional animation for contact section
          window.gsap.timeline({
            scrollTrigger: {
              trigger: element,
              start: 'top 80%',
              end: 'bottom 20%',
              toggleActions: 'play reverse play reverse',
              onEnter: () => {
                setTimeout(() => {
                  element.classList.add('assembled');
                  element.classList.remove('disassembled');
                }, index * staggerDelay * 1000);
              },
              onLeave: () => {
                element.classList.add('disassembled');
                element.classList.remove('assembled');
              },
              onEnterBack: () => {
                setTimeout(() => {
                  element.classList.add('assembled');
                  element.classList.remove('disassembled');
                }, (elements.length - index - 1) * staggerDelay * 1000);
              },
              onLeaveBack: () => {
                element.classList.add('disassembled');
                element.classList.remove('assembled');
              }
            }
          });

          // Subtle right-to-left particle animation across screen width
          const createContactParticleEffect = () => {
            const particleCount = selector.includes('contact-form') ? 5 : 4;
            const sectionRect = element.getBoundingClientRect();

            for (let i = 0; i < particleCount; i++) {
              const particle = document.createElement('div');
              const startY = sectionRect.top + Math.random() * sectionRect.height;
              
              particle.style.cssText = `
                position: absolute;
                width: 3px;
                height: 3px;
                background: ${particleColor};
                border-radius: 50%;
                left: ${window.innerWidth + 20}px;
                top: ${startY}px;
                opacity: 0.8;
                box-shadow: 0 0 8px ${particleColor};
                z-index: 1;
                pointer-events: none;
              `;
              
              document.body.appendChild(particle);
              
              if (window.anime) {
                window.anime({
                  targets: particle,
                  translateX: [-window.innerWidth - 40],
                  translateY: [Math.random() * 60 - 30],
                  opacity: [0.8, 1, 0.7, 0],
                  scale: [0.5, 1.6, 1.2, 0],
                  duration: 3000 + Math.random() * 2000,
                  delay: i * 300,
                  easing: 'easeInOutQuad',
                  complete: () => particle.remove()
                });
              }
            }
          };

          window.gsap.timeline({
            scrollTrigger: {
              trigger: element,
              start: 'top 75%',
              onEnter: createContactParticleEffect
            }
          });
        });
      };

      // Apply enhanced animations with blue particle effects
      createContactBidirectionalAnimation('.contact-title', 0, 'hsl(217, 91%, 60%)');
      createContactBidirectionalAnimation('.contact-description', 0.1, 'hsl(25, 95%, 53%)');
      createContactBidirectionalAnimation('.contact-method', 0.12, 'hsl(262, 72%, 57%)');
      createContactBidirectionalAnimation('.contact-form', 0.08, 'hsl(217, 91%, 60%)');
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
        card.addEventListener('mousemove', function(this: Element, e: Event) {
          const mouseEvent = e as MouseEvent;
          const rect = this.getBoundingClientRect();
          const x = mouseEvent.clientX - rect.left;
          const y = mouseEvent.clientY - rect.top;
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