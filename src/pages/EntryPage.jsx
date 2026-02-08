import React, { useState } from 'react';
import { motion } from 'framer-motion';

export default function EntryPage({ onAccessGranted }) {
  const [answer, setAnswer] = useState('');
  const [isWrong, setIsWrong] = useState(false);
  const [shake, setShake] = useState(0);

  const correctAnswers = ['lucas'];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (correctAnswers.includes(answer.trim().toLowerCase())) {
      onAccessGranted();
    } else {
      setIsWrong(true);
      setShake((prev) => prev + 1);
      setTimeout(() => setIsWrong(false), 2000);
    }
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      backgroundColor: 'black',
      color: 'white',
      fontFamily: "'Outfit', sans-serif",
      overflow: 'hidden',
      position: 'relative'
    }}>
      <div style={{
        position: 'absolute',
        top: 0, left: 0, right: 0, bottom: 0,
        pointerEvents: 'none',
        opacity: 0.2,
        backgroundImage: 'url("https://www.transparenttextures.com/patterns/stardust.png")'
      }}></div>
      
      <motion.div 
        key={shake} // Shake animation key
        animate={isWrong ? { x: [-10, 10, -10, 10, 0] } : {}}
        transition={{ duration: 0.4 }}
        style={{
          zIndex: 10,
          textAlign: 'center',
          padding: '2rem',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          backdropFilter: 'blur(10px)',
          borderRadius: '16px',
          border: '1px solid rgba(236, 72, 153, 0.3)',
          boxShadow: '0 0 50px rgba(236, 72, 153, 0.3)',
          maxWidth: '90%',
          width: '400px'
        }}
      >
        <h1 className="glow-text" style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '1.5rem', background: 'linear-gradient(to right, #ec4899, #a855f7, #ec4899)', WebkitBackgroundClip: 'text', color: 'transparent' }}>
          Access Required 💖
        </h1>
        
        <p style={{ fontSize: '1.125rem', marginBottom: '2rem', color: '#d1d5db' }}>
          What is the name of Ben Tennyson's Grandpa?
        </p>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <input
            type="text"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder="Type the answer..."
            style={{
              width: '100%',
              padding: '0.75rem 1rem',
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              borderRadius: '0.5rem',
              color: 'white',
              textAlign: 'center',
              fontSize: '1.25rem'
            }}
            autoFocus
          />
          
          <button
            type="submit"
            style={{
              width: '100%',
              padding: '0.75rem',
              background: 'linear-gradient(to right, #db2777, #9333ea)',
              color: 'white',
              borderRadius: '0.5rem',
              fontWeight: '600',
              cursor: 'pointer',
              border: 'none',
              marginTop: '1rem',
              transition: 'transform 0.2s',
              boxShadow: '0 10px 15px -3px rgba(236, 72, 153, 0.4)'
            }}
            onMouseOver={(e) => e.target.style.transform = 'scale(1.02)'}
            onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
          >
            Enter Heart Chamber
          </button>
        </form>

        {isWrong && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            style={{ marginTop: '1.5rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
          >
            <div style={{ width: '6rem', height: '6rem', marginBottom: '0.5rem' }}>
              <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="50" cy="50" r="45" fill="#EF4444" stroke="#B91C1C" strokeWidth="2"/>
                <path d="M30 40 L45 50" stroke="white" strokeWidth="5" strokeLinecap="round" />
                <path d="M70 40 L55 50" stroke="white" strokeWidth="5" strokeLinecap="round" />
                <circle cx="35" cy="55" r="5" fill="white" />
                <circle cx="65" cy="55" r="5" fill="white" />
                <path d="M35 75 Q50 65 65 75" stroke="white" strokeWidth="3" strokeLinecap="round" />
              </svg>
            </div>
            <p style={{ color: '#f87171', fontWeight: 'bold', fontSize: '1.125rem' }}>
              WRONG! TRY AGAIN! 😡
            </p>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}

