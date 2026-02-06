import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { questions } from './questions';
import QuestionCard from './components/QuestionCard';
import BirthdayCard from './components/BirthdayCard';
import Balloon from './components/Balloon';
import CustomHeart from './components/CustomHeart';
import { Heart } from 'lucide-react';

const pastelGradients = [
  "bg-gradient-to-br from-rose-300 via-pink-400 to-orange-200",
  "bg-gradient-to-br from-blue-300 via-sky-400 to-cyan-200",
  "bg-gradient-to-br from-violet-300 via-purple-400 to-fuchsia-200",
  "bg-gradient-to-br from-green-300 via-emerald-400 to-teal-200",
  "bg-gradient-to-br from-yellow-200 via-amber-300 to-orange-200"
];

// HeartProgressBar removed in favor of BigHeartProgress

const CongratsOverlay = ({ isVisible, message }) => (
  <AnimatePresence>
    {isVisible && (
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.5 }}
        className="fixed inset-0 z-[100] flex items-center justify-center pointer-events-none"
      >
        <div className="bg-white/90 backdrop-blur-md p-8 md:p-12 rounded-3xl shadow-2xl border-4 border-love-300 transform rotate-[-2deg]">
          <h2 className="text-3xl md:text-5xl font-bold text-love-600 font-['Playfair_Display'] text-center drop-shadow-md">
            🎉 {message}
          </h2>
        </div>
      </motion.div>
    )}
  </AnimatePresence>
);

import BigHeartProgress from './components/BigHeartProgress';
import SpinWheel from './components/SpinWheel';

function App() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [showSpinWheel, setShowSpinWheel] = useState(false);
  const [heartAnimationState, setHeartAnimationState] = useState('idle'); // idle, centering, blinking, done
  const [isCardOpened, setIsCardOpened] = useState(false);
  const [showCongrats, setShowCongrats] = useState(false);
  const [congratsMsg, setCongratsMsg] = useState("");

  const handleYes = () => {
    // Show Congrats
    const msg = questions[currentQuestionIndex].congratsMessage || "Correct Answer! 🎉";
    setCongratsMsg(msg);
    setShowCongrats(true);

    // Wait before advancing
    setTimeout(() => {
      setShowCongrats(false);
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(prev => prev + 1);
      } else {
        // Instead of finishing immediately, we go to spin wheel
        setShowSpinWheel(true);
      }
    }, 2000);
  };

  // Flying hearts background
  const backgroundHearts = Array(20).fill(null);

  return (
    <div className={`relative w-full h-screen ${pastelGradients[currentQuestionIndex % pastelGradients.length]} transition-colors duration-1000 overflow-hidden flex items-center justify-center font-['Playfair_Display']`}>

      {/* Replaces HeartProgressBar */}
      <BigHeartProgress
        total={questions.length}
        progress={currentQuestionIndex + (showCongrats || isFinished || showSpinWheel ? 1 : 0)}
        animationState={heartAnimationState}
      />

      <CongratsOverlay isVisible={showCongrats} message={congratsMsg} />

      {/* Moving Hearts Background */}
      {[...Array(20)].map((_, i) => (
        <CustomHeart
          key={`global-heart-${i}`}
          delay={i * 1.5}
          style={{
            left: `${Math.random() * 100}%`,
            transform: `scale(${Math.random() * 0.5 + 0.8})`
          }}
        />
      ))}

      {/* Moving Balloons Background */}
      {[...Array(15)].map((_, i) => (
        <Balloon
          key={`balloon-${i}`}
          delay={i * 2}
          color={['#FF69B4', '#87CEEB', '#FFD700', '#DDA0DD', '#98FB98'][i % 5]}
          left={`${Math.random() * 100}%`}
        />
      ))}

      <div className="relative z-10 w-full flex justify-center p-4">
        {/* State 1: Quiz in progress */}
        {!isFinished && !showSpinWheel && heartAnimationState === 'idle' ? (
          // Hide QuestionCard when showing congrats
          !showCongrats && (
            <QuestionCard
              key={currentQuestionIndex}
              question={questions[currentQuestionIndex].text}
              isTrickQuestion={questions[currentQuestionIndex].isTricky}
              index={currentQuestionIndex}
              onYes={handleYes}
            />
          )
        ) : showSpinWheel ? (
          // State 2: Spin Wheel
          !showCongrats && (
            <SpinWheel onComplete={() => {
              // Finale Sequence: Open Card Immediately
              setShowSpinWheel(false);
              setIsFinished(true);
              setIsCardOpened(true);

              // Run Heart Animation as Overlay
              setHeartAnimationState('centering');
              setTimeout(() => setHeartAnimationState('blinking'), 1000);
              setTimeout(() => setHeartAnimationState('done'), 3500);
            }} />
          )
        ) : (
          // State 3: Finished (Card Phase) - Animation runs on top if active
          !isCardOpened ? (
            // Fallback if needed, though we set isCardOpened to true above
            <div className="text-center">
              <button
                onClick={() => setIsCardOpened(true)}
                className="bg-love-500 hover:bg-love-600 text-white font-bold py-4 px-10 rounded-full shadow-2xl transition-transform hover:scale-105 animate-bounce text-2xl flex items-center gap-3 mx-auto"
              >
                <Heart className="fill-current" />
                Open Your Surprise! 🎁
              </button>
            </div>
          ) : (
            <BirthdayCard />
          )
        )}
      </div>

      <div className="absolute bottom-4 text-love-400 text-sm font-medium opacity-60">
        Made with ❤️ for you
      </div>
    </div>
  );
}

export default App;
