import React, { useState, useEffect, RefObject } from 'react';
import { PlaylistItem } from '../types';
import QueueModal from './QueueModal';
import LyricsPanel from './LyricsPanel';

interface PlayerProps {
  audioRef: RefObject<HTMLAudioElement>;
  playlist: PlaylistItem[];
  currentTrackIndex: number;
  maqamName: string;
  isPlaying: boolean;
  isShuffleOn: boolean;
  isAutoplayOn: boolean;
  isBuffering: boolean;
  onTogglePlay: () => void;
  onNext: () => void;
  onPrev: () => void;
  onClose: () => void;
  onToggleShuffle: () => void;
  onToggleAutoplay: () => void;
  onRemoveTrack: (trackIndex: number) => void;
  onReorderPlaylist: (startIndex: number, endIndex: number) => void;
  onPlayTrackFromQueue: (trackIndex: number) => void;
}

// Icons
const PlayIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className || "w-6 h-6"}><path fillRule="evenodd" d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.647c1.295.742 1.295 2.545 0 3.286L7.279 20.99c-1.25.717-2.779-.217-2.779-1.643V5.653Z" clipRule="evenodd" /></svg>
);
const PauseIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className || "w-6 h-6"}><path fillRule="evenodd" d="M6.75 5.25a.75.75 0 0 1 .75-.75H9a.75.75 0 0 1 .75.75v13.5a.75.75 0 0 1-.75.75H7.5a.75.75 0 0 1-.75-.75V5.25Zm7.5 0a.75.75 0 0 1 .75-.75h1.5a.75.75 0 0 1 .75.75v13.5a.75.75 0 0 1-.75.75h-1.5a.75.75 0 0 1-.75-.75V5.25Z" clipRule="evenodd" /></svg>
);
const NextIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className || "w-6 h-6"}><path d="M5.25 5.653c0-1.426 1.529-2.33 2.779-1.643l7.5 4.33c1.21.698 1.21 2.589 0 3.286l-7.5 4.33c-1.25.717-2.779-.217-2.779-1.643V5.653Z" /><path d="M15.75 5.25a.75.75 0 0 1 .75.75v12a.75.75 0 0 1-1.5 0v-12a.75.75 0 0 1 .75-.75Z" /></svg>
);
const PrevIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className || "w-6 h-6"}><path d="M18.75 5.653c0-1.426-1.529-2.33-2.779-1.643l-7.5 4.33c-1.21.698-1.21 2.589 0 3.286l7.5 4.33c1.25.717 2.779-.217-2.779-1.643V5.653Z" /><path d="M8.25 5.25a.75.75 0 0 1 .75.75v12a.75.75 0 0 1-1.5 0v-12a.75.75 0 0 1 .75-.75Z" /></svg>
);
const ShuffleIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className || "w-6 h-6"}><path d="M18.36,6.64L19.78,5.22L12.71,12.29L19.78,19.36L18.36,20.78L11.29,13.71L4.22,20.78L2.79,19.36L9.86,12.29L2.79,5.22L4.22,3.79L11.29,10.86L18.36,6.64M18.36,17.64V12.97L15.54,14.38L18.36,17.64M18.36,8.04L15.54,9.46L18.36,11.03V8.04M5.64,12.97V17.64L8.46,14.38L5.64,12.97M5.64,11.03V8.04L8.46,9.46L5.64,11.03Z"/></svg>
);
const RepeatIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className || "w-6 h-6"}><path d="M17 17H7V14L3 18L7 22V19H19V13H17V17M7 7H17V10L21 6L17 2V5H5V11H7V7Z"/></svg>
);
const QueueIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className || "w-6 h-6"}><path d="M15 6H3v2h12V6zm0 4H3v2h12v-2zM3 16h8v-2H3v2zM17 6v8.18c-.31-.11-.65-.18-1-.18-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3V8h3V6h-5z" /></svg>
);
const LyricsIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className || "w-6 h-6"}><path d="M15,4H5V20H19V8H15V4M14,9H18L14,5V9M7,18V16H13V18H7M7,14V12H17V14H7Z" /></svg>
);
const DownloadIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className || "w-6 h-6"}><path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM17 13l-5 5-5-5h3V9h4v4h3z" /></svg>
);
const LoadingSpinner: React.FC<{className?: string}> = ({className}) => (
    <svg className={`animate-spin ${className || "w-8 h-8"}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
);

const Player: React.FC<PlayerProps> = (props) => {
  const { audioRef, playlist, currentTrackIndex, maqamName, isPlaying, isShuffleOn, isAutoplayOn, isBuffering, onTogglePlay, onNext, onPrev, onClose, onToggleShuffle, onToggleAutoplay, onRemoveTrack, onReorderPlaylist, onPlayTrackFromQueue } = props;
  
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isQueueOpen, setIsQueueOpen] = useState(false);
  const [isLyricsOpen, setIsLyricsOpen] = useState(false);
  const [isPulsing, setIsPulsing] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const track = playlist[currentTrackIndex];

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const setAudioData = () => { if(isFinite(audio.duration)) setDuration(audio.duration); };
    const setAudioTime = () => setProgress(audio.currentTime);

    audio.addEventListener('loadeddata', setAudioData);
    audio.addEventListener('timeupdate', setAudioTime);
    setAudioData(); setAudioTime();
    
    return () => {
      audio.removeEventListener('loadeddata', setAudioData);
      audio.removeEventListener('timeupdate', setAudioTime);
    };
  }, [audioRef, track.url]);
  
  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!audioRef.current) return;
    audioRef.current.currentTime = Number(e.target.value);
    setProgress(Number(e.target.value));
  };

  const formatTime = (time: number) => {
    if (isNaN(time) || !isFinite(time)) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleTogglePlayClick = () => {
    setIsPulsing(true);
    onTogglePlay();
    setTimeout(() => setIsPulsing(false), 300); // Same duration as animation
  };

  const handleDownload = async () => {
    if (!track) return;
    setIsDownloading(true);
    try {
      const response = await fetch(track.url);
      if (!response.ok) {
        throw new Error('Gagal mengunduh file audio.');
      }
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = url;
      
      const sanitizedSurah = track.surah.replace(/[^a-zA-Z0-9 .]/g, '-').replace('-.', '-');
      const sanitizedReciter = track.reciter.replace(/[^a-zA-Z0-9 ]/g, '').replace(/\s+/g, '-');
      const filename = `${sanitizedSurah}-${track.ayah}-${sanitizedReciter}.mp3`;
      
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error("Download Error:", error);
      alert("Maaf, terjadi kesalahan saat mencoba mengunduh file.");
    } finally {
      setIsDownloading(false);
    }
  };


  const PlayerControls = () => (
    <>
      <button onClick={onToggleShuffle} className={`transition-colors ${isShuffleOn ? 'text-islamic-gold' : 'text-slate-400 hover:text-white'}`} aria-label="Toggle shuffle"><ShuffleIcon className="w-6 h-6"/></button>
      <button onClick={onPrev} className="hover:text-islamic-gold transition-colors disabled:opacity-50" disabled={isBuffering}><PrevIcon className="w-8 h-8"/></button>
      <button
        onClick={handleTogglePlayClick}
        className={`w-14 h-14 bg-islamic-gold text-islamic-dark rounded-full flex items-center justify-center transition-transform transform hover:scale-105 ${
          isPulsing ? 'animate-pulse-click' : ''
        }`}
      >
        {isBuffering ? <LoadingSpinner /> : (isPlaying ? <PauseIcon className="w-10 h-10"/> : <PlayIcon className="w-10 h-10"/>)}
      </button>
      <button onClick={onNext} className="hover:text-islamic-gold transition-colors disabled:opacity-50" disabled={isBuffering}><NextIcon className="w-8 h-8"/></button>
      <button onClick={onToggleAutoplay} className={`transition-colors ${isAutoplayOn ? 'text-islamic-gold' : 'text-slate-400 hover:text-white'}`} aria-label="Toggle autoplay"><RepeatIcon className="w-6 h-6"/></button>
    </>
  );
  
  const ProgressBar = () => (
    <>
      <span className="text-xs text-slate-400 w-10 text-center">{formatTime(progress)}</span>
      <input type="range" value={progress} max={duration || 0} onChange={handleProgressChange} className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer range-sm accent-islamic-gold"/>
      <span className="text-xs text-slate-400 w-10 text-center">{formatTime(duration)}</span>
    </>
  );

  return (
    <>
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-slate-900/80 backdrop-blur-lg border-t border-slate-700 p-3 md:p-4 transform transition-transform duration-300 translate-y-0 h-40 md:h-auto">
        <div className="container mx-auto">
          {/* --- DESKTOP LAYOUT --- */}
          <div className="hidden md:flex items-center gap-4">
              <div className="flex-1 min-w-0">
                  <p className="text-white font-bold truncate">{track.surah} ({track.ayah})</p>
                  <p className="text-sm text-islamic-gold truncate">{track.reciter} • {maqamName}</p>
              </div>
              <div className="flex items-center gap-4 text-white"> <PlayerControls /> </div>
              <div className="flex flex-1 items-center gap-2"> <ProgressBar /> </div>
              <button onClick={handleDownload} className="text-slate-400 hover:text-white transition-colors ml-2" aria-label="Download track" disabled={isDownloading}>
                {isDownloading ? <LoadingSpinner className="w-6 h-6" /> : <DownloadIcon className="w-6 h-6"/>}
              </button>
              <button onClick={() => setIsLyricsOpen(true)} className="text-slate-400 hover:text-white transition-colors" aria-label="Show lyrics"><LyricsIcon className="w-6 h-6"/></button>
              <button onClick={() => setIsQueueOpen(true)} className="text-slate-400 hover:text-white transition-colors" aria-label="Show queue"><QueueIcon className="w-6 h-6"/></button>
              <button onClick={onClose} className="text-slate-500 hover:text-white text-2xl ml-2">&times;</button>
          </div>
          {/* --- MOBILE LAYOUT --- */}
          <div className="md:hidden flex flex-col gap-2">
              <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0 pr-4">
                      <p className="text-white font-semibold truncate">{track.surah} ({track.ayah})</p>
                      <p className="text-xs text-islamic-gold truncate">{track.reciter} • {maqamName}</p>
                  </div>
                  <div className="flex items-center">
                    <button onClick={handleDownload} className="text-slate-400 hover:text-white transition-colors mr-2" aria-label="Download track" disabled={isDownloading}>
                        {isDownloading ? <LoadingSpinner className="w-6 h-6" /> : <DownloadIcon className="w-6 h-6"/>}
                    </button>
                    <button onClick={() => setIsLyricsOpen(true)} className="text-slate-400 hover:text-white transition-colors mr-2" aria-label="Show lyrics"><LyricsIcon className="w-6 h-6"/></button>
                    <button onClick={() => setIsQueueOpen(true)} className="text-slate-400 hover:text-white transition-colors mr-2" aria-label="Show queue"><QueueIcon className="w-6 h-6"/></button>
                    <button onClick={onClose} className="text-slate-500 hover:text-white text-3xl -mt-1">&times;</button>
                  </div>
              </div>
              <div className="flex w-full items-center gap-2"> <ProgressBar /> </div>
              <div className="flex items-center justify-evenly text-white w-full mt-1"> <PlayerControls /> </div>
          </div>
        </div>
      </div>
      <QueueModal
        isOpen={isQueueOpen}
        onClose={() => setIsQueueOpen(false)}
        playlist={playlist}
        currentTrackIndex={currentTrackIndex}
        onRemoveTrack={onRemoveTrack}
        onReorderPlaylist={onReorderPlaylist}
        onPlayTrack={onPlayTrackFromQueue}
      />
      <LyricsPanel 
        isOpen={isLyricsOpen}
        onClose={() => setIsLyricsOpen(false)}
        track={track}
      />
    </>
  );
};

export default Player;