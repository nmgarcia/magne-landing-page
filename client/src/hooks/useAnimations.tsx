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
    if (window.gsap) {
      window.gsap.from('.services-title', {
        y: 50,
        opacity: 0,
        duration: 1,
        scrollTrigger: {
          trigger: '.services-title',
          start: 'top 80%'
        }
      });

      window.gsap.from('.services-subtitle', {
        y: 30,
        opacity: 0,
        duration: 1,
        delay: 0.2,
        scrollTrigger: {
          trigger: '.services-subtitle',
          start: 'top 80%'
        }
      });

      window.gsap.from('.service-card', {
        y: 80,
        opacity: 0,
        rotation: 5,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.service-card',
          start: 'top 85%'
        }
      });
    }
  };

  const animateAboutSection = () => {
    if (window.gsap) {
      const tl = window.gsap.timeline({
        scrollTrigger: {
          trigger: '#about',
          start: 'top 70%'
        }
      });

      tl.from('.about-title', {
        x: -100,
        opacity: 0,
        duration: 1
      })
      .from('.about-description', {
        x: -50,
        opacity: 0,
        duration: 0.8
      }, '-=0.5')
      .from('.vision-item, .mission-item', {
        y: 50,
        opacity: 0,
        duration: 0.6,
        stagger: 0.2
      }, '-=0.3')
      .from('.about-visual img', {
        scale: 0.8,
        opacity: 0,
        duration: 1,
        ease: 'power2.out'
      }, '-=1');

      window.gsap.from('.value-card', {
        y: 60,
        opacity: 0,
        rotation: 10,
        duration: 0.6,
        stagger: 0.1,
        ease: 'back.out(1.7)',
        scrollTrigger: {
          trigger: '.value-card',
          start: 'top 85%'
        }
      });
    }
  };

  const animateContactSection = () => {
    if (window.gsap) {
      const tl = window.gsap.timeline({
        scrollTrigger: {
          trigger: '#contact',
          start: 'top 70%'
        }
      });

      tl.from('.contact-title', {
        y: 50,
        opacity: 0,
        duration: 1
      })
      .from('.contact-description', {
        y: 30,
        opacity: 0,
        duration: 0.8
      }, '-=0.5')
      .from('.contact-method', {
        x: -50,
        opacity: 0,
        duration: 0.6,
        stagger: 0.15
      }, '-=0.3')
      .from('.contact-form', {
        x: 50,
        opacity: 0,
        duration: 1,
        ease: 'power2.out'
      }, '-=1');
    }
  };

  const initMagneticEffects = () => {
    if (window.anime) {
      // Magnetic button effects
      document.querySelectorAll('.magnetic-btn').forEach(btn => {
        btn.addEventListener('mouseenter', function() {
          window.anime({
            targets: this,
            scale: 1.05,
            rotate: '1deg',
            duration: 300,
            easing: 'easeOutElastic(1, .6)'
          });
        });

        btn.addEventListener('mouseleave', function() {
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
        card.addEventListener('mousemove', function(e: any) {
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

        card.addEventListener('mouseleave', function() {
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
