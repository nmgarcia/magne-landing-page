import { useEffect } from 'react';
import { useLanguage } from '../hooks/useLanguage';
import { useAnimations } from '../hooks/useAnimations';

export default function AboutSection() {
  const { t } = useLanguage();
  const { animateAboutSection } = useAnimations();

  useEffect(() => {
    const timer = setTimeout(() => {
      animateAboutSection();
    }, 100);

    return () => clearTimeout(timer);
  }, [animateAboutSection]);

  const coreValues = [
    { icon: 'fas fa-handshake', title: t('honesty'), gradient: 'from-orange-500 to-orange-600' },
    { icon: 'fas fa-eye', title: t('transparency'), gradient: 'from-violet-500 to-violet-700' },
    { icon: 'fas fa-star', title: t('quality'), gradient: 'from-blue-500 to-violet-500' },
    { icon: 'fas fa-shield', title: t('trust'), gradient: 'from-orange-500 to-violet-500' },
    { icon: 'fas fa-heart', title: t('friendly'), gradient: 'from-violet-500 to-orange-500' },
    { icon: 'fas fa-users', title: t('teamFirst'), gradient: 'from-purple-600 to-blue-500' }
  ];

  return (
    <section id="about" className="py-24 relative overflow-hidden section-background">
      {/* Section Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800/50 to-purple-900/20 z-0"></div>
      
      <div className="container mx-auto px-6 relative z-10 section-content">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Content Side */}
          <div className="about-content">
            <div className="about-badge inline-flex items-center px-4 py-2 bg-orange-500/20 border border-orange-500/30 rounded-full mb-6">
              <span className="text-sm font-jetbrains text-orange-500">{t('aboutUs')}</span>
            </div>
            
            <h2 className="about-title font-montserrat text-4xl md:text-5xl font-bold mb-6 leading-tight">
              <span>{t('attractTalent')}</span>
              <br />
              <span className="magne-gradient-text gradient-shift">{t('createSolutions')}</span>
            </h2>
            
            <p className="about-description text-xl text-gray-300 mb-8 leading-relaxed">
              {t('aboutDescription')}
            </p>
            
            {/* Vision & Mission */}
            <div className="space-y-6 mb-8">
              <div className="vision-item p-6 bg-gradient-to-r from-violet-500/10 to-orange-500/10 rounded-xl border border-violet-500/20">
                <h3 className="text-lg font-semibold text-orange-500 mb-2">{t('ourVision')}</h3>
                <p className="text-gray-300">{t('visionText')}</p>
              </div>
              
              <div className="mission-item p-6 bg-gradient-to-r from-orange-500/10 to-violet-500/10 rounded-xl border border-orange-500/20">
                <h3 className="text-lg font-semibold text-violet-500 mb-2">{t('ourMission')}</h3>
                <p className="text-gray-300">{t('missionText')}</p>
              </div>
            </div>
            
            <button 
              className="magnetic-btn bg-gradient-to-r from-violet-500 to-violet-700 hover:from-violet-700 hover:to-violet-500 px-6 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105"
              data-testid="learn-more-button"
            >
              <span>{t('learnMore')}</span>
              <i className="fas fa-arrow-right ml-2"></i>
            </button>
          </div>

          {/* Visual Side */}
          <div className="about-visual relative">
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
            
            {/* Floating Stats */}
            <div className="absolute -top-6 -right-6 bg-slate-800 border border-orange-500/30 rounded-xl p-4 shadow-2xl">
              <div className="text-2xl font-bold text-orange-500">5+</div>
              <div className="text-sm text-gray-300">{t('yearsExperience')}</div>
            </div>
            
            <div className="absolute -bottom-6 -left-6 bg-slate-800 border border-violet-500/30 rounded-xl p-4 shadow-2xl">
              <div className="text-2xl font-bold text-violet-500">50+</div>
              <div className="text-sm text-gray-300">{t('projectsCompleted')}</div>
            </div>
          </div>
        </div>

        {/* Core Values */}
        <div className="mt-24">
          <div className="text-center mb-16">
            <h3 className="values-title font-montserrat text-3xl md:text-4xl font-bold mb-4">{t('coreValues')}</h3>
            <p className="text-gray-300 max-w-2xl mx-auto">{t('valuesDescription')}</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {coreValues.map((value, index) => (
              <div 
                key={index}
                className="value-card group text-center p-6 bg-gradient-to-b from-slate-800 to-slate-700 rounded-xl border border-violet-500/20 hover:border-orange-500/50 transition-all duration-300 transform hover:scale-105"
                data-testid={`value-card-${index}`}
              >
                <div className={`value-icon w-12 h-12 mx-auto mb-4 bg-gradient-to-r ${value.gradient} rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                  <i className={`${value.icon} text-white`}></i>
                </div>
                <h4 className="font-semibold text-white mb-2">{value.title}</h4>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
