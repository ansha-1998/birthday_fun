import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Gift, Plane, Star, PartyPopper, Palmtree, Sun, Sunset, Waves, Umbrella } from 'lucide-react';

const SpinWheel = ({ onComplete }) => {
    const [isSpinning, setIsSpinning] = useState(false);
    const [hasSpun, setHasSpun] = useState(false);
    const [selectedBox, setSelectedBox] = useState(null);
    const [showPrize, setShowPrize] = useState(false);
    const [boxes, setBoxes] = useState([1, 2, 3, 4]);

    const shuffleBoxes = () => {
        setBoxes(prev => [...prev].sort(() => Math.random() - 0.5));
    };

    const handleSpin = () => {
        setIsSpinning(true);
        let shuffleCount = 0;
        const maxShuffles = 20; // Shuffle 20 times rapidly

        const intervalId = setInterval(() => {
            shuffleBoxes();
            shuffleCount++;
            if (shuffleCount >= maxShuffles) {
                clearInterval(intervalId);
                setIsSpinning(false);
                setHasSpun(true);
            }
        }, 100); // Every 100ms
    };

    const handleBoxClick = (boxId) => {
        if (!hasSpun || selectedBox !== null) return;

        setSelectedBox(boxId);

        // Reveal delay
        setTimeout(() => {
            setShowPrize(true);
        }, 500);
    };

    return (
        <div className="relative w-full max-w-4xl mx-auto flex flex-col items-center justify-center min-h-[60vh] overflow-hidden">

            {/* Beach Background for this component only */}
            {showPrize && (
                <div className="absolute inset-0 -z-10 bg-gradient-to-b from-sky-400 via-sky-200 to-yellow-100 opacity-90 transition-opacity duration-1000">
                    <motion.div
                        initial={{ y: 100 }} animate={{ y: 0 }} transition={{ duration: 2 }}
                        className="absolute bottom-0 w-full h-32 bg-[#F4E185] opacity-80 blur-xl"
                    /> {/* Sand Glow */}
                </div>
            )}

            {!showPrize ? (
                <>
                    <motion.h2
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-3xl md:text-5xl font-bold text-white drop-shadow-lg mb-8 text-center font-['Playfair_Display']"
                    >
                        {hasSpun ? "Pick a Mystery Box! 🎁" : "Spin for your Gift! 🎡"}
                    </motion.h2>

                    <motion.div layout className="flex flex-wrap gap-4 justify-center items-center mb-8 w-full">
                        <AnimatePresence>
                            {boxes.map((boxId) => (
                                <motion.div
                                    layout
                                    key={boxId}
                                    initial={false}
                                    whileHover={hasSpun && !selectedBox ? { scale: 1.1, rotate: 5 } : {}}
                                    whileTap={hasSpun && !selectedBox ? { scale: 0.95 } : {}}
                                    animate={isSpinning ? {
                                        scale: [1, 0.9, 1],
                                    } : {
                                        rotate: 0,
                                        x: 0
                                    }}
                                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                                    onClick={() => handleBoxClick(boxId)}
                                    className={`
                            relative w-32 h-32 md:w-40 md:h-40 bg-white/30 backdrop-blur-md 
                            rounded-3xl border-4 border-white/50 shadow-2xl 
                            flex items-center justify-center cursor-pointer overflow-hidden
                            ${selectedBox === boxId ? 'ring-8 ring-yellow-400 scale-110 z-10' : ''}
                            ${selectedBox !== null && selectedBox !== boxId ? 'opacity-50 grayscale' : ''}
                            ${!hasSpun ? 'opacity-80' : 'hover:bg-white/40'}
                        `}
                                >
                                    <Gift size={48} className="text-white drop-shadow-md" />
                                    <span className="absolute bottom-2 text-white font-bold text-lg drop-shadow-md">
                                        ?
                                    </span>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </motion.div>

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
                    className="relative bg-white/60 backdrop-blur-xl p-8 md:p-12 rounded-[3rem] shadow-2xl border-8 border-sky-300 flex flex-col items-center text-center max-w-3xl mx-4 overflow-hidden"
                >
                    {/* Decoration Icons */}
                    <motion.div
                        animate={{ rotate: [0, 5, 0], y: [0, -5, 0] }}
                        transition={{ repeat: Infinity, duration: 4 }}
                        className="absolute top-4 left-4 text-yellow-500 opacity-80"
                    >
                        <Sun size={60} />
                    </motion.div>
                    <motion.div
                        animate={{ rotate: [0, -5, 0] }}
                        transition={{ repeat: Infinity, duration: 5 }}
                        className="absolute top-10 right-4 text-green-600 opacity-80"
                    >
                        <Palmtree size={70} />
                    </motion.div>
                    <motion.div
                        animate={{ y: [0, 5, 0] }}
                        transition={{ repeat: Infinity, duration: 3 }}
                        className="absolute bottom-4 left-4 text-blue-400 opacity-60"
                    >
                        <Waves size={50} />
                    </motion.div>
                    <motion.div
                        transition={{ repeat: Infinity, duration: 6 }}
                        className="absolute bottom-6 right-6 text-orange-500 opacity-80"
                    >
                        <Umbrella size={50} />
                    </motion.div>


                    <div className="mb-6 relative z-10">
                        <Plane size={90} className="text-blue-600 drop-shadow-lg transform -rotate-12" />
                    </div>

                    <h2 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-rose-500 mb-2 font-['Playfair_Display'] drop-shadow-sm">
                        CONGRATULATIONS!
                    </h2>
                    <h3 className="text-2xl md:text-3xl font-bold text-sky-700 mb-6 font-serif italic">
                        Get ready for some vitamin sea! 🌊
                    </h3>

                    <div className="bg-gradient-to-r from-sky-100 to-blue-50 px-8 py-6 rounded-2xl border-4 border-sky-200 mb-6 w-full shadow-inner transform rotate-1">
                        <p className="text-2xl md:text-4xl font-black text-blue-800 tracking-tight mb-2">
                            SPECIAL DATE TRIP! ✈️
                        </p>
                        <p className="text-xl md:text-2xl font-bold text-rose-600">
                            📅 20/02 to 22/02
                        </p>
                    </div>

                    <p className="text-xl text-slate-700 font-medium leading-relaxed max-w-lg mx-auto font-sans">
                        "Pack the bags and rock! 🎸🌴"
                    </p>
                    <p className="text-sm text-slate-500 mt-2 italic">
                        (Don't forget the sunscreen! ☀️)
                    </p>

                    <motion.button
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1 }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={onComplete}
                        className="bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-12 rounded-full shadow-2xl text-xl md:text-2xl transition-all border-4 border-white/40 flex items-center gap-3 z-50 pointer-events-auto mt-8 cursor-pointer"
                    >
                        WOOHOO! Let's Go! 🚀
                    </motion.button>
                </motion.div>
            )}
        </div>
    );
};

export default SpinWheel;
