import { useEffect, useRef, useState } from "react";
import { useLanguage } from "../hooks/useLanguage";
import { useSmoothAnimations } from "@/hooks/useSmoothAnimations";

interface HeroSectionProps {
  isLoading?: boolean;
}
export default function HeroSection({ isLoading = false }: HeroSectionProps) {
  const { t } = useLanguage();
  const { animateHeroElements } = useSmoothAnimations();
  const sectionRef = useRef<HTMLDivElement>(null);
  const typewriterRef = useRef<HTMLSpanElement>(null);
  const heroSubtitle = t("heroSubtitle");
  const [opacity, setOpacity] = useState(0);

  useEffect(() => {
    if (isLoading) return;

    const timer = setTimeout(async () => {
      await animateHeroElements(() => {
        setOpacity(1);
      });
      initTypewriterEffect();
    }, 100);

    return () => clearTimeout(timer);
  }, [isLoading, heroSubtitle]);

  const initTypewriterEffect = async () => {
    const element = typewriterRef.current;
    if (!element) return;

    const text = heroSubtitle;
    element.textContent = "";

    let i = 0;
    const timer = setInterval(() => {
      element.textContent += text.charAt(i);
      i++;

      if (i >= text.length) {
        clearInterval(timer);
      }
    }, 30);
  };

  const scrollToServices = () => {
    const servicesSection = document.getElementById("services");
    if (servicesSection) {
      servicesSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const scrollToContact = () => {
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Animated Background Shapes */}
      <div className="absolute inset-0">
        <div className="morphing-shape absolute top-1/4 left-1/4 w-32 h-32 md:w-64 md:h-64 bg-gradient-to-r from-violet-500/20 to-orange-500/20 morph-shape"></div>
        <div
          className="morphing-shape absolute bottom-1/4 right-1/4 w-48 h-48 md:w-96 md:h-96 bg-gradient-to-r from-blue-500/15 to-purple-500/15 morph-shape"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>

      {/* Magnetic Field Lines */}
      <div className="absolute inset-0 opacity-10">
        <svg className="w-full h-full" viewBox="0 0 1200 800">
          <path
            className="magnetic-field-line"
            d="M100,400 Q300,200 500,400 T900,400"
            stroke="url(#fieldGradient)"
            strokeWidth="2"
            fill="none"
            opacity="0.5"
          />
          <path
            className="magnetic-field-line"
            d="M150,450 Q350,250 550,450 T950,450"
            stroke="url(#fieldGradient)"
            strokeWidth="1.5"
            fill="none"
            opacity="0.3"
          />
          <path
            className="magnetic-field-line"
            d="M200,350 Q400,150 600,350 T1000,350"
            stroke="url(#fieldGradient)"
            strokeWidth="1"
            fill="none"
            opacity="0.2"
          />
          <defs>
            <linearGradient
              id="fieldGradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop
                offset="0%"
                style={{ stopColor: "#F97316", stopOpacity: 1 }}
              />
              <stop
                offset="50%"
                style={{ stopColor: "#6B46C1", stopOpacity: 1 }}
              />
              <stop
                offset="100%"
                style={{ stopColor: "#1E40AF", stopOpacity: 1 }}
              />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        {!isLoading && (
          <>
            <div className="text-center max-w-5xl mx-auto">
              {/* Animated Badge */}
              <div
                className="hero-badge hero-animate-delay-1 inline-flex items-center px-4 sm:px-6 py-2 sm:py-3 bg-violet-500/20 border border-violet-500/30 rounded-full mb-6 sm:mb-8 backdrop-blur-sm"
                style={{ opacity: opacity }}
              >
                <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse mr-2 sm:mr-3"></div>
                <span className="text-xs sm:text-sm font-jetbrains tracking-wider">
                  {t("heroBadge")}
                </span>
              </div>

              {/* Main Title with Magnetic Effect */}
              <h1
                className="hero-title font-montserrat text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black mb-6 sm:mb-8 leading-tight"
                style={{ opacity: opacity }}
              >
                <div className="magnetic-text-line overflow-hidden pb-2">
                  <span className="magnetic-word inline-block">
                    {t("heroTitle1")}
                  </span>
                </div>
                <div className="magnetic-text-line overflow-hidden pb-2">
                  <span className="magnetic-word inline-block magne-gradient-text gradient-shift">
                    {t("heroTitle2")}
                  </span>
                </div>
                <div className="magnetic-text-line overflow-hidden pb-2">
                  <span className="magnetic-word inline-block">
                    {t("heroTitle3")}
                  </span>
                </div>
              </h1>

              {/* Subtitle with Typewriter Effect */}
              <p
                className="hero-subtitle hero-animate-delay-3 text-base sm:text-lg md:text-xl lg:text-2xl text-gray-300 mb-8 sm:mb-12 max-w-3xl mx-auto leading-relaxed px-4 sm:px-0"
                style={{ opacity: opacity }}
              >
                <span ref={typewriterRef}></span>
                <span className="typewriter-cursor animate-pulse">|</span>
              </p>

              {/* CTA Buttons */}
              <div
                className="hero-cta hero-animate-delay-4 flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center px-4 sm:px-0"
                style={{ opacity: opacity }}
              >
                <button
                  onClick={scrollToContact}
                  className="magnetic-btn bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-500 px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold text-base sm:text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl w-full sm:w-auto"
                  data-testid="cta-work-together"
                >
                  <span>{t("letWorkTogether")}</span>
                  <i className="fas fa-arrow-right ml-2"></i>
                </button>
                <button
                  onClick={scrollToServices}
                  className="magnetic-btn border-2 border-violet-500 hover:border-orange-500 hover:bg-orange-500/10 px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold text-base sm:text-lg transition-all duration-300 transform hover:scale-105 w-full sm:w-auto"
                  data-testid="cta-view-services"
                >
                  <span>{t("viewServices")}</span>
                  <i className="fas fa-play ml-2"></i>
                </button>
              </div>

              {/* Floating Tech Icons - Hidden on mobile to avoid overlap */}
              <div className="floating-icons absolute inset-0 pointer-events-none hidden md:block">
                <div className="floating-icon absolute top-1/4 left-10 text-orange-500 opacity-30 magnetic-float">
                  <i className="fab fa-react text-2xl lg:text-3xl"></i>
                </div>
                <div
                  className="floating-icon absolute top-1/3 right-16 text-violet-500 opacity-40 magnetic-float"
                  style={{ animationDelay: "1s" }}
                >
                  <i className="fab fa-unity text-xl lg:text-2xl"></i>
                </div>
                <div
                  className="floating-icon absolute bottom-1/3 left-20 text-blue-500 opacity-35 magnetic-float"
                  style={{ animationDelay: "2s" }}
                >
                  <i className="fab fa-node-js text-xl lg:text-2xl"></i>
                </div>
                <div
                  className="floating-icon absolute bottom-1/4 right-10 text-orange-500 opacity-25 magnetic-float"
                  style={{ animationDelay: "3s" }}
                >
                  <i className="fas fa-gamepad text-xl lg:text-2xl"></i>
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Scroll Indicator */}
    </section>
  );
}
