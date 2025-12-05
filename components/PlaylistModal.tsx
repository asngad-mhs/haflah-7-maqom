import React from 'react';
import { Maqam } from '../types';

interface PlaylistModalProps {
  maqam: Maqam;
  onClose: () => void;
  onPlayTrack: (maqam: Maqam, trackIndex: number) => void;
}

const PlayIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path fillRule="evenodd" d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.647c1.295.742 1.295 2.545 0 3.286L7.279 20.99c-1.25.717-2.779-.217-2.779-1.643V5.653Z" clipRule="evenodd" />
    </svg>
);

const PlaylistModal: React.FC<PlaylistModalProps> = ({ maqam, onClose, onPlayTrack }) => {
  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div 
        className="bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden transform transition-all"
        onClick={e => e.stopPropagation()}
      >
        <div className="p-6 border-b border-slate-800 flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-serif font-bold text-islamic-gold">{maqam.name}</h2>
            <p className="text-slate-400">Daftar Putar Latihan</p>
          </div>
          <button onClick={onClose} className="text-slate-500 hover:text-white text-2xl">&times;</button>
        </div>
        
        <div className="p-4 max-h-[60vh] overflow-y-auto">
          <ul className="space-y-2">
            {maqam.playlist?.map((track, index) => (
              <li key={track.id}>
                <button 
                  onClick={() => onPlayTrack(maqam, index)}
                  className="w-full text-left p-4 rounded-lg flex items-center gap-4 bg-slate-800/50 hover:bg-slate-800 transition-colors"
                >
                  <div className="w-10 h-10 flex-shrink-0 bg-islamic-gold/10 text-islamic-gold rounded-lg flex items-center justify-center">
                    <PlayIcon/>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-white truncate">{track.surah} ({track.ayah})</p>
                    <p className="text-sm text-slate-400">{track.reciter}</p>
                  </div>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PlaylistModal;