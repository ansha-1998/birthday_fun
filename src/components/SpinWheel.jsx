import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Gift, Plane, Star, PartyPopper } from 'lucide-react';

const SpinWheel = ({ onComplete }) => {
    const [isSpinning, setIsSpinning] = useState(false);
    const [hasSpun, setHasSpun] = useState(false);
    const [selectedBox, setSelectedBox] = useState(null);
    const [showPrize, setShowPrize] = useState(false);

    // The prizes are initially "Mystery", then we shuffle visually.
    // No matter what, they pick the "Special Date Trip".
    const boxes = [1, 2, 3, 4];

    const handleSpin = () => {
        setIsSpinning(true);
        // Simulate spinning/shuffling for 2 seconds
        setTimeout(() => {
            setIsSpinning(false);
            setHasSpun(true);
        }, 2000);
    };

    const handleBoxClick = (index) => {
        if (!hasSpun || selectedBox !== null) return;

        setSelectedBox(index);

        // Reveal delay
        setTimeout(() => {
            setShowPrize(true);
        }, 500);

        // Call onComplete after user sees the prize for a bit
        setTimeout(() => {
            onComplete();
        }, 5000); // Give them time to celebrate before moving on
    };

    return (
        <div className="relative w-full max-w-4xl mx-auto flex flex-col items-center justify-center min-h-[60vh]">

            {!showPrize ? (
                <>
                    <motion.h2
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-3xl md:text-5xl font-bold text-white drop-shadow-lg mb-8 text-center font-['Playfair_Display']"
                    >
                        {hasSpun ? "Pick a Mystery Box! 🎁" : "Spin for your Gift! 🎡"}
                    </motion.h2>

                    <div className="flex flex-wrap gap-4 justify-center items-center mb-8">
                        {boxes.map((box, index) => (
                            <motion.div
                                key={index}
                                whileHover={hasSpun && !selectedBox ? { scale: 1.1, rotate: 5 } : {}}
                                whileTap={hasSpun && !selectedBox ? { scale: 0.95 } : {}}
                                animate={isSpinning ? {
                                    scale: [1, 1.1, 1],
                                    rotate: [0, 10, -10, 0],
                                    x: [0, 10, -10, 0],
                                    transition: { repeat: Infinity, duration: 0.3 }
                                } : {
                                    rotate: 0,
                                    x: 0
                                }}
                                onClick={() => handleBoxClick(index)}
                                className={`
                            relative w-32 h-32 md:w-40 md:h-40 bg-white/30 backdrop-blur-md 
                            rounded-3xl border-4 border-white/50 shadow-2xl 
                            flex items-center justify-center cursor-pointer overflow-hidden
                            ${selectedBox === index ? 'ring-8 ring-yellow-400 scale-110 z-10' : ''}
                            ${selectedBox !== null && selectedBox !== index ? 'opacity-50 grayscale' : ''}
                            ${!hasSpun ? 'opacity-80' : 'hover:bg-white/40'}
                        `}
                            >
                                <Gift size={48} className="text-white drop-shadow-md" />
                                <span className="absolute bottom-2 text-white font-bold text-lg drop-shadow-md">
                                    ?
                                </span>
                            </motion.div>
                        ))}
                    </div>

                    {!hasSpun && !isSpinning && (
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={handleSpin}
                            className="bg-love-500 hover:bg-love-600 text-white font-bold py-4 px-12 rounded-full shadow-2xl text-2xl border-4 border-white/30 animate-pulse"
                        >
                            CLICK TO SPIN! 🎲
                        </motion.button>
                    )}

                    {isSpinning && (
                        <div className="text-2xl text-white font-bold animate-bounce drop-shadow-md">
                            Shuffling Prizes... 🔄
                        </div>
                    )}
                </>
            ) : (
                <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: "spring", bounce: 0.5 }}
                    className="bg-white/90 backdrop-blur-xl p-8 md:p-12 rounded-[3rem] shadow-2xl border-8 border-yellow-400 flex flex-col items-center text-center max-w-2xl mx-4"
                >
                    <div className="mb-6 relative">
                        <div className="absolute inset-0 bg-yellow-400 blur-2xl opacity-50 animate-pulse"></div>
                        <Plane size={80} className="text-blue-500 relative z-10" />
                        <Star size={40} className="text-yellow-400 absolute -top-4 -right-4 z-20 animate-spin-slow" />
                        <PartyPopper size={40} className="text-pink-500 absolute -bottom-4 -left-4 z-20" />
                    </div>

                    <h2 className="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-4 font-['Playfair_Display']">
                        CONGRATULATIONS!
                    </h2>
                    <h3 className="text-2xl md:text-3xl font-bold text-gray-700 mb-2">
                        You Won a...
                    </h3>
                    <div className="bg-gradient-to-r from-blue-100 to-purple-100 px-8 py-4 rounded-xl border-2 border-blue-200 mb-6 transform rotate-1">
                        <p className="text-3xl md:text-5xl font-black text-blue-600 tracking-tight">
                            SPECIAL DATE TRIP! ✈️🌍
                        </p>
                    </div>
                    <p className="text-lg text-gray-500 italic">
                        Pack your bags, my love! ❤️
                    </p>
                </motion.div>
            )}
        </div>
    );
};

export default SpinWheel;
