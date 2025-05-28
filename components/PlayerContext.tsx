import React, { createContext, useState, useContext, ReactNode } from 'react';

// Define types for our music data
export interface Track {
  id: string;
  title: string;
  artist: string;
  album: string;
  coverUrl: string;
  duration: number; // in seconds
  url: string;
}

interface PlayerContextType {
  currentTrack: Track | null;
  isPlaying: boolean;
  queue: Track[];
  playTrack: (track: Track) => void;
  pauseTrack: () => void;
  resumeTrack: () => void;
  nextTrack: () => void;
  previousTrack: () => void;
  addToQueue: (track: Track) => void;
  removeFromQueue: (trackId: string) => void;
  clearQueue: () => void;
  togglePlayPause: () => void;
  setQueue: (tracks: Track[]) => void;
}

// Create the context with a default value
const PlayerContext = createContext<PlayerContextType | undefined>(undefined);

// Create a provider component
export const PlayerProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [queue, setQueue] = useState<Track[]>([]);

  const playTrack = (track: Track) => {
    setCurrentTrack(track);
    setIsPlaying(true);
    // In a real app, we would trigger actual audio playback here
  };

  const pauseTrack = () => {
    setIsPlaying(false);
    // In a real app, we would pause actual audio playback
  };

  const resumeTrack = () => {
    setIsPlaying(true);
    // In a real app, we would resume actual audio playback
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
    // In a real app, we would toggle actual audio playback
  };

  const nextTrack = () => {
    if (queue.length === 0 || !currentTrack) return;
    
    const currentIndex = queue.findIndex(track => track.id === currentTrack.id);
    if (currentIndex === -1 || currentIndex === queue.length - 1) return;
    
    const nextTrack = queue[currentIndex + 1];
    playTrack(nextTrack);
  };

  const previousTrack = () => {
    if (queue.length === 0 || !currentTrack) return;
    
    const currentIndex = queue.findIndex(track => track.id === currentTrack.id);
    if (currentIndex <= 0) return;
    
    const prevTrack = queue[currentIndex - 1];
    playTrack(prevTrack);
  };

  const addToQueue = (track: Track) => {
    setQueue([...queue, track]);
  };

  const removeFromQueue = (trackId: string) => {
    setQueue(queue.filter(track => track.id !== trackId));
  };

  const clearQueue = () => {
    setQueue([]);
  };

  return (
    <PlayerContext.Provider
      value={{
        currentTrack,
        isPlaying,
        queue,
        playTrack,
        pauseTrack,
        resumeTrack,
        nextTrack,
        previousTrack,
        addToQueue,
        removeFromQueue,
        clearQueue,
        togglePlayPause,
        setQueue,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
};

// Custom hook to use the player context
export const usePlayer = () => {
  const context = useContext(PlayerContext);
  if (context === undefined) {
    throw new Error('usePlayer must be used within a PlayerProvider');
  }
  return context;
};