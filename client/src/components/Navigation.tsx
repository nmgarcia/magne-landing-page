import { useState, useEffect } from 'react';
import { useLanguage } from '../hooks/useLanguage';

export default function Navigation() {
  const { language, setLanguage, t } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setIsMobileMenuOpen(false);
  };

  const toggleLanguage = (lang: 'es' | 'en') => {
    setLanguage(lang);
    setIsLangDropdownOpen(false);
  };

  return (
    <nav 
      className={`fixed top-0 w-full z-40 transition-all duration-500 ${
        isScrolled ? 'bg-slate-900/90 backdrop-blur-lg border-b border-violet-500/20' : ''
      }`}
      data-testid="navigation"
    >
      <div className="container mx-auto px-4 sm:px-6 py-3 sm:py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="logo-container" data-testid="logo">
            <h1 className="text-xl sm:text-2xl font-magne text-white tracking-tight hover:text-orange-500 transition-colors duration-300 cursor-pointer">
              magne<span className="text-orange-500">.</span>
            </h1>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <button 
              onClick={() => scrollToSection('hero')} 
              className="nav-link relative group"
              data-testid="nav-home"
            >
              <span>{t('home')}</span>
              <div className="magnetic-underline absolute -bottom-1 left-0 w-0 h-0.5 bg-orange-500 transition-all duration-300 group-hover:w-full"></div>
            </button>
            <button 
              onClick={() => scrollToSection('services')} 
              className="nav-link relative group"
              data-testid="nav-services"
            >
              <span>{t('services')}</span>
              <div className="magnetic-underline absolute -bottom-1 left-0 w-0 h-0.5 bg-orange-500 transition-all duration-300 group-hover:w-full"></div>
            </button>
            <button 
              onClick={() => scrollToSection('about')} 
              className="nav-link relative group"
              data-testid="nav-about"
            >
              <span>{t('about')}</span>
              <div className="magnetic-underline absolute -bottom-1 left-0 w-0 h-0.5 bg-orange-500 transition-all duration-300 group-hover:w-full"></div>
            </button>
            <button 
              onClick={() => scrollToSection('contact')} 
              className="nav-link relative group"
              data-testid="nav-contact"
            >
              <span>{t('contact')}</span>
              <div className="magnetic-underline absolute -bottom-1 left-0 w-0 h-0.5 bg-orange-500 transition-all duration-300 group-hover:w-full"></div>
            </button>
          </div>

          {/* Language Selector & Mobile Menu */}
          <div className="flex items-center space-x-4">
            {/* Language Selector */}
            <div className="language-selector relative">
              <button
                onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)}
                className="bg-violet-600 hover:bg-violet-700 px-3 sm:px-4 py-2 rounded-full transition-all duration-300 transform hover:scale-105"
                data-testid="language-toggle"
              >
                <span className="font-semibold text-sm sm:text-base">{language.toUpperCase()}</span>
                <i className="fas fa-globe ml-1 sm:ml-2 text-sm sm:text-base"></i>
              </button>
              
              {isLangDropdownOpen && (
                <div className="absolute top-11 sm:top-12 right-0 bg-slate-800 rounded-lg overflow-hidden shadow-2xl opacity-100 transform scale-100 transition-all duration-300 z-50 min-w-[120px]">
                  <button
                    onClick={() => toggleLanguage('es')}
                    className="block w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base text-left hover:bg-violet-600 transition-colors"
                    data-testid="lang-spanish"
                  >
                    Español
                  </button>
                  <button
                    onClick={() => toggleLanguage('en')}
                    className="block w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base text-left hover:bg-violet-600 transition-colors"
                    data-testid="lang-english"
                  >
                    English
                  </button>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-slate-800/50 transition-colors duration-300"
              data-testid="mobile-menu-button"
            >
              <div className={`hamburger-line w-5 h-0.5 bg-white mb-1 transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`}></div>
              <div className={`hamburger-line w-5 h-0.5 bg-white mb-1 transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : ''}`}></div>
              <div className={`hamburger-line w-5 h-0.5 bg-white transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></div>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden bg-slate-900/95 backdrop-blur-lg absolute top-full left-0 right-0 transform transition-all duration-500 border-t border-violet-500/20 ${
          isMobileMenuOpen ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0 pointer-events-none'
        }`}>
          <div className="px-4 sm:px-6 py-6 space-y-4">
            <button 
              onClick={() => scrollToSection('hero')} 
              className="block w-full text-left text-base sm:text-lg hover:text-orange-500 transition-colors py-2 px-2 rounded-lg hover:bg-slate-800/50"
              data-testid="mobile-nav-home"
            >
              {t('home')}
            </button>
            <button 
              onClick={() => scrollToSection('services')} 
              className="block w-full text-left text-base sm:text-lg hover:text-orange-500 transition-colors py-2 px-2 rounded-lg hover:bg-slate-800/50"
              data-testid="mobile-nav-services"
            >
              {t('services')}
            </button>
            <button 
              onClick={() => scrollToSection('about')} 
              className="block w-full text-left text-base sm:text-lg hover:text-orange-500 transition-colors py-2 px-2 rounded-lg hover:bg-slate-800/50"
              data-testid="mobile-nav-about"
            >
              {t('about')}
            </button>
            <button 
              onClick={() => scrollToSection('contact')} 
              className="block w-full text-left text-base sm:text-lg hover:text-orange-500 transition-colors py-2 px-2 rounded-lg hover:bg-slate-800/50"
              data-testid="mobile-nav-contact"
            >
              {t('contact')}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
