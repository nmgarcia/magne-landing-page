import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { animate, Timeline, stagger } from "animejs";

gsap.registerPlugin(ScrollTrigger);

export function useOptimizedAnimations() {
  const isInitialized = useRef(false);

  useEffect(() => {
    if (!isInitialized.current) {
      isInitialized.current = true;
      initializeAnimations();
    }
    
    return () => {
      // Cleanup ScrollTriggers on unmount to prevent memory leaks and conflicts
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  const initializeAnimations = () => {
    // Configure ScrollTrigger for smoother scroll behavior
    ScrollTrigger.config({
      autoRefreshEvents: "visibilitychange,DOMContentLoaded,load,resize",
      limitCallbacks: true,
      ignoreMobileResize: true
    });

    // Add smooth scroll behavior for better flow
    ScrollTrigger.normalizeScroll(true);
  };

  const animateHeroElements = async (onComplete?: () => void) => {
    const tl = new Timeline({
        playbackEase: "easeOutExpo",
        duration: 800,
        delay: 500,
        onComplete: onComplete, // v4 might use onComplete instead of complete
      });
      
    tl.add(".hero-title", {
        translateY: [60, 0],
        opacity: [0, 1],
        delay: stagger(150),
      })
      .add(".hero-subtitle", {
          translateY: [40, 0],
          opacity: [0, 1],
        },
        "-=600"
      )
      .add(".hero-cta", {
          translateY: [30, 0],
          opacity: [0, 1],
        },
        "-=500"
      )
      .add(".hero-badge", {
          translateY: [20, 0],
          opacity: [0, 1],
        },
        "-=700"
      );

    animate(".floating-icon", {
      translateY: [-20, 20],
      rotate: [-5, 5],
      duration: 3000,
      direction: "alternate",
      loop: true,
      easing: "easeInOutSine",
      delay: stagger(500),
    });
  };

  const animateServicesSection = () => {
    const createOptimizedAnimation = (
      selector: string,
      staggerDelay = 0.1
    ) => {
      const elements = document.querySelectorAll(selector);

      elements.forEach((element) => {
        // Use GSAP for the entry animation instead of class toggling
        gsap.fromTo(
          element,
          { 
            y: 50, 
            opacity: 0,
            scale: 0.95
          },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.3,
            ease: "power3.out",
            scrollTrigger: {
              trigger: element,
              start: "top 80%", // Trigger earlier for smoother feel
              end: "bottom 15%",
              toggleActions: "play none none none", // Play once and stay
            },
          }
        );

        // Optimized particle effects - only create if not mobile to save performance
        if (window.innerWidth > 768) {
           createOptimizedParticles("#services", element as HTMLElement);
        }
      });
    };

    // Apply optimized animations
    createOptimizedAnimation(".services-title", 0);
    createOptimizedAnimation(".services-subtitle", 0.06);
    createOptimizedAnimation(".service-card", 0.1);
  };

  const animateAboutSection = () => {
    const createAboutOptimizedAnimation = (
      selector: string,
      staggerDelay = 0.1,
      particleColor = "hsl(262, 72%, 57%)"
    ) => {
      const elements = document.querySelectorAll(selector);

      elements.forEach((element) => {
        gsap.fromTo(
          element,
          { 
            y: 40, 
            opacity: 0 
          },
          {
            y: 0,
            opacity: 1,
            duration: 0.3,
            ease: "power2.out",
            scrollTrigger: {
              trigger: element,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          }
        );

        if (window.innerWidth > 768) {
             createOptimizedParticles("#about", element as HTMLElement, particleColor);
        }
      });
    };

    // Apply optimized about animations
    createAboutOptimizedAnimation(".about-title", 0, "hsl(262, 72%, 57%)");
    createAboutOptimizedAnimation(
      ".about-description",
      0.06,
      "hsl(217, 91%, 60%)"
    );
    createAboutOptimizedAnimation(".vision-item", 0.08, "hsl(25, 95%, 53%)");
    createAboutOptimizedAnimation(".mission-item", 0.1, "hsl(262, 72%, 57%)");
    createAboutOptimizedAnimation(".value-card", 0.05, "hsl(25, 95%, 53%)");
  };

  const animateContactSection = () => {
    const createContactOptimizedAnimation = (
      selector: string,
      staggerDelay = 0.1,
      particleColor = "hsl(217, 91%, 60%)"
    ) => {
      const elements = document.querySelectorAll(selector);

      elements.forEach((element) => {
         gsap.fromTo(
          element,
          { 
            y: 20, 
            opacity: 0 
          },
          {
            y: 0,
            opacity: 1,
            duration: 0.25,
            ease: "power2.out",
            scrollTrigger: {
              trigger: element,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          }
        );
        
        if (window.innerWidth > 768) {
            createOptimizedParticles("#contact", element as HTMLElement, particleColor);
        }
      });
    };

    // Apply optimized contact animations
    createContactOptimizedAnimation(
      ".contact-title",
      0,
      "hsl(217, 91%, 60%)"
    );
    createContactOptimizedAnimation(
      ".contact-description",
      0.06,
      "hsl(25, 95%, 53%)"
    );
    createContactOptimizedAnimation(
      ".contact-method",
      0.08,
      "hsl(262, 72%, 57%)"
    );
    createContactOptimizedAnimation(
      ".contact-form",
      0.05,
      "hsl(217, 91%, 60%)"
    );
  };

  // Shared particle creation function to reduce code duplication
  const createOptimizedParticles = (sectionId: string, triggerElement: HTMLElement, color?: string) => {
      const section = document.querySelector(sectionId) as HTMLElement;
      if (!section) return;

      // Use ScrollTrigger to trigger particles only when element comes into view
      ScrollTrigger.create({
          trigger: triggerElement,
          start: "top 80%",
          once: true, // Only fire once for performance
          onEnter: () => {
              const particleCount = 4; // Reduced count
              for (let i = 0; i < particleCount; i++) {
                  const particle = document.createElement("div");
                  const startY = Math.random() * section.offsetHeight;
                  const pColor = color || "hsl(25, 95%, 53%)";

                  particle.style.cssText = `
                    position: absolute;
                    width: 4px;
                    height: 4px;
                    background: ${pColor};
                    border-radius: 50%;
                    left: ${Math.random() * section.offsetWidth}px;
                    top: ${startY}px;
                    opacity: 0;
                    box-shadow: 0 0 8px ${pColor};
                    z-index: 10;
                    pointer-events: none;
                  `;

                  section.appendChild(particle);

                  animate(particle, {
                    translateY: [0, -100],
                    opacity: [0, 0.8, 0],
                    scale: [0, 1.5, 0],
                    duration: 2000 + Math.random() * 1000,
                    easing: "easeOutQuad",
                    onComplete: () => particle.remove(), // v4 might use onComplete
                  });
              }
          }
      });
  }

  const initMagneticEffects = () => {
      // Magnetic button effects
      document.querySelectorAll(".magnetic-btn").forEach((btn) => {
        btn.addEventListener("mouseenter", function (this: Element) {
          animate(this, {
            scale: 1.05,
            rotate: "1deg",
            duration: 300,
            easing: "easeOutElastic(1, .6)",
          });
        });

        btn.addEventListener("mouseleave", function (this: Element) {
          animate(this, {
            scale: 1,
            rotate: "0deg",
            duration: 300,
            easing: "easeOutElastic(1, .6)",
          });
        });
      });

      // Service cards magnetic effect
      document.querySelectorAll(".service-card").forEach((card) => {
        card.addEventListener("mousemove", function (this: Element, e: Event) {
          const mouseEvent = e as MouseEvent;
          const rect = this.getBoundingClientRect();
          const x = mouseEvent.clientX - rect.left;
          const y = mouseEvent.clientY - rect.top;
          const centerX = rect.width / 2;
          const centerY = rect.height / 2;
          const rotateX = (y - centerY) / 20; // Reduced sensitivity
          const rotateY = (centerX - x) / 20;

          animate(this, {
            rotateX: rotateX,
            rotateY: rotateY,
            duration: 100, // Faster response
            easing: "linear",
          });
        });

        card.addEventListener("mouseleave", function (this: Element) {
          animate(this, {
            rotateX: 0,
            rotateY: 0,
            duration: 300,
            easing: "easeOutElastic(1, .6)",
          });
        });
      });
  };

  return {
    animateHeroElements,
    animateServicesSection,
    animateAboutSection,
    animateContactSection,
    initMagneticEffects,
  };
}
