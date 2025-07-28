import { useState, useEffect } from "react";
import LoadingScreen from "../components/LoadingScreen";
import ParticleCanvas from "../components/ParticleCanvas";
import MagneticCursor from "../components/MagneticCursor";
import Navigation from "../components/Navigation";
import HeroSection from "../components/HeroSection";
import ServicesSection from "../components/ServicesSection";
import AboutSection from "../components/AboutSection";
import ContactSection from "../components/ContactSection";
import Footer from "../components/Footer";
import { useOptimizedAnimations } from "@/hooks/useOptimizedAnimations";
import { useSectionNavigation } from "../hooks/useSectionNavigation";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const { initMagneticEffects } = useOptimizedAnimations();
  const { currentSection, scrollToSection, isScrolling } = useSectionNavigation();

  useEffect(() => {
    // Initialize magnetic effects after components are loaded
    const timer = setTimeout(async () => {
      await initMagneticEffects();
    }, 3000);

    return () => clearTimeout(timer);
  }, [initMagneticEffects]);

  const handleLoadingComplete = async () => {
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white font-inter overflow-x-hidden">
      {/* Loading Screen */}
      {isLoading && <LoadingScreen onLoadingComplete={handleLoadingComplete} />}
      {/* Particle Canvas Background */}
      <ParticleCanvas />
      {/* Magnetic Cursor */}
      <MagneticCursor />
      {/* Navigation */}
      <Navigation />
      {/* Section Navigation Debug (only in dev) */}
      {import.meta.env.DEV && (
        <div className="fixed top-20 right-4 z-50 bg-black/80 text-white p-2 rounded text-xs">
          Current: {currentSection} | Scrolling: {isScrolling ? 'Yes' : 'No'}
        </div>
      )}
      
      {/* Main Content */}
      <main>
        <HeroSection isLoading={isLoading} />
        <ServicesSection />
        <AboutSection />
        <ContactSection />
      </main>
      {/* Footer */}
      <Footer />
    </div>
  );
}
