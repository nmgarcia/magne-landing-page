import { useEffect, useState } from "react";
import { useLanguage } from "../hooks/useLanguage";
import { useSmoothAnimations } from "../hooks/useSmoothAnimations";
import ParticleCanvas from "./ParticleCanvas";

export default function AboutSection() {
  const { t } = useLanguage();
  const { animateAboutSection } = useSmoothAnimations();
  const [isAnimationReady, setIsAnimationReady] = useState(false);
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      animateAboutSection(() => {
        setIsAnimationReady(true);
      });
    }, 100);

    return () => clearTimeout(timer);
  }, [animateAboutSection]);

  const coreValues = [
    {
      icon: "fas fa-handshake",
      title: t("honesty"),
      gradient: "from-orange-500 to-orange-600",
    },
    {
      icon: "fas fa-eye",
      title: t("transparency"),
      gradient: "from-violet-500 to-violet-700",
    },
    {
      icon: "fas fa-star",
      title: t("quality"),
      gradient: "from-blue-500 to-violet-500",
    },
    {
      icon: "fas fa-shield",
      title: t("trust"),
      gradient: "from-orange-500 to-violet-500",
    },
    {
      icon: "fas fa-heart",
      title: t("friendly"),
      gradient: "from-violet-500 to-orange-500",
    },
    {
      icon: "fas fa-users",
      title: t("teamFirst"),
      gradient: "from-purple-600 to-blue-500",
    },
  ];

  return (
    <section
      id="about"
      className="py-24 relative overflow-hidden section-background"
    >
      <ParticleCanvas 
        particleCount={35}
        direction="right"
        speed={0.4}
        opacity={0.5}
        color="#8b5cf6"
      />
      {/* Section Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800/50 to-purple-900/20 z-0"></div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10 section-content">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
          {/* Content Side */}
          <div className="about-content">
            <div className="about-badge inline-flex items-center px-3 sm:px-4 py-2 bg-orange-500/20 border border-orange-500/30 rounded-full mb-4 sm:mb-6">
              <span className="text-xs sm:text-sm font-jetbrains text-orange-500">
                {t("aboutUs")}
              </span>
            </div>

            <h2 className="about-title font-montserrat text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 leading-tight">
              <span>{t("attractTalent")}</span>
              <br />
              <span className="magne-gradient-text gradient-shift">
                {t("createSolutions")}
              </span>
            </h2>

            <p className="about-description text-base sm:text-lg lg:text-xl text-gray-300 mb-6 sm:mb-8 leading-relaxed">
              {t("aboutDescription")}
            </p>

            {/* Vision & Mission */}
            <div className="space-y-4 sm:space-y-6 mb-6 sm:mb-8">
              <div className="vision-item p-4 sm:p-6 bg-gradient-to-r from-violet-500/10 to-orange-500/10 rounded-xl border border-violet-500/20">
                <h3 className="text-base sm:text-lg font-semibold text-orange-500 mb-2">
                  {t("ourVision")}
                </h3>
                <p className="text-gray-300 text-sm sm:text-base">
                  {t("visionText")}
                </p>
              </div>

              <div className="mission-item p-4 sm:p-6 bg-gradient-to-r from-orange-500/10 to-violet-500/10 rounded-xl border border-orange-500/20">
                <h3 className="text-base sm:text-lg font-semibold text-violet-500 mb-2">
                  {t("ourMission")}
                </h3>
                <p className="text-gray-300 text-sm sm:text-base">
                  {t("missionText")}
                </p>
              </div>
            </div>

            <button
              className="magnetic-btn bg-gradient-to-r from-violet-500 to-violet-700 hover:from-violet-700 hover:to-violet-500 px-5 sm:px-6 py-3 rounded-full font-semibold text-sm sm:text-base transition-all duration-300 transform hover:scale-105"
              data-testid="learn-more-button"
              onClick={() => scrollToSection("contact")}
            >
              <span>{t("learnMore")}</span>
              <i className="fas fa-arrow-right ml-2"></i>
            </button>
          </div>

          {/* Visual Side */}
          <div className="about-visual relative mt-8 lg:mt-0">
            {/* Main Team Image */}
            <div className="main-image relative">
              <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
                alt="Team collaboration at Magne Software Solutions"
                className="rounded-2xl shadow-2xl w-full transform hover:scale-105 transition-transform duration-500"
                data-testid="team-image"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-orange-500/20 to-transparent rounded-2xl"></div>
            </div>

            {/* Floating Stats - Adjusted for mobile */}
            <div className="absolute -top-3 sm:-top-6 -right-3 sm:-right-6 bg-slate-800 border border-orange-500/30 rounded-xl p-3 sm:p-4 shadow-2xl">
              <div className="text-lg sm:text-2xl font-bold text-orange-500">
                6+
              </div>
              <div className="text-xs sm:text-sm text-gray-300">
                {t("yearsExperience")}
              </div>
            </div>

            <div className="absolute -bottom-3 sm:-bottom-6 -left-3 sm:-left-6 bg-slate-800 border border-violet-500/30 rounded-xl p-3 sm:p-4 shadow-2xl">
              <div className="text-lg sm:text-2xl font-bold text-violet-500">
                20+
              </div>
              <div className="text-xs sm:text-sm text-gray-300">
                {t("projectsCompleted")}
              </div>
            </div>
          </div>
        </div>

        {/* Core Values */}
        <div className="mt-16 sm:mt-20 lg:mt-24">
          <div className="text-center mb-8 sm:mb-12 lg:mb-16">
            <h3 className="values-title font-montserrat text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4">
              {t("coreValues")}
            </h3>
            <p className="text-gray-300 max-w-2xl mx-auto text-sm sm:text-base px-4 sm:px-0">
              {t("valuesDescription")}
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 lg:gap-6">
            {coreValues.map((value, index) => (
              <div
                key={index}
                className="value-card group text-center p-3 sm:p-4 lg:p-6 bg-gradient-to-b from-slate-800 to-slate-700 rounded-xl border border-violet-500/20 hover:border-orange-500/50 transition-all duration-300 transform hover:scale-105"
                data-testid={`value-card-${index}`}
              >
                <div
                  className={`value-icon w-8 sm:w-10 lg:w-12 h-8 sm:h-10 lg:h-12 mx-auto mb-2 sm:mb-3 lg:mb-4 bg-gradient-to-r ${value.gradient} rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                >
                  <i
                    className={`${value.icon} text-white text-sm sm:text-base lg:text-lg`}
                  ></i>
                </div>
                <h4 className="font-semibold text-white text-xs sm:text-sm lg:text-base">
                  {value.title}
                </h4>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
