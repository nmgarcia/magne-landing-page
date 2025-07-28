import { useEffect, useRef } from "react";

declare global {
  interface Window {
    anime: any;
    gsap: any;
    ScrollTrigger: any;
  }
}

export function useSmoothAnimations() {
  const isInitialized = useRef(false);

  useEffect(() => {
    if (!isInitialized.current && window.gsap && window.anime) {
      isInitialized.current = true;
      initializeAnimations();
    }
  }, []);

  const initializeAnimations = () => {
    // Register GSAP ScrollTrigger with iOS optimization
    if (window.gsap && window.ScrollTrigger) {
      window.gsap.registerPlugin(window.ScrollTrigger);

      // Enhanced configuration for iOS and smooth scrolling
      window.ScrollTrigger.config({
        autoRefreshEvents: "visibilitychange,DOMContentLoaded,load",
        refreshPriority: -90,
        // iOS specific optimizations
        ignoreMobileResize: true,
      });

      // Better smooth scroll normalization for iOS
      window.ScrollTrigger.normalizeScroll({
        allowNestedScroll: true,
        lockAxis: false,
        momentum: true,
        type: "touch,wheel,pointer"
      });

      // Disable on low-power devices for better performance
      if (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 2) {
        window.ScrollTrigger.config({
          autoRefreshEvents: "visibilitychange,DOMContentLoaded,load"
        });
      }
    }
  };

  const animateHeroElements = async (onComplete?: () => void) => {
    if (window.anime) {
      window.anime
        .timeline({
          easing: "easeOutExpo",
          duration: 800,
          delay: 500,
          complete: onComplete,
        })
        .add({
          targets: ".hero-title",
          translateY: [60, 0],
          opacity: [0, 1],
          delay: window.anime.stagger(150),
        })
        .add(
          {
            targets: ".hero-subtitle",
            translateY: [40, 0],
            opacity: [0, 1],
          },
          "-=600"
        )
        .add(
          {
            targets: ".hero-cta",
            translateY: [30, 0],
            opacity: [0, 1],
          },
          "-=500"
        )
        .add(
          {
            targets: ".hero-badge",
            translateY: [20, 0],
            opacity: [0, 1],
          },
          "-=700"
        );

      window.anime({
        targets: ".floating-icon",
        translateY: [-20, 20],
        rotate: [-5, 5],
        duration: 3000,
        direction: "alternate",
        loop: true,
        easing: "easeInOutSine",
        delay: window.anime.stagger(500),
      });
    }
  };

  const animateServicesSection = (onComplete?: () => void) => {
    if (window.gsap && window.ScrollTrigger) {
      const isMobile = window.innerWidth < 768;
      const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
      
      const createSmoothAnimation = (
        selector: string,
        staggerDelay = 0.05,
        callback?: () => void
      ) => {
        const elements = document.querySelectorAll(selector);

        elements.forEach((element, index) => {
          element.classList.add("magnetic-element");

          // Set initial state immediately
          window.gsap.set(element, {
            y: 50,
            opacity: 0,
            scale: 0.9,
            filter: "blur(5px)"
          });

          // Controlled entrance animation only
          window.gsap.timeline({
            scrollTrigger: {
              trigger: element,
              start: "top 85%",
              end: "top 60%",
              toggleActions: "play none none none",
              fastScrollEnd: isIOS ? 2500 : false,
              preventOverlaps: true,
              onEnter: () => {
                window.gsap.to(element, {
                  y: 0,
                  opacity: 1,
                  scale: 1,
                  filter: "blur(0px)",
                  duration: 0.8,
                  ease: "power2.out",
                  delay: index * staggerDelay,
                  onComplete: () => {
                    element.classList.add("assembled");
                    element.classList.remove("disassembled");
                    // Set final stable state
                    window.gsap.set(element, {
                      y: 0,
                      opacity: 1,
                      scale: 1,
                      filter: "blur(0px)",
                      clearProps: "transform,filter"
                    });
                    if (callback && index === elements.length - 1) {
                      callback();
                    }
                  }
                });
              }
            }
          });

          // Particle effect for assembly (reduced on mobile/iOS)
          if (!isMobile && !isIOS) {
            const createParticleAssembly = () => {
              const particleCount = 8;
              const section = document.querySelector("#services") as HTMLElement;
              if (!section) return;

              for (let i = 0; i < particleCount; i++) {
                const particle = document.createElement("div");
                particle.className = "scroll-particle";
                particle.style.cssText = `
                  position: absolute;
                  width: 4px;
                  height: 4px;
                  background: hsl(217, 91%, 60%);
                  border-radius: 50%;
                  pointer-events: none;
                  z-index: 1;
                `;

                const rect = element.getBoundingClientRect();
                const sectionRect = section.getBoundingClientRect();
                
                particle.style.left = `${rect.left - sectionRect.left + Math.random() * rect.width}px`;
                particle.style.top = `${rect.top - sectionRect.top + Math.random() * rect.height}px`;

                section.appendChild(particle);

                window.anime({
                  targets: particle,
                  scale: [0, 1.5, 0],
                  opacity: [0, 0.8, 0],
                  translateY: () => window.anime.random(-30, -60),
                  translateX: () => window.anime.random(-20, 20),
                  duration: 1200,
                  easing: "easeOutQuart",
                  complete: () => particle.remove(),
                  delay: i * 100,
                });
              }
            };

            // Trigger particle effect
            window.gsap.timeline({
              scrollTrigger: {
                trigger: element,
                start: "top 80%",
                onEnter: createParticleAssembly,
              },
            });
          }
        });
      };

      // Initialize elements as hidden
      const allElements = document.querySelectorAll(".services-title, .services-subtitle, .service-card");
      allElements.forEach(element => {
        element.classList.add("magnetic-element");
      });

      // Apply smooth animations to services elements
      let completedAnimations = 0;
      const totalAnimations = 3;
      
      const checkComplete = () => {
        completedAnimations++;
        if (completedAnimations === totalAnimations && onComplete) {
          onComplete();
        }
      };

      createSmoothAnimation(".services-title", 0, checkComplete);
      createSmoothAnimation(".services-subtitle", 0.05, checkComplete);
      createSmoothAnimation(".service-card", 0.08, checkComplete);
    }
  };

  const animateAboutSection = (onComplete?: () => void) => {
    if (window.gsap && window.ScrollTrigger) {
      const isMobile = window.innerWidth < 768;
      const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);

      const createAboutSmoothAnimation = (
        selector: string,
        staggerDelay = 0.04,
        callback?: () => void
      ) => {
        const elements = document.querySelectorAll(selector);

        elements.forEach((element, index) => {
          element.classList.add("magnetic-element");

          // Set initial state immediately for about
          window.gsap.set(element, {
            y: 40,
            opacity: 0,
            scale: 0.95,
            filter: "blur(4px)"
          });

          // Controlled about entrance animation only
          window.gsap.timeline({
            scrollTrigger: {
              trigger: element,
              start: "top 85%",
              end: "top 60%",
              toggleActions: "play none none none",
              fastScrollEnd: isIOS ? 2500 : false,
              preventOverlaps: true,
              onEnter: () => {
                window.gsap.to(element, {
                  y: 0,
                  opacity: 1,
                  scale: 1,
                  filter: "blur(0px)",
                  duration: 0.7,
                  ease: "power2.out",
                  delay: index * staggerDelay,
                  onComplete: () => {
                    element.classList.add("assembled");
                    element.classList.remove("disassembled");
                    // Lock final state to prevent jumps
                    window.gsap.set(element, {
                      y: 0,
                      opacity: 1,
                      scale: 1,
                      filter: "blur(0px)",
                      clearProps: "transform,filter"
                    });
                    if (callback && index === elements.length - 1) {
                      callback();
                    }
                  }
                });
              }
            }
          });
        });
      };

      // Initialize elements as hidden
      const allAboutElements = document.querySelectorAll(".about-title, .about-description, .vision-item, .mission-item, .value-card");
      allAboutElements.forEach(element => {
        element.classList.add("magnetic-element");
      });

      // Apply smooth about animations with callback control
      let completedAboutAnimations = 0;
      const totalAboutAnimations = 5;
      
      const checkAboutComplete = () => {
        completedAboutAnimations++;
        if (completedAboutAnimations === totalAboutAnimations && onComplete) {
          onComplete();
        }
      };

      createAboutSmoothAnimation(".about-title", 0, checkAboutComplete);
      createAboutSmoothAnimation(".about-description", 0.04, checkAboutComplete);
      createAboutSmoothAnimation(".vision-item", 0.06, checkAboutComplete);
      createAboutSmoothAnimation(".mission-item", 0.08, checkAboutComplete);
      createAboutSmoothAnimation(".value-card", 0.03, checkAboutComplete);
    }
  };

  const animateContactSection = (onComplete?: () => void) => {
    if (window.gsap && window.ScrollTrigger) {
      const isMobile = window.innerWidth < 768;
      const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);

      const createContactSmoothAnimation = (
        selector: string,
        staggerDelay = 0.05,
        callback?: () => void
      ) => {
        const elements = document.querySelectorAll(selector);

        elements.forEach((element, index) => {
          element.classList.add("magnetic-element");

          // Set initial state immediately for contact
          window.gsap.set(element, {
            y: 35,
            opacity: 0,
            scale: 0.97,
            filter: "blur(3px)"
          });

          // Controlled contact entrance animation only
          window.gsap.timeline({
            scrollTrigger: {
              trigger: element,
              start: "top 85%",
              end: "top 60%",
              toggleActions: "play none none none",
              fastScrollEnd: isIOS ? 2500 : false,
              preventOverlaps: true,
              onEnter: () => {
                window.gsap.to(element, {
                  y: 0,
                  opacity: 1,
                  scale: 1,
                  filter: "blur(0px)",
                  duration: 0.6,
                  ease: "power2.out",
                  delay: index * staggerDelay,
                  onComplete: () => {
                    element.classList.add("assembled");
                    element.classList.remove("disassembled");
                    // Lock final state to prevent any jumps
                    window.gsap.set(element, {
                      y: 0,
                      opacity: 1,
                      scale: 1,
                      filter: "blur(0px)",
                      clearProps: "transform,filter"
                    });
                    if (callback && index === elements.length - 1) {
                      callback();
                    }
                  }
                });
              }
            }
          });
        });
      };

      // Initialize elements as hidden
      const allContactElements = document.querySelectorAll(".contact-title, .contact-description, .contact-method, .contact-form");
      allContactElements.forEach(element => {
        element.classList.add("magnetic-element");
      });

      // Apply smooth contact animations with callback control
      let completedContactAnimations = 0;
      const totalContactAnimations = 4;
      
      const checkContactComplete = () => {
        completedContactAnimations++;
        if (completedContactAnimations === totalContactAnimations && onComplete) {
          onComplete();
        }
      };

      createContactSmoothAnimation(".contact-title", 0, checkContactComplete);
      createContactSmoothAnimation(".contact-description", 0.04, checkContactComplete);
      createContactSmoothAnimation(".contact-method", 0.06, checkContactComplete);
      createContactSmoothAnimation(".contact-form", 0.03, checkContactComplete);
    }
  };

  const initMagneticEffects = () => {
    const isMobile = window.innerWidth < 768;
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    
    if (window.anime && !isMobile && !isIOS) {
      // Enhanced magnetic button effects (desktop only)
      document.querySelectorAll(".magnetic-btn").forEach((btn) => {
        btn.addEventListener("mouseenter", function (this: Element) {
          window.anime({
            targets: this,
            scale: 1.05,
            rotate: "1deg",
            duration: 300,
            easing: "easeOutElastic(1, .6)",
          });
        });

        btn.addEventListener("mouseleave", function (this: Element) {
          window.anime({
            targets: this,
            scale: 1,
            rotate: "0deg",
            duration: 300,
            easing: "easeOutElastic(1, .6)",
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
    initMagneticEffects,
  };
}