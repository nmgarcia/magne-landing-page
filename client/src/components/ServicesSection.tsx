import { useEffect, useState } from "react";
import { useLanguage } from "../hooks/useLanguage";
import { useSmoothAnimations } from "../hooks/useSmoothAnimations";
import ParticleCanvas from "./ParticleCanvas";

export default function ServicesSection() {
  const { t } = useLanguage();
  const { animateServicesSection } = useSmoothAnimations();
  const [isAnimationReady, setIsAnimationReady] = useState(false);
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };
  useEffect(() => {
    const timer = setTimeout(() => {
      animateServicesSection(() => {
        setIsAnimationReady(true);
      });
    }, 100);

    return () => clearTimeout(timer);
  }, [animateServicesSection]);

  const services = [
    {
      icon: "fas fa-globe",
      title: t("webDevelopment"),
      description: t("webDevDescription"),
      gradient: "from-blue-500 to-violet-500",
      tags: ["Next.js", "React.js", "Angular", "Wordpress"],
    },
    {
      icon: "fas fa-code",
      title: t("customSoftware"),
      description: t("customSoftDescription"),
      gradient: "from-purple-600 to-blue-500",
      tags: [".NET", "C++", "Java"],
    },
    {
      icon: "fas fa-gamepad",
      title: t("gameDevelopment"),
      description: t("gameDevDescription"),
      gradient: "from-orange-500 to-orange-600",
      tags: ["Unity", "Unreal", "C#", "C++"],
    },
    {
      icon: "fas fa-users",
      title: t("staffAugmentation"),
      description: t("staffAugDescription"),
      gradient: "from-violet-500 to-violet-700",
      tags: ["React", "Node.js", "C#"],
    },
    {
      icon: "fas fa-palette",
      title: t("uiuxDesign"),
      description: t("uiuxDescription"),
      gradient: "from-orange-500 to-violet-500",
      tags: ["Figma", "Adobe XD", "Sketch"],
    },
    {
      icon: "fas fa-lightbulb",
      title: t("techConsulting"),
      description: t("consultingDescription"),
      gradient: "from-violet-500 to-orange-500",
      tags: ["AWS", "Azure", "DevOps"],
    },
  ];

  return (
    <section
      id="services"
      className="py-24 relative overflow-hidden section-background"
    >
      <ParticleCanvas
        particleCount={40}
        direction="up"
        speed={0.5}
        opacity={0.6}
        color="#3b82f6"
      />
      {/* Section Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 z-0"></div>

      {/* Floating Geometric Shapes */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-32 h-32 border border-orange-500 rotate-45 animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-24 h-24 bg-violet-500/20 rounded-full magnetic-float"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10 section-content">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16 lg:mb-20">
          <div className="services-badge inline-flex items-center px-3 sm:px-4 py-2 bg-violet-500/20 border border-violet-500/30 rounded-full mb-4 sm:mb-6">
            <span className="text-xs sm:text-sm font-jetbrains text-orange-500">
              {t("ourServices")}
            </span>
          </div>
          <h2 className="services-title font-montserrat text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6">
            <span>{t("softwareSolutions")}</span>
            <br />
            <span className="magne-gradient-text gradient-shift">
              {t("attractResults")}
            </span>
          </h2>
          <p className="services-subtitle text-base sm:text-lg lg:text-xl text-gray-300 max-w-3xl mx-auto px-4 sm:px-0">
            {t("servicesDescription")}
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6 auto-rows-fr">
          {services.map((service, index) => (
            <div
              key={index}
              className="service-card group relative bg-gradient-to-br from-slate-800 to-slate-700 px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl border border-violet-500/20 hover:border-orange-500/50 transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 service-card-container h-full flex flex-row items-start gap-3 sm:gap-4"
              data-testid={`service-card-${index}`}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-violet-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              {/* Icon Column */}
              <div className="relative z-10 flex-shrink-0">
                <div
                  className={`service-icon w-8 h-8 sm:w-9 sm:h-9 bg-gradient-to-r ${service.gradient} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                >
                  <i
                    className={`${service.icon} text-sm sm:text-base text-white`}
                  ></i>
                </div>
              </div>

              {/* Content Column */}
              <div className="relative z-10 flex flex-col flex-1 min-w-0">
                <h3 className="font-montserrat text-sm sm:text-base font-bold mb-1 group-hover:text-orange-500 transition-colors duration-300 leading-tight">
                  {service.title}
                </h3>
                <p className="text-gray-300 mb-1.5 sm:mb-2 leading-relaxed text-xs sm:text-sm flex-grow">
                  {service.description}
                </p>
                <div className="flex flex-wrap gap-1.5 mt-auto">
                  {service.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="px-2 py-0.5 bg-violet-500/20 text-orange-500 text-[10px] sm:text-xs rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <div className="absolute top-3 sm:top-4 right-3 sm:right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <i className="fas fa-arrow-up-right text-orange-500 text-sm sm:text-base"></i>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-12 sm:mt-16 lg:mt-20">
          <button
            className="magnetic-btn bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-500 px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold text-base sm:text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl"
            data-testid="view-all-services"
            onClick={() => scrollToSection("contact")}
          >
            <span>{t("viewAllServices")}</span>
            <i className="fas fa-arrow-right ml-2"></i>
          </button>
        </div>
      </div>
    </section>
  );
}
