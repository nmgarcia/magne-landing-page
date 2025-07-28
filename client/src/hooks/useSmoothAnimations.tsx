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

  const animateServicesSection = () => {
    if (window.gsap && window.ScrollTrigger) {
      const isMobile = window.innerWidth < 768;
      const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
      
      const createSmoothAnimation = (
        selector: string,
        staggerDelay = 0.05
      ) => {
        const elements = document.querySelectorAll(selector);

        elements.forEach((element, index) => {
          element.classList.add("magnetic-element");

          // Smooth entrance animation with GSAP
          const tl = window.gsap.timeline({
            scrollTrigger: {
              trigger: element,
              start: "top 85%",
              end: "bottom 25%",
              toggleActions: "play none none reverse",
              // iOS optimizations
              fastScrollEnd: isIOS ? 2500 : false,
              preventOverlaps: true,
              refreshPriority: index,
            },
          });

          // Smooth entrance
          tl.fromTo(element, 
            {
              y: 50,
              opacity: 0,
              scale: 0.9,
              filter: "blur(10px)"
            },
            {
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
              }
            }
          );

          // Smooth exit animation
          const exitTl = window.gsap.timeline({
            scrollTrigger: {
              trigger: element,
              start: "bottom 75%",
              end: "bottom 0%",
              toggleActions: "none none play none",
              fastScrollEnd: isIOS ? 2500 : false,
              onLeave: () => {
                window.gsap.to(element, {
                  y: -30,
                  opacity: 0.3,
                  scale: 0.95,
                  filter: "blur(3px)",
                  duration: 0.4,
                  ease: "power2.in",
                  onComplete: () => {
                    element.classList.add("disassembled");
                    element.classList.remove("assembled");
                  }
                });
              },
              onEnterBack: () => {
                window.gsap.to(element, {
                  y: 0,
                  opacity: 1,
                  scale: 1,
                  filter: "blur(0px)",
                  duration: 0.6,
                  ease: "power2.out",
                  onComplete: () => {
                    element.classList.add("assembled");
                    element.classList.remove("disassembled");
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

      // Apply smooth animations to services elements
      createSmoothAnimation(".services-title", 0);
      createSmoothAnimation(".services-subtitle", 0.05);
      createSmoothAnimation(".service-card", 0.08);
    }
  };

  const animateAboutSection = () => {
    if (window.gsap && window.ScrollTrigger) {
      const isMobile = window.innerWidth < 768;
      const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);

      const createAboutSmoothAnimation = (
        selector: string,
        staggerDelay = 0.04,
        particleColor = "hsl(262, 72%, 57%)"
      ) => {
        const elements = document.querySelectorAll(selector);

        elements.forEach((element, index) => {
          element.classList.add("magnetic-element");

          // Main smooth animation
          const tl = window.gsap.timeline({
            scrollTrigger: {
              trigger: element,
              start: "top 85%",
              end: "bottom 25%",
              toggleActions: "play none none reverse",
              fastScrollEnd: isIOS ? 2500 : false,
              preventOverlaps: true,
            },
          });

          tl.fromTo(element, 
            {
              y: 40,
              opacity: 0,
              scale: 0.95,
              filter: "blur(8px)"
            },
            {
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
              }
            }
          );

          // Smooth exit
          window.gsap.timeline({
            scrollTrigger: {
              trigger: element,
              start: "bottom 75%",
              end: "bottom 0%",
              onLeave: () => {
                window.gsap.to(element, {
                  y: -25,
                  opacity: 0.4,
                  scale: 0.96,
                  filter: "blur(2px)",
                  duration: 0.3,
                  ease: "power2.in"
                });
              },
              onEnterBack: () => {
                window.gsap.to(element, {
                  y: 0,
                  opacity: 1,
                  scale: 1,
                  filter: "blur(0px)",
                  duration: 0.5,
                  ease: "power2.out"
                });
              }
            }
          });
        });
      };

      // Apply smooth about animations
      createAboutSmoothAnimation(".about-title", 0, "hsl(262, 72%, 57%)");
      createAboutSmoothAnimation(".about-description", 0.04, "hsl(217, 91%, 60%)");
      createAboutSmoothAnimation(".vision-item", 0.06, "hsl(25, 95%, 53%)");
      createAboutSmoothAnimation(".mission-item", 0.08, "hsl(262, 72%, 57%)");
      createAboutSmoothAnimation(".value-card", 0.03, "hsl(25, 95%, 53%)");
    }
  };

  const animateContactSection = () => {
    if (window.gsap && window.ScrollTrigger) {
      const isMobile = window.innerWidth < 768;
      const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);

      const createContactSmoothAnimation = (
        selector: string,
        staggerDelay = 0.05,
        particleColor = "hsl(217, 91%, 60%)"
      ) => {
        const elements = document.querySelectorAll(selector);

        elements.forEach((element, index) => {
          element.classList.add("magnetic-element");

          // Smooth contact animation
          const tl = window.gsap.timeline({
            scrollTrigger: {
              trigger: element,
              start: "top 85%",
              end: "bottom 25%",
              toggleActions: "play none none reverse",
              fastScrollEnd: isIOS ? 2500 : false,
              preventOverlaps: true,
            },
          });

          tl.fromTo(element, 
            {
              y: 35,
              opacity: 0,
              scale: 0.97,
              filter: "blur(6px)"
            },
            {
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
              }
            }
          );

          // Smooth exit for contact
          window.gsap.timeline({
            scrollTrigger: {
              trigger: element,
              start: "bottom 75%",
              end: "bottom 0%",
              onLeave: () => {
                window.gsap.to(element, {
                  y: -20,
                  opacity: 0.5,
                  scale: 0.98,
                  filter: "blur(1px)",
                  duration: 0.25,
                  ease: "power2.in"
                });
              },
              onEnterBack: () => {
                window.gsap.to(element, {
                  y: 0,
                  opacity: 1,
                  scale: 1,
                  filter: "blur(0px)",
                  duration: 0.4,
                  ease: "power2.out"
                });
              }
            }
          });
        });
      };

      // Apply smooth contact animations
      createContactSmoothAnimation(".contact-title", 0, "hsl(217, 91%, 60%)");
      createContactSmoothAnimation(".contact-description", 0.04, "hsl(25, 95%, 53%)");
      createContactSmoothAnimation(".contact-method", 0.06, "hsl(262, 72%, 57%)");
      createContactSmoothAnimation(".contact-form", 0.03, "hsl(217, 91%, 60%)");
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