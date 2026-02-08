import React, { useRef, useState, useEffect } from 'react';

export default function AudioPlayer({ src, start }) {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);

  useEffect(() => {
    if (start && audioRef.current) {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(err => {
        console.log("Auto-play prevented:", err);
      });
    }
  }, [start]);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div style={{
      position: 'fixed',
      bottom: '20px',
      right: '20px',
      zIndex: 1000,
      display: 'flex',
      alignItems: 'center',
      background: 'rgba(0,0,0,0.6)',
      padding: '10px 15px',
      borderRadius: '50px',
      backdropFilter: 'blur(5px)',
      border: '1px solid #ec4899',
      boxShadow: '0 0 15px rgba(236, 72, 153, 0.3)'
    }}>
      <audio ref={audioRef} src={src} loop />
      
      <button 
        onClick={togglePlay}
        style={{
          background: 'transparent',
          border: 'none',
          color: '#ec4899',
          fontSize: '24px',
          cursor: 'pointer',
          marginRight: '10px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        {isPlaying ? '⏸' : '▶'}
      </button>

      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <span style={{ fontSize: '12px', color: '#fff', marginBottom: '2px' }}>Now Playing 🎵</span>
        <span style={{ fontSize: '10px', color: '#ec4899' }}>Eppadi Vandhayo</span>
      </div>

      {/* Basic Visualizer Bars */}
      {isPlaying && (
        <div style={{ marginLeft: '15px', display: 'flex', alignItems: 'flex-end', height: '20px', gap: '2px' }}>
          {[...Array(5)].map((_, i) => (
            <div 
              key={i}
              className="visualizer-bar"
              style={{
                width: '3px',
                height: '100%',
                background: '#ec4899',
                animation: `bounce 0.5s infinite ease-in-out alternate`,
                animationDelay: `${i * 0.1}s`
              }}
            />
          ))}
        </div>
      )}

      <style>{`
        @keyframes bounce {
          0% { height: 5px; }
          100% { height: 20px; }
        }
      `}</style>
    </div>
  );
}
