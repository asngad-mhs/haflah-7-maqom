import React from 'react';
import { MAQAMS } from '../constants';
import { Maqam } from '../types';

// SVG Icon for the playlist button
const PlaylistIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
        <path fillRule="evenodd" d="M10.5 6A.75.75 0 0 1 11.25 6.75v10.5a.75.75 0 0 1-1.5 0V6.75A.75.75 0 0 1 10.5 6Zm-3 1.5A.75.75 0 0 1 8.25 8.25v7.5a.75.75 0 0 1-1.5 0v-7.5A.75.75 0 0 1 7.5 7.5Zm6 3A.75.75 0 0 1 14.25 11.25v4.5a.75.75 0 0 1-1.5 0v-4.5a.75.75 0 0 1 .75-.75Zm3-4.5A.75.75 0 0 1 17.25 6.75v10.5a.75.75 0 0 1-1.5 0V6.75a.75.75 0 0 1 .75-.75Z" clipRule="evenodd" />
        <path d="M3 5.25a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75a.75.75 0 0 1-.75-.75Zm0 13.5a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75a.75.75 0 0 1-.75-.75Z" />
    </svg>
);


const MaqamCard: React.FC<{
  maqam: Maqam;
  index: number;
  onShowPlaylist: () => void;
}> = ({ maqam, index, onShowPlaylist }) => (
  <div
    className="group relative bg-slate-800/50 border border-slate-700 rounded-2xl p-8 hover:bg-slate-800 transition-all duration-300 hover:border-islamic-gold/50 flex flex-col"
    style={{ transitionDelay: `${index * 50}ms` }}
  >
    <div className="flex-grow">
      <div className="absolute top-4 right-4 text-4xl opacity-10 group-hover:opacity-30 transition-opacity font-serif text-islamic-gold">
        {maqam.arabicName}
      </div>
      <div className="text-4xl mb-4 bg-slate-700/50 w-16 h-16 flex items-center justify-center rounded-full group-hover:scale-110 transition-transform text-islamic-gold">
        {maqam.icon}
      </div>
      <h3 className="text-2xl font-serif font-bold text-white mb-1 group-hover:text-islamic-gold transition-colors">
        {maqam.name}
      </h3>
      <p className="text-sm text-islamic-gold/80 mb-4 font-serif">{maqam.arabicName}</p>
      <p className="text-slate-300 text-sm leading-relaxed mb-4 min-h-[60px]">
        {maqam.description}
      </p>
    </div>
    <div className="flex justify-between items-center mt-4 pt-4 border-t border-slate-700/50">
      <div className="inline-block px-3 py-1 bg-islamic-dark rounded-full text-xs text-islamic-accent border border-islamic-accent/30">
        Mood: {maqam.emotion}
      </div>
      {maqam.playlist && maqam.playlist.length > 0 && (
        <button
          onClick={onShowPlaylist}
          className="w-12 h-12 rounded-full flex items-center justify-center bg-islamic-gold/10 hover:bg-islamic-gold/20 text-islamic-gold transition-all duration-300 border border-islamic-gold/20 transform hover:scale-110"
          aria-label={`Lihat playlist latihan untuk ${maqam.name}`}
        >
          <PlaylistIcon />
        </button>
      )}
    </div>
  </div>
);

const MaqamList: React.FC<{ onSelectMaqam: (maqam: Maqam) => void; }> = ({ onSelectMaqam }) => {
  return (
    <section id="maqams" className="py-24 bg-islamic-dark relative scroll-mt-20">
      <div className="absolute inset-0 ornament-pattern"></div>
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4">
            Lantunan Emas <span className="text-islamic-gold">Sang Legenda</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Dengarkan keindahan 7 Maqam yang dilantunkan oleh para Qori legendaris. Klik tombol playlist untuk memulai latihan.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {MAQAMS.map((m, idx) => (
            <MaqamCard
              key={m.id}
              maqam={m}
              index={idx}
              onShowPlaylist={() => onSelectMaqam(m)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default MaqamList;