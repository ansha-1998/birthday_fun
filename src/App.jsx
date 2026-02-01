import React, { useState } from 'react';
import { questions } from './questions';
import QuestionCard from './components/QuestionCard';
import BirthdayCard from './components/BirthdayCard';
import CustomHeart from './components/CustomHeart';
import { Heart } from 'lucide-react';

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
    <div className="relative w-full h-screen bg-love-100 overflow-hidden flex items-center justify-center">
      {/* Global Background Custom Hearts */}
      {[...Array(15)].map((_, i) => (
        <CustomHeart
          key={`global-heart-${i}`}
          delay={i * 2}
          style={{
            left: `${Math.random() * 100}%`,
            transform: `scale(${Math.random() * 0.5 + 0.8})`
          }}
        />
      ))}

      <div className="relative z-10 w-full flex justify-center p-4">
        {!isFinished ? (
          <QuestionCard
            key={currentQuestionIndex}
            question={questions[currentQuestionIndex].text}
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
