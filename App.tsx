import React, { useState, useRef, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import MaqamList from './components/MaqamList';
import Schedule from './components/Schedule';
import MaqamBot from './components/MaqamBot';
import Footer from './components/Footer';
import Player from './components/Player';
import PlaylistModal from './components/PlaylistModal';
import { Maqam, PlaylistItem } from './types';
import { getVerseDetails, VerseDetails } from './services/quranApi';


const App: React.FC = () => {
  const [playlist, setPlaylist] = useState<PlaylistItem[]>([]);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPlayerVisible, setIsPlayerVisible] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMaqam, setSelectedMaqam] = useState<Maqam | null>(null);
  const [currentMaqamName, setCurrentMaqamName] = useState('');
  
  // Feature States
  const [isShuffleOn, setIsShuffleOn] = useState(false);
  const [isAutoplayOn, setIsAutoplayOn] = useState(true);
  const [shuffledIndices, setShuffledIndices] = useState<number[]>([]);
  const [shuffledPlaybackIndex, setShuffledPlaybackIndex] = useState(0);

  // Simplified Audio State
  const [isBuffering, setIsBuffering] = useState(false);
  
  const audioRef = useRef<HTMLAudioElement>(null);

  const currentTrack = playlist[currentTrackIndex];

  // EFFECT 1: Manage audio element source based on the current track.
  // This replaces the complex verse-by-verse fetching logic with direct URL usage.
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !currentTrack) return;

    // Set the source to the full track URL from constants.ts
    if (audio.src !== currentTrack.url) {
      audio.src = currentTrack.url;
      audio.load();
      setIsBuffering(true);
    }
  }, [currentTrack]);

  // EFFECT 2: Control playback (play/pause).
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !audio.src) return;

    if (isPlaying) {
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => setIsBuffering(false))
          .catch(error => {
            console.error("Gagal memulai pemutaran:", error);
            setIsPlaying(false); // Sync state back on failure
          });
      }
    } else {
      audio.pause();
    }
  }, [isPlaying, currentTrack]);
  
  // EFFECT 3: Manage shuffle list
  useEffect(() => {
    if (isShuffleOn && playlist.length > 0) {
      const indices = Array.from(playlist.keys());
      indices.splice(indices.indexOf(currentTrackIndex), 1);
      for (let i = indices.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [indices[i], indices[j]] = [indices[j], indices[i]];
      }
      const newShuffledIndices = [currentTrackIndex, ...indices];
      setShuffledIndices(newShuffledIndices);
      setShuffledPlaybackIndex(0);
    }
  }, [isShuffleOn, playlist, currentTrackIndex]);

  const handleSelectMaqam = (maqam: Maqam) => {
    setSelectedMaqam(maqam);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => setIsModalOpen(false);

  const handlePlayTrack = (maqam: Maqam, trackIndex: number) => {
    if (maqam.playlist) {
      setPlaylist(maqam.playlist);
      setCurrentTrackIndex(trackIndex);
      setCurrentMaqamName(maqam.name);
      setIsPlaying(true);
      setIsPlayerVisible(true);
      setIsModalOpen(false);
      setIsShuffleOn(false);
    }
  };

  const handlePlayTrackFromQueue = (trackIndex: number) => {
    setCurrentTrackIndex(trackIndex);
    setIsPlaying(true);
  };

  const handleTogglePlay = () => {
    if (!currentTrack) return;
    setIsPlaying(!isPlaying);
  };
  
  const handleNext = () => {
    if (!playlist || playlist.length === 0) return;
    if (isShuffleOn) {
      const nextPlaybackIndex = (shuffledPlaybackIndex + 1) % shuffledIndices.length;
      setShuffledPlaybackIndex(nextPlaybackIndex);
      setCurrentTrackIndex(shuffledIndices[nextPlaybackIndex]);
    } else {
      setCurrentTrackIndex((prev) => (prev + 1) % playlist.length);
    }
    setIsPlaying(true);
  };

  const handlePrev = () => {
    if (!playlist || playlist.length === 0) return;
    if (isShuffleOn) {
      const prevPlaybackIndex = (shuffledPlaybackIndex - 1 + shuffledIndices.length) % shuffledIndices.length;
      setShuffledPlaybackIndex(prevPlaybackIndex);
      setCurrentTrackIndex(shuffledIndices[prevPlaybackIndex]);
    } else {
      setCurrentTrackIndex((prev) => (prev - 1 + playlist.length) % playlist.length);
    }
    setIsPlaying(true);
  };
  
  const handleClosePlayer = () => {
    setIsPlaying(false);
    setIsPlayerVisible(false);
    setPlaylist([]);
    setCurrentTrackIndex(0);
    setCurrentMaqamName('');
    setIsShuffleOn(false);
    setIsAutoplayOn(true);
  };

  const handleToggleShuffle = () => setIsShuffleOn(!isShuffleOn);
  const handleToggleAutoplay = () => setIsAutoplayOn(!isAutoplayOn);

  // Simplified handler for when a full track ends
  const handleTrackEnd = () => {
    if (isAutoplayOn) {
      handleNext();
    } else {
      setIsPlaying(false);
    }
  };

  const handleRemoveTrack = (indexToRemove: number) => {
    const currentTrackId = playlist[currentTrackIndex].id;
    const newPlaylist = playlist.filter((_, index) => index !== indexToRemove);

    if (newPlaylist.length === 0) {
      handleClosePlayer();
      return;
    }

    let newCurrentIndex = newPlaylist.findIndex(track => track.id === currentTrackId);
    
    // If the currently playing track was the one removed...
    if (newCurrentIndex === -1) {
      // ...then the new index should be the same as the old one, clamped to the new list's bounds.
      newCurrentIndex = Math.min(currentTrackIndex, newPlaylist.length - 1);
    }
    
    setPlaylist(newPlaylist);
    setCurrentTrackIndex(newCurrentIndex);
    setIsShuffleOn(false);
  };

  const handleReorderPlaylist = (startIndex: number, endIndex: number) => {
    const currentTrackId = playlist[currentTrackIndex].id;
    
    const newPlaylist = [...playlist];
    const [removed] = newPlaylist.splice(startIndex, 1);
    newPlaylist.splice(endIndex, 0, removed);
    
    const newCurrentIndex = newPlaylist.findIndex(t => t.id === currentTrackId);
    
    setPlaylist(newPlaylist);
    setCurrentTrackIndex(newCurrentIndex);
    setIsShuffleOn(false);
  };

  return (
    <div className="min-h-screen bg-islamic-dark text-slate-100 font-sans selection:bg-islamic-gold selection:text-islamic-dark">
      <Navbar />
      <main className={`${isPlayerVisible ? 'pb-40 md:pb-24' : ''}`}>
        <Hero />
        <MaqamList onSelectMaqam={handleSelectMaqam} />
        <Schedule />
        <MaqamBot />
      </main>
      <Footer />

      {isModalOpen && selectedMaqam && (
        <PlaylistModal
          maqam={selectedMaqam}
          onClose={handleCloseModal}
          onPlayTrack={handlePlayTrack}
        />
      )}

      {isPlayerVisible && currentTrack && (
        <Player
          audioRef={audioRef}
          playlist={playlist}
          currentTrackIndex={currentTrackIndex}
          maqamName={currentMaqamName}
          isPlaying={isPlaying}
          isShuffleOn={isShuffleOn}
          isAutoplayOn={isAutoplayOn}
          isBuffering={isBuffering}
          onTogglePlay={handleTogglePlay}
          onNext={handleNext}
          onPrev={handlePrev}
          onClose={handleClosePlayer}
          onToggleShuffle={handleToggleShuffle}
          onToggleAutoplay={handleToggleAutoplay}
          onRemoveTrack={handleRemoveTrack}
          onReorderPlaylist={handleReorderPlaylist}
          onPlayTrackFromQueue={handlePlayTrackFromQueue}
        />
      )}
      
      <audio
        ref={audioRef}
        onEnded={handleTrackEnd}
        onCanPlay={() => setIsBuffering(false)}
        onWaiting={() => setIsBuffering(true)}
        onPlaying={() => setIsBuffering(false)}
        onError={(e) => {
          const mediaError = (e.target as HTMLAudioElement).error;
          let errorMessage = 'Terjadi galat tidak diketahui.';
          if (mediaError) {
            switch (mediaError.code) {
              case mediaError.MEDIA_ERR_ABORTED:
                errorMessage = 'Pemutaran audio dibatalkan.';
                break;
              case mediaError.MEDIA_ERR_NETWORK:
                errorMessage = 'Galat jaringan menyebabkan audio gagal dimuat.';
                break;
              case mediaError.MEDIA_ERR_DECODE:
                errorMessage = 'Audio tidak dapat di-decode, mungkin karena format tidak didukung atau file rusak.';
                break;
              case mediaError.MEDIA_ERR_SRC_NOT_SUPPORTED:
                errorMessage = 'Sumber audio tidak dapat dimuat, mungkin karena format tidak didukung atau server bermasalah.';
                break;
            }
          }
          console.error("Audio Error:", errorMessage, mediaError);
          setIsBuffering(false);
          alert(`Gagal memuat audio: ${errorMessage}`);
        }}
      />
    </div>
  );
};

export default App;