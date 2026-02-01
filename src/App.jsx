import React, { useState } from 'react';
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


function App() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [isCardOpened, setIsCardOpened] = useState(false);

  const handleYes = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      setIsFinished(true);
    }
  };

  // Flying hearts background
  const backgroundHearts = Array(20).fill(null);

  return (
    <div className={`relative w-full h-screen ${pastelGradients[currentQuestionIndex % pastelGradients.length]} transition-colors duration-1000 overflow-hidden flex items-center justify-center font-['Playfair_Display']`}>

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
          <QuestionCard
            key={currentQuestionIndex}
            question={questions[currentQuestionIndex].text}
            index={currentQuestionIndex}
            onYes={handleYes}
          />
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
