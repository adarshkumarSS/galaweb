import React, { useState, useRef } from 'react';
import EntryPage from './pages/EntryPage';
import MainPage from './pages/MainPage';

function App() {
  const [access, setAccess] = useState(false);
  const audioRef = useRef(new Audio('/music/eppadi_vandhayo.mp3'));
  const [isPlaying, setIsPlaying] = useState(false);

  const startMusic = () => {
    audioRef.current.loop = true;
    audioRef.current.play()
      .then(() => setIsPlaying(true))
      .catch(e => console.log("Audio play failed:", e));
  };

  const toggleMusic = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <>
      {!access ? (
        <EntryPage onAccessGranted={() => {
          startMusic();
          setAccess(true);
        }} />
      ) : (
        <MainPage isPlaying={isPlaying} toggleMusic={toggleMusic} />
      )}
    </>
  );
}

export default App;
