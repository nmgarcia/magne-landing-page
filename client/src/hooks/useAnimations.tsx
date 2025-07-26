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

          // Enhanced particle assembly effect for services
          const createParticleAssembly = () => {
            const particleCount = selector.includes('service-card') ? 20 : 15;
            const container = element.parentElement || document.body;

            for (let i = 0; i < particleCount; i++) {
              const particle = document.createElement('div');
              const angle = (i / particleCount) * Math.PI * 2;
              const distance = 100 + Math.random() * 50;
              const x = Math.cos(angle) * distance;
              const y = Math.sin(angle) * distance;
              
              particle.style.cssText = `
                position: absolute;
                width: 2px;
                height: 2px;
                background: hsl(25, 95%, 53%);
                border-radius: 50%;
                top: 50%;
                left: 50%;
                transform: translate(${x}px, ${y}px);
                opacity: 0.8;
                box-shadow: 0 0 6px hsl(25, 95%, 53%);
                z-index: -1;
                pointer-events: none;
              `;
              
              container.appendChild(particle);
              
              // Enhanced magnetic attraction animation
              if (window.anime) {
                window.anime({
                  targets: particle,
                  translateX: [x, 0],
                  translateY: [y, 0],
                  opacity: [0.8, 0.5, 0],
                  scale: [0.3, 1.5, 0],
                  rotate: [0, 180],
                  duration: 1200,
                  delay: i * 30,
                  easing: 'easeOutExpo',
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

          // Enhanced particle effect for about section
          const createAboutParticleEffect = () => {
            const particleCount = selector.includes('value-card') ? 8 : 12;
            const container = element.parentElement || element;

            for (let i = 0; i < particleCount; i++) {
              const particle = document.createElement('div');
              const angle = (i / particleCount) * Math.PI * 2;
              const distance = 60 + Math.random() * 40;
              const x = Math.cos(angle) * distance;
              const y = Math.sin(angle) * distance;
              
              particle.style.cssText = `
                position: absolute;
                width: 1.5px;
                height: 1.5px;
                background: ${particleColor};
                border-radius: 50%;
                top: 50%;
                left: 50%;
                transform: translate(${x}px, ${y}px);
                opacity: 0.6;
                box-shadow: 0 0 4px ${particleColor};
                z-index: -1;
                pointer-events: none;
              `;
              
              container.appendChild(particle);
              
              if (window.anime) {
                window.anime({
                  targets: particle,
                  translateX: 0,
                  translateY: 0,
                  opacity: [0.6, 0.3, 0],
                  scale: [0.3, 1, 0],
                  duration: 1000,
                  delay: i * 40,
                  easing: 'easeOutExpo',
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

          // Enhanced particle effect for contact section
          const createContactParticleEffect = () => {
            const particleCount = selector.includes('contact-form') ? 15 : 10;
            const container = element.parentElement || element;

            for (let i = 0; i < particleCount; i++) {
              const particle = document.createElement('div');
              const angle = (i / particleCount) * Math.PI * 2;
              const distance = 70 + Math.random() * 30;
              const x = Math.cos(angle) * distance;
              const y = Math.sin(angle) * distance;
              
              particle.style.cssText = `
                position: absolute;
                width: 2px;
                height: 2px;
                background: ${particleColor};
                border-radius: 50%;
                top: 50%;
                left: 50%;
                transform: translate(${x}px, ${y}px);
                opacity: 0.7;
                box-shadow: 0 0 5px ${particleColor};
                z-index: -1;
                pointer-events: none;
              `;
              
              container.appendChild(particle);
              
              if (window.anime) {
                window.anime({
                  targets: particle,
                  translateX: 0,
                  translateY: 0,
                  opacity: [0.7, 0.4, 0],
                  scale: [0.4, 1.2, 0],
                  duration: 1100,
                  delay: i * 30,
                  easing: 'easeOutExpo',
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