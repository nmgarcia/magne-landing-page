import { useEffect, useState } from 'react';
import { useLanguage } from '../hooks/useLanguage';

interface LoadingScreenProps {
  onLoadingComplete: () => void;
}

export default function LoadingScreen({ onLoadingComplete }: LoadingScreenProps) {
  const { t } = useLanguage();
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onLoadingComplete, 500);
    }, 2000);

    return () => clearTimeout(timer);
  }, [onLoadingComplete]);

  if (!isVisible) {
    return (
      <div className="fixed inset-0 bg-black z-50 flex items-center justify-center opacity-0 transition-opacity duration-500 pointer-events-none">
        {/* Loading complete */}
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
      <div className="text-center">
        <div className="w-24 h-24 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mb-8 mx-auto"></div>
        <div className="magnetic-logo text-4xl font-bold text-white mb-4">MAGNE</div>
        <div className="loading-text text-orange-500 font-jetbrains text-sm tracking-wider">
          {t('magnetizingIdeas')}
        </div>
      </div>
    </div>
  );
}
