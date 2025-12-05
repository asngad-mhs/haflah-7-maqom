import React from 'react';
import { HERO_IMAGE } from '../constants';

const Hero: React.FC = () => {

  const handleScrollClick = (event: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    event.preventDefault();
    const targetId = href.substring(1);
    const targetElement = document.getElementById(targetId);

    if (targetElement) {
      // The 'start' block option aligns the top of the element to the top of the visible area
      targetElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  return (
    <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden scroll-mt-20">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src={HERO_IMAGE} 
          alt="Islamic Art Background" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-islamic-dark/80 via-islamic-dark/90 to-islamic-dark"></div>
        <div className="absolute inset-0 ornament-pattern"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto mt-16">
        <p className="text-islamic-gold font-serif text-xl md:text-2xl mb-4 tracking-widest animate-pulse">
          Malam Penuh Keberkahan
        </p>
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold text-white mb-6 leading-tight drop-shadow-lg">
          Haflah Tilawah <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-islamic-gold to-yellow-200">
            7 Maqam Nada
          </span>
        </h1>
        <p className="text-slate-300 text-lg md:text-xl mb-10 max-w-2xl mx-auto leading-relaxed">
          Menyelami keindahan seni baca Al-Quran melalui tujuh irama klasik yang menggetarkan jiwa. Bayati, Shoba, Hijaz, Nahawand, Rast, Sika, dan Jiharkah.
        </p>
        
        <div className="flex flex-col md:flex-row gap-4 justify-center">
          <a 
            href="#maqams"
            onClick={(e) => handleScrollClick(e, '#maqams')}
            className="px-8 py-4 bg-islamic-gold text-islamic-dark font-bold rounded-full hover:bg-yellow-400 transition-all transform hover:scale-105 shadow-lg shadow-yellow-900/20"
          >
            Pelajari Maqam
          </a>
          <a 
            href="#schedule"
            onClick={(e) => handleScrollClick(e, '#schedule')}
            className="px-8 py-4 border border-slate-500 text-slate-300 font-bold rounded-full hover:border-white hover:text-white transition-all"
          >
            Lihat Jadwal
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;