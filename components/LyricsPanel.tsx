import React, { useState, useEffect } from 'react';
import { PlaylistItem } from '../types';
import { getVerseDetails, VerseDetails } from '../services/quranApi';

interface LyricsPanelProps {
  isOpen: boolean;
  onClose: () => void;
  track: PlaylistItem;
}

const LyricsPanel: React.FC<LyricsPanelProps> = ({ isOpen, onClose, track }) => {
  const [verses, setVerses] = useState<VerseDetails[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchVerses = async () => {
      if (!isOpen || !track) return;
      
      setIsLoading(true);
      setError(null);
      setVerses([]);

      try {
        const { surahNumber, ayah } = track;
        const [startAyah, endAyah] = ayah.split('-').map(Number);
        const end = endAyah || startAyah;

        const versePromises: Promise<VerseDetails | null>[] = [];
        for (let i = startAyah; i <= end; i++) {
          versePromises.push(getVerseDetails(surahNumber, i));
        }

        const results = await Promise.all(versePromises);
        const fetchedVerses = results.filter((v): v is VerseDetails => v !== null);
        
        if (fetchedVerses.length === 0) {
          throw new Error("Tidak dapat mengambil data ayat.");
        }

        setVerses(fetchedVerses);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Terjadi kesalahan tidak diketahui.");
        console.error("Failed to fetch verse details:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchVerses();
  }, [isOpen, track]);

  return (
    <div 
      className={`fixed top-0 right-0 h-full z-50 transition-transform duration-500 ease-in-out ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}
    >
      <div 
        className="absolute inset-0 bg-black/50" 
        onClick={onClose}
        style={{ opacity: isOpen ? 1 : 0, transition: 'opacity 0.5s' }}
      ></div>
      <div className="relative w-screen max-w-md h-full bg-slate-900 border-l border-slate-700 shadow-2xl flex flex-col">
        <div className="p-6 border-b border-slate-800 flex justify-between items-center flex-shrink-0">
          <div>
            <h2 className="text-2xl font-serif font-bold text-islamic-gold">Teks & Terjemahan</h2>
            <p className="text-slate-400 text-sm truncate">{track.surah} ({track.ayah})</p>
          </div>
          <button onClick={onClose} className="text-slate-500 hover:text-white text-2xl">&times;</button>
        </div>
        
        <div className="p-6 overflow-y-auto flex-grow">
          {isLoading && (
            <div className="flex justify-center items-center h-full">
              <div className="text-center text-slate-400">
                <div className="w-3 h-3 bg-islamic-gold rounded-full animate-bounce mx-auto mb-2"></div>
                <p>Memuat data...</p>
              </div>
            </div>
          )}
          {error && <p className="text-center text-red-400">{error}</p>}
          {!isLoading && !error && (
            <div className="space-y-8">
              {verses.map((verse) => (
                <div key={verse.id}>
                  <p 
                    className="text-3xl lg:text-4xl text-right font-serif text-white leading-relaxed mb-4"
                    dir="rtl"
                  >
                    {verse.text_uthmani}
                  </p>
                  {verse.translations[0] && (
                     <p className="text-slate-300 text-sm leading-relaxed text-left italic">
                       "{verse.translations[0].text}"
                     </p>
                  )}
                  <p className="text-islamic-gold/70 text-xs text-left mt-2">
                    [QS. {verse.verse_key}]
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LyricsPanel;
