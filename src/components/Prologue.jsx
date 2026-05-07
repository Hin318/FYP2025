
import React, { useState, useEffect } from 'react';


const storyLines = [
"你是否曾幻想過生小朋友?",
"你是否曾對小朋友抱有疑惑?",
"所有答案都在這裡",
"The Life Choices",
"歡迎遊玩!"
];

const Prologue = ({ onAnimationEnd }) => {
  

  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [fadeState, setFadeState] = useState('in'); 
  const [startReveal, setStartReveal] = useState(false); 

  
  useEffect(() => {
    
    if (startReveal) return;

    
    const readTimer = setTimeout(() => {
      setFadeState('out'); 
    }, 2500);

    return () => clearTimeout(readTimer);
  }, [currentLineIndex, startReveal]);

  
  useEffect(() => {
    if (fadeState === 'out') {
      const switchTimer = setTimeout(() => {
        
        if (currentLineIndex < storyLines.length - 1) {
          setCurrentLineIndex(prev => prev + 1); 
          setFadeState('in'); 
        } else {
          
          setStartReveal(true);
        }
      }, 1000); 
      
      return () => clearTimeout(switchTimer);
    }
  }, [fadeState, currentLineIndex]);


 
  useEffect(() => {
    if (startReveal) {

      const endTimer = setTimeout(() => {
        onAnimationEnd();
      }, 4000);
      return () => clearTimeout(endTimer);
    }
  }, [startReveal, onAnimationEnd]);


 return (
    <div 
      className="prologue-screen"
      style={{

        backgroundColor: 'black',

        color: 'white',

        width: '100vw',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'fixed', 
        top: 0,
        left: 0,
        zIndex: 9999 
      }}
    >
      <div className={`memory-bg ${startReveal ? 'start-anim' : ''}`}></div>

      
      <div className={`black-overlay ${startReveal ? 'start-anim' : ''}`}></div>


      {!startReveal && (
        <div className={`memory-text ${fadeState === 'in' ? 'visible' : 'hidden'}`}>
          <p>{storyLines[currentLineIndex]}</p>
        </div>
      )}
    </div>
  );
};

export default Prologue;