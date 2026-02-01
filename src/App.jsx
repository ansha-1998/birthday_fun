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

const HeartProgressBar = ({ total, filled }) => (
  <div className="fixed right-4 top-4 md:right-8 md:top-8 flex flex-col gap-4 z-50">
    <div className="bg-white/20 backdrop-blur-sm p-3 rounded-full shadow-lg border border-white/30 flex flex-col gap-3">
      {[...Array(total)].map((_, i) => (
        <div key={i} className="relative">
          <Heart
            size={24}
            className={`transition-all duration-500 ${i < filled ? 'fill-love-500 text-love-500 scale-110 drop-shadow-[0_0_10px_rgba(236,72,153,0.5)]' : 'text-white/60 scale-100'}`}
          />
        </div>
      ))}
    </div>
  </div>
);

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

function App() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
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
        setIsFinished(true);
      }
    }, 2000);
  };

  // Flying hearts background
  const backgroundHearts = Array(20).fill(null);

  return (
    <div className={`relative w-full h-screen ${pastelGradients[currentQuestionIndex % pastelGradients.length]} transition-colors duration-1000 overflow-hidden flex items-center justify-center font-['Playfair_Display']`}>

      {/* Progress Bar: Filled based on current index + 1 if we are celebrating or finished */}
      <HeartProgressBar total={questions.length} filled={currentQuestionIndex + (showCongrats || isFinished ? 1 : 0)} />

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
        {!isFinished ? (
          // Hide QuestionCard when showing congrats
          !showCongrats && (
            <QuestionCard
              key={currentQuestionIndex}
              question={questions[currentQuestionIndex].text}
              index={currentQuestionIndex}
              onYes={handleYes}
            />
          )
        ) : (
          !isCardOpened ? (
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
