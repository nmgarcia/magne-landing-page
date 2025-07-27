import { useLanguage } from "../hooks/useLanguage";

export default function Footer() {
  const { t } = useLanguage();

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <footer className="bg-black py-8 sm:py-12 border-t border-violet-500/20">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 items-center">
          {/* Logo & Copyright */}
          <div className="text-center md:text-left">
            <h3
              className="text-xl sm:text-2xl font-magne text-white mb-2"
              data-testid="footer-logo"
            >
              magne<span className="text-orange-500">.</span>
            </h3>
            <p className="text-gray-400 text-xs sm:text-sm">{t("allRightsReserved")}</p>
          </div>

          {/* Quick Links */}
          <div className="text-center">
            <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
              <button
                onClick={() => scrollToSection("hero")}
                className="text-gray-400 hover:text-orange-500 transition-colors text-xs sm:text-sm py-2 px-3 rounded-lg hover:bg-slate-800/50"
                data-testid="footer-home"
              >
                {t("home")}
              </button>
              <button
                onClick={() => scrollToSection("services")}
                className="text-gray-400 hover:text-orange-500 transition-colors text-xs sm:text-sm py-2 px-3 rounded-lg hover:bg-slate-800/50"
                data-testid="footer-services"
              >
                {t("services")}
              </button>
              <button
                onClick={() => scrollToSection("about")}
                className="text-gray-400 hover:text-orange-500 transition-colors text-xs sm:text-sm py-2 px-3 rounded-lg hover:bg-slate-800/50"
                data-testid="footer-about"
              >
                {t("about")}
              </button>
              <button
                onClick={() => scrollToSection("contact")}
                className="text-gray-400 hover:text-orange-500 transition-colors text-xs sm:text-sm py-2 px-3 rounded-lg hover:bg-slate-800/50"
                data-testid="footer-contact"
              >
                {t("contact")}
              </button>
            </div>
          </div>

          {/* Social Links */}
          <div className="text-center md:text-right">
            <div className="flex justify-center md:justify-end space-x-3 sm:space-x-4">
              <a
                href="#"
                className="w-8 h-8 sm:w-10 sm:h-10 bg-slate-800 hover:bg-orange-500 rounded-lg flex items-center justify-center transition-all duration-300 transform hover:scale-110"
                data-testid="footer-linkedin"
              >
                <i className="fab fa-linkedin text-white text-xs sm:text-sm"></i>
              </a>
              <a
                href="#"
                className="w-8 h-8 sm:w-10 sm:h-10 bg-slate-800 hover:bg-violet-500 rounded-lg flex items-center justify-center transition-all duration-300 transform hover:scale-110"
                data-testid="footer-twitter"
              >
                <i className="fab fa-twitter text-white text-xs sm:text-sm"></i>
              </a>
              <a
                href="#"
                className="w-8 h-8 sm:w-10 sm:h-10 bg-slate-800 hover:bg-blue-500 rounded-lg flex items-center justify-center transition-all duration-300 transform hover:scale-110"
                data-testid="footer-github"
              >
                <i className="fab fa-github text-white text-xs sm:text-sm"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
