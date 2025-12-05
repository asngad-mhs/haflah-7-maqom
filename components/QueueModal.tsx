import React, { useRef } from 'react';
import { PlaylistItem } from '../types';

interface QueueModalProps {
  playlist: PlaylistItem[];
  currentTrackIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onPlayTrack: (trackIndex: number) => void;
  onRemoveTrack: (trackIndex: number) => void;
  onReorderPlaylist: (startIndex: number, endIndex: number) => void;
}

// Icons
const DragHandleIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={className || "w-5 h-5"}>
        <path d="M10 3a1.5 1.5 0 110 3 1.5 1.5 0 010-3zM10 8.5a1.5 1.5 0 110 3 1.5 1.5 0 010-3zM11.5 15.5a1.5 1.5 0 10-3 0 1.5 1.5 0 003 0z" />
    </svg>
);

const RemoveIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={className || "w-5 h-5"}>
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z" clipRule="evenodd" />
    </svg>
);


const QueueModal: React.FC<QueueModalProps> = ({ playlist, currentTrackIndex, isOpen, onClose, onPlayTrack, onRemoveTrack, onReorderPlaylist }) => {
  const dragItem = useRef<number | null>(null);
  const dragOverItem = useRef<number | null>(null);

  if (!isOpen) return null;

  const handleDragStart = (e: React.DragEvent<HTMLLIElement>, index: number) => {
    dragItem.current = index;
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragEnter = (index: number) => {
    dragOverItem.current = index;
  };

  const handleDragEnd = () => {
    if (dragItem.current !== null && dragOverItem.current !== null && dragItem.current !== dragOverItem.current) {
      onReorderPlaylist(dragItem.current, dragOverItem.current);
    }
    dragItem.current = null;
    dragOverItem.current = null;
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div 
        className="bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden flex flex-col"
        onClick={e => e.stopPropagation()}
        style={{maxHeight: '80vh'}}
      >
        <div className="p-6 border-b border-slate-800 flex justify-between items-center flex-shrink-0">
          <div>
            <h2 className="text-2xl font-serif font-bold text-islamic-gold">Antrian Berikutnya</h2>
            <p className="text-slate-400 text-sm">Seret untuk menyusun ulang</p>
          </div>
          <button onClick={onClose} className="text-slate-500 hover:text-white text-2xl">&times;</button>
        </div>
        
        <div className="p-4 overflow-y-auto">
          <ul className="space-y-2">
            {playlist.map((track, index) => (
              <li 
                key={track.id}
                draggable
                onDragStart={(e) => handleDragStart(e, index)}
                onDragEnter={() => handleDragEnter(index)}
                onDragEnd={handleDragEnd}
                onDragOver={(e) => e.preventDefault()}
                className={`group w-full text-left p-2 rounded-lg flex items-center gap-3 transition-colors ${
                    index === currentTrackIndex ? 'bg-islamic-gold/10' : 'bg-slate-800/50 hover:bg-slate-800'
                }`}
              >
                <div className="text-slate-500 cursor-grab active:cursor-grabbing touch-none">
                    <DragHandleIcon />
                </div>
                <div className="flex-1 min-w-0 cursor-pointer" onClick={() => onPlayTrack(index)}>
                  <p className={`font-bold truncate ${index === currentTrackIndex ? 'text-islamic-gold' : 'text-white'}`}>{track.surah} ({track.ayah})</p>
                  <p className="text-sm text-slate-400">{track.reciter}</p>
                </div>
                <button 
                  onClick={() => onRemoveTrack(index)}
                  className="p-2 text-slate-500 hover:text-red-500 rounded-full transition-colors opacity-50 group-hover:opacity-100"
                  aria-label={`Remove ${track.surah} from queue`}
                >
                  <RemoveIcon />
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default QueueModal;
