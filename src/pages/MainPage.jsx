import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Hyperspeed from '../components/Hyperspeed';
import DomeGallery from '../components/DomeGallery';
import { images } from '../assets';

function HeartCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const onMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };
    const onMouseEnter = () => setHidden(false);
    const onMouseLeave = () => setHidden(true);

    window.addEventListener('mousemove', onMouseMove);
    document.body.addEventListener('mouseenter', onMouseEnter);
    document.body.addEventListener('mouseleave', onMouseLeave);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.body.removeEventListener('mouseenter', onMouseEnter);
      document.body.removeEventListener('mouseleave', onMouseLeave);
    };
  }, []);

  return (
    <div
      style={{
        position: 'fixed',
        left: 0,
        top: 0,
        transform: `translate(${position.x}px, ${position.y}px) translate(-50%, -50%)`,
        pointerEvents: 'none',
        zIndex: 9999,
        fontSize: '2rem',
        opacity: hidden ? 0 : 1,
        transition: 'opacity 0.2s'
      }}
    >
      💖
    </div>
  );
}

function FloatingHeart({ delay }) {
  return (
    <motion.div
      initial={{ y: '110vh', opacity: 0 }}
      animate={{ y: '-10vh', opacity: [0, 1, 1, 0] }}
      transition={{ duration: 10, repeat: Infinity, delay: delay, ease: 'linear' }}
      style={{
        position: 'fixed',
        left: `${Math.random() * 100}vw`,
        fontSize: `${Math.random() * 2 + 1}rem`,
        zIndex: 0,
        pointerEvents: 'none',
        filter: 'blur(1px)'
      }}
    >
      {['💖', '💕', '💗', '💓'][Math.floor(Math.random() * 4)]}
    </motion.div>
  );
}

function GalentineCountdown() {
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    const calculateTime = () => {
      const now = new Date();
      const currentYear = now.getFullYear();
      let target = new Date(`${currentYear}-02-13T00:00:00`);

      // If playing on the day itself or after, show message or next year? 
      // User asked for timer for 13 Feb. Assuming countdown. 
      // If it's already past Feb 13 this year, aim for next year? 
      // Given the metadata says date is 2026-02-08, Feb 13 is upcoming.
      if (now > target) {
         // If it's technically passed 13th already, maybe say Happy Galentine's?
         // But let's stick to countdown logic.
         // If today is 14th, target next year 13th.
         // If today is 13th, show "It's Today!"
         const endOfDay = new Date(`${currentYear}-02-13T23:59:59`);
         if (now < endOfDay) {
             setTimeLeft("HAPPY GALENTINE'S DAY! 💖🎉");
             return;
         }
         target = new Date(`${currentYear + 1}-02-13T00:00:00`);
      }

      const diff = target - now;
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / 1000 / 60) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      setTimeLeft(`${days}d ${hours}h ${minutes}m ${seconds}s`);
    };

    calculateTime();
    const timer = setInterval(calculateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div style={{ textAlign: 'center', marginBottom: '2rem', padding: '1.5rem', background: 'rgba(236, 72, 153, 0.1)', borderRadius: '1rem', border: '1px solid rgba(236, 72, 153, 0.3)', backdropFilter: 'blur(5px)' }}>
      <h3 style={{ fontSize: '1rem', color: '#fbcfe8', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '3px' }}>Countdown to Galentine's ⏳</h3>
      <div style={{ fontSize: '2.5rem', fontWeight: 'bold', fontFamily: 'monospace', color: '#fff', textShadow: '0 0 20px #ec4899' }}>
        {timeLeft}
      </div>
    </div>
  );
}

function MusicControl({ isPlaying, toggleMusic }) {
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
      <button 
        onClick={toggleMusic}
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



export default function MainPage({ isPlaying, toggleMusic }) {
  const morseCode = ".. ..-. / .. / .... .- ...- . / .- -. / --- .--. - .. --- -. / -.. .. .- -- --- -. -.. / .- -. -.. / -.-- --- ..- --..-- / .. / -.-. .... --- --- ... . / -.-- --- ..-";
  const [bursts, setBursts] = useState([]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(morseCode);
    alert('Morse Code Copied! Ask ChatGPT what it means 🕵️‍♀️');
  };

  const handleClick = (e) => {
    const id = Date.now();
    setBursts(prev => [...prev, { x: e.clientX, y: e.clientY, id }]);
    setTimeout(() => {
      setBursts(prev => prev.filter(b => b.id !== id));
    }, 1000);
  };

  return (
    <div 
      onClick={handleClick}
      style={{ position: 'relative', minHeight: '100vh', color: 'white', overflowX: 'hidden', cursor: 'none' }}
    >
      <HeartCursor />
      <MusicControl isPlaying={isPlaying} toggleMusic={toggleMusic} />
      <Hyperspeed />
      
      {/* Click Burst Effect */}
      {bursts.map(burst => (
        <motion.div
          key={burst.id}
          initial={{ scale: 0, opacity: 1 }}
          animate={{ scale: 2, opacity: 0 }}
          transition={{ duration: 0.5 }}
          style={{
            position: 'fixed',
            left: burst.x,
            top: burst.y,
            pointerEvents: 'none',
            fontSize: '2rem',
            transform: 'translate(-50%, -50%)',
            zIndex: 9998
          }}
        >
          💥💖
        </motion.div>
      ))}

      {/* Floating Hearts Background */}
      {[...Array(15)].map((_, i) => (
        <FloatingHeart key={i} delay={Math.random() * 10} />
      ))}

      <div style={{ position: 'relative', zIndex: 1 }}>
        {/* Header Section */}
        <section style={{ 
          minHeight: '100vh', 
          display: 'flex', 
          flexDirection: 'column', 
          justifyContent: 'center', 
          alignItems: 'center',
          textAlign: 'center',
          padding: '2rem'
        }}>
          <motion.h1 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="glow-text gradient-text"
            style={{ fontSize: 'clamp(3rem, 8vw, 6rem)', fontWeight: 'bold', lineHeight: 1.1, marginBottom: '1rem' }}
          >
            HAPPY<br/>GALENTINE'S<br/>DAY
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            style={{ fontSize: '1.5rem', color: '#fbcfe8', maxWidth: '600px', marginBottom: '2rem' }}
          >
            To my bestie, my partner in crime, and the love i choose. 🌹✨
          </motion.p>
          
          <GalentineCountdown />
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2, duration: 1 }}
            className="floating"
            style={{ marginTop: '4rem' }}
          >
            👇 Scroll Down 👇
          </motion.div>
        </section>

        {/* Gallery Section */}
        <section style={{ height: '100vh', position: 'relative' }}>
          <div style={{ position: 'absolute', top: '2rem', width: '100%', textAlign: 'center', zIndex: 10 }}>
            <h2 style={{ fontSize: '2rem', fontWeight: 'bold', color: 'white', textShadow: '0 0 10px pink' }}>Our Memories</h2>
            <p style={{ opacity: 0.7 }}>Drag to explore the dome</p>
          </div>
          <DomeGallery images={images} />
        </section>

        {/* Nicknames Section */}
        <section style={{ 
          padding: '4rem 2rem', 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center',
          background: 'rgba(0,0,0,0.3)',
          backdropFilter: 'blur(5px)'
        }}>
          <h2 className="glow-text" style={{ fontSize: '3rem', marginBottom: '3rem', textAlign: 'center' }}>
            Aliases & Nicknames
          </h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem', justifyContent: 'center', maxWidth: '800px' }}>
            {[
              'Alagamma', 'Pattu', 'Chellam', 'Cotton Candy', 'Yellow', 'My Everything', 'The Responsible One (Not)'
            ].map((name, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.1, rotate: Math.random() * 10 - 5 }}
                style={{
                  padding: '1rem 2rem',
                  background: 'linear-gradient(135deg, rgba(236, 72, 153, 0.2), rgba(139, 92, 246, 0.1))',
                  border: '1px solid rgba(236, 72, 153, 0.5)',
                  borderRadius: '50px',
                  fontSize: '1.2rem',
                  fontWeight: 'bold',
                  boxShadow: '0 4px 15px rgba(236, 72, 153, 0.2)',
                  cursor: 'default',
                  backdropFilter: 'blur(4px)'
                }}
              >
                {name}
              </motion.div>
            ))}
          </div>
        </section>

        {/* Morse Code Section */}
        <section style={{ 
          minHeight: '80vh', 
          display: 'flex', 
          flexDirection: 'column', 
          justifyContent: 'center', 
          alignItems: 'center', 
          textAlign: 'center',
          padding: '2rem'
        }}>
          <h2 style={{ fontSize: '2rem', marginBottom: '2rem', color: '#f472b6' }}>A Secret Message For You</h2>
          
          <div style={{ 
            background: 'rgba(0,0,0,0.6)', 
            padding: '2rem', 
            borderRadius: '1rem', 
            border: '2px dashed #ec4899',
            marginBottom: '2rem',
            maxWidth: '100%',
            overflowWrap: 'break-word'
          }}>
            <p style={{ fontFamily: 'monospace', fontSize: '1.5rem', lineHeight: 2, letterSpacing: '2px', color: '#ffeb3b' }}>
              {morseCode}
            </p>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={copyToClipboard}
            style={{
              padding: '1rem 2rem',
              fontSize: '1.2rem',
              fontWeight: 'bold',
              background: '#ec4899',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              boxShadow: '0 0 20px rgba(236, 72, 153, 0.5)'
            }}
          >
            Copy & Check ChatGPT 🕵️‍♀️
          </motion.button>
          <p style={{ marginTop: '1rem', opacity: 0.6 }}>Tap the button to copy the code!</p>
        </section>

        <section style={{ padding: '2rem', textAlign: 'center', opacity: 0.5 }}>
          <p>Made with 💖 for my bestie</p>
        </section>
      </div>
    </div>
  );
}
