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
      // Simple, clean animations without particle effects
      const animateElement = (selector: string, delay = 0) => {
        window.gsap.fromTo(selector, 
          {
            opacity: 0,
            y: 50,
            scale: 0.95
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            delay: delay,
            ease: "power2.out",
            scrollTrigger: {
              trigger: selector,
              start: "top 85%",
              end: "bottom 15%",
              toggleActions: "play reverse play reverse"
            }
          }
        );
      };

      // Animate elements with staggered timing
      animateElement('.services-title', 0);
      animateElement('.services-subtitle', 0.1);
      
      // Animate service cards individually
      document.querySelectorAll('.service-card').forEach((card, index) => {
        window.gsap.fromTo(card, 
          {
            opacity: 0,
            y: 60,
            scale: 0.9
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.6,
            delay: index * 0.1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: card,
              start: "top 90%",
              end: "bottom 10%",
              toggleActions: "play reverse play reverse"
            }
          }
        );
      });
    }
  };

  const animateAboutSection = () => {
    if (window.gsap && window.ScrollTrigger) {
      const animateElement = (selector: string, delay = 0) => {
        window.gsap.fromTo(selector, 
          {
            opacity: 0,
            y: 40,
            x: -20
          },
          {
            opacity: 1,
            y: 0,
            x: 0,
            duration: 0.8,
            delay: delay,
            ease: "power2.out",
            scrollTrigger: {
              trigger: selector,
              start: "top 85%",
              end: "bottom 15%",
              toggleActions: "play reverse play reverse"
            }
          }
        );
      };

      animateElement('.about-title', 0);
      animateElement('.about-description', 0.1);
      animateElement('.vision-item', 0.2);
      animateElement('.mission-item', 0.3);
      
      // Animate value cards
      document.querySelectorAll('.value-card').forEach((card, index) => {
        window.gsap.fromTo(card, 
          {
            opacity: 0,
            y: 30,
            scale: 0.95
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.5,
            delay: index * 0.08,
            ease: "power2.out",
            scrollTrigger: {
              trigger: card,
              start: "top 90%",
              toggleActions: "play reverse play reverse"
            }
          }
        );
      });
    }
  };

  const animateContactSection = () => {
    if (window.gsap && window.ScrollTrigger) {
      const animateElement = (selector: string, delay = 0) => {
        window.gsap.fromTo(selector, 
          {
            opacity: 0,
            y: 40,
            x: 20
          },
          {
            opacity: 1,
            y: 0,
            x: 0,
            duration: 0.8,
            delay: delay,
            ease: "power2.out",
            scrollTrigger: {
              trigger: selector,
              start: "top 80%",
              end: "bottom 20%",
              toggleActions: "play reverse play reverse"
            }
          }
        );
      };

      animateElement('.contact-title', 0);
      animateElement('.contact-description', 0.1);
      
      // Animate contact methods
      document.querySelectorAll('.contact-method').forEach((method, index) => {
        window.gsap.fromTo(method, 
          {
            opacity: 0,
            x: -30,
            scale: 0.95
          },
          {
            opacity: 1,
            x: 0,
            scale: 1,
            duration: 0.6,
            delay: index * 0.1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: method,
              start: "top 85%",
              toggleActions: "play reverse play reverse"
            }
          }
        );
      });

      // Animate contact form
      window.gsap.fromTo('.contact-form', 
        {
          opacity: 0,
          y: 50,
          scale: 0.95
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          delay: 0.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: '.contact-form',
            start: "top 85%",
            toggleActions: "play reverse play reverse"
          }
        }
      );
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

      // Simple service cards magnetic effect without complex 3D rotation
      document.querySelectorAll('.service-card').forEach(card => {
        card.addEventListener('mouseenter', function(this: Element) {
          window.anime({
            targets: this,
            scale: 1.02,
            duration: 300,
            easing: 'easeOutExpo'
          });
        });

        card.addEventListener('mouseleave', function(this: Element) {
          window.anime({
            targets: this,
            scale: 1,
            duration: 300,
            easing: 'easeOutExpo'
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