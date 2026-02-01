import React, { useEffect, useState, useRef } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Music, Stamp } from 'lucide-react';

const CustomHeart = ({ delay, style }) => (
    <motion.div
        initial={{ y: "100vh", opacity: 0, scale: 0.5 }}
        animate={{
            y: "-100vh",
            opacity: [0, 1, 1, 0],
            scale: [0.5, 1, 0.5],
            x: [0, Math.random() * 100 - 50, 0]
        }}
        transition={{
            duration: Math.random() * 5 + 5,
            repeat: Infinity,
            delay: delay,
            ease: "linear"
        }}
        className="absolute pointer-events-none"
        style={{ ...style }}
    >
        <svg width="50" height="50" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M19.5 12.572l-7.5 7.428l-7.5 -7.428a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572"
                stroke="url(#gradient)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <defs>
                <linearGradient id="gradient" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#f43f5e" />
                    <stop offset="100%" stopColor="#fbbf24" />
                </linearGradient>
            </defs>
        </svg>
    </motion.div>
);

const captions = [
    "You are the light of my life! ✨",
    "Every moment with you is magic.",
    "Your smile lights up my world.",
    "I love you more than words can say.",
    "Happy Birthday to my Soulmate! ❤️",
    "You make my heart smile.",
    "Forever and always, my love.",
    "To many more memories together!",
    "You are beautiful inside and out.",
    "I'm so lucky to have you.",
    "My heart beats only for you.",
    "You are my favorite person.",
    "Simply the best! 🌟",
    "I love how we laugh together.",
    "You are my dream come true."
];

const BirthdayCard = () => {
    const [currentImage, setCurrentImage] = useState(0);
    const totalImages = 15;
    const audioRef = useRef(null);

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = 0.5;
            audioRef.current.play().catch(e => console.log("Audio autoplay failed"));
        }

        const interval = setInterval(() => {
            setCurrentImage(prev => (prev + 1) % totalImages);
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    return createPortal(
        <div className="fixed top-0 left-0 w-full h-full bg-stone-100 flex flex-col z-[9999] overflow-hidden font-sans">
            <audio ref={audioRef} src={`${import.meta.env.BASE_URL}song.mp3`} loop />

            {[...Array(20)].map((_, i) => (
                <CustomHeart
                    key={i}
                    delay={i * 0.5}
                    style={{
                        left: `${Math.random() * 100}%`,
                        transform: `scale(${Math.random() * 0.5 + 0.5})`
                    }}
                />
            ))}

            {/* Main Container - The Inland Letter */}
            <div className="flex w-full h-full p-4 md:p-12 items-center justify-center">

                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.8 }}
                    className="w-full max-w-7xl h-full md:h-[85vh] bg-[#E0F7FA] shadow-2xl relative flex flex-row overflow-hidden border-2 border-cyan-200"
                    style={{
                        backgroundImage: 'repeating-linear-gradient(#E0F7FA 0px, #E0F7FA 24px, #B2EBF2 25px)'
                    }}
                >
                    {/* Inland Letter Aesthetics */}
                    <div className="absolute top-0 w-full h-6 bg-[#B2EBF2] border-b border-dashed border-cyan-400 opacity-60"></div>
                    <div className="absolute bottom-0 w-full h-6 bg-[#B2EBF2] border-t border-dashed border-cyan-400 opacity-60"></div>

                    {/* Left Side: Photos - 75% Width */}
                    <div className="w-[75%] h-full relative p-6 flex items-center justify-center border-r-2 border-dashed border-cyan-400 bg-[#E0F7FA]">
                        {/* Photo Frame Effect */}
                        <div className="relative w-full h-full max-h-[700px] bg-white p-4 shadow-lg rotate-1 transform transition-transform hover:rotate-0">
                            <div className="w-full h-full overflow-hidden bg-gray-100 relative">
                                <AnimatePresence mode='wait'>
                                    <motion.img
                                        key={currentImage}
                                        src={`${import.meta.env.BASE_URL}images/${currentImage + 1}.jpeg`}
                                        alt={`Memory ${currentImage + 1}`}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        transition={{ duration: 1 }}
                                        className="w-full h-full object-contain"
                                        onError={(e) => { e.target.style.display = 'none'; }}
                                    />
                                </AnimatePresence>
                            </div>
                            {/* Tape effect */}
                            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-32 h-8 bg-white/40 backdrop-blur-sm border border-white/50 rotate-[-2deg] shadow-sm"></div>
                        </div>
                    </div>

                    {/* Right Side: Letter Content - 25% Width */}
                    <div className="w-[25%] h-full p-6 relative flex flex-col justify-between bg-[#E0F7FA]">

                        {/* Stamp - Top Right */}
                        <div className="absolute top-6 right-6 flex flex-col items-center opacity-70 rotate-6 transform scale-90">
                            <div className="w-16 h-20 border-4 border-dotted border-red-800 p-1 flex items-center justify-center">
                                <Stamp className="text-red-800 w-8 h-8" />
                            </div>
                            <span className="text-[10px] font-mono text-red-800 mt-1">VIA AIR MAIL</span>
                        </div>

                        {/* Spacer */}
                        <div className="h-24"></div>

                        {/* Letter Content */}
                        <div className="flex-1 flex flex-col gap-6">
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.5 }}
                            >
                                <h2 className="text-xl md:text-2xl font-bold text-blue-900 font-[Cursive,seriff] mb-2" style={{ fontFamily: 'Brush Script MT, cursive' }}>
                                    Dearest Love,
                                </h2>
                                <h1 className="text-2xl md:text-3xl font-extrabold text-[#D32F2F] drop-shadow-sm leading-tight" style={{ fontFamily: 'Georgia, serif' }}>
                                    Happy Birthday! ❤️
                                </h1>
                            </motion.div>

                            <AnimatePresence mode='wait'>
                                <motion.div
                                    key={currentImage}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.5 }}
                                    className="text-lg text-slate-800 leading-relaxed italic"
                                    style={{ fontFamily: '"Comic Sans MS", "Chalkboard SE", sans-serif' }}
                                >
                                    "{captions[currentImage % captions.length]}"
                                </motion.div>
                            </AnimatePresence>
                        </div>

                        {/* Signature - Bottom Right */}
                        <div className="mt-8 text-right">
                            <p className="text-blue-800 font-medium text-lg">Yours Forever,</p>
                            <p className="text-blue-900 font-bold text-2xl" style={{ fontFamily: 'Brush Script MT, cursive' }}>Ansha</p>
                        </div>

                    </div>

                </motion.div>
            </div>

        </div>,
        document.body
    );
};

export default BirthdayCard;
