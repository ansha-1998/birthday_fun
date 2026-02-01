import React, { useEffect, useState, useRef } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Music, Quote } from 'lucide-react';

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
        <div className="fixed top-0 left-0 w-full h-full bg-love-50 flex flex-col z-[9999] overflow-hidden">
            <audio ref={audioRef} src={`${import.meta.env.BASE_URL}song.mp3`} loop />

            {[...Array(20)].map((_, i) => (
                <CustomHeart
                    // ... (rest of the content remains the same structure but ensuring high Z-index)
                    key={i}
                    delay={i * 0.5}
                    style={{
                        left: `${Math.random() * 100}%`,
                        transform: `scale(${Math.random() * 0.5 + 0.5})`
                    }}
                />
            ))}

            {/* Header - Absolute Top - Simplified */}
            <div className="absolute top-0 w-full p-4 z-30 flex justify-center pointer-events-none">
                <motion.h1
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1 }}
                    className="text-2xl md:text-3xl font-bold text-white drop-shadow-lg font-[Inter] bg-black/30 px-6 py-2 rounded-full backdrop-blur-md"
                >
                    Happy Birthday My Love! ❤️
                </motion.h1>
            </div>

            {/* Main Content Split - Full Height */}
            <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8, ease: "backOut" }}
                className="flex w-full h-full pt-20 pb-4 px-8 gap-6 box-border bg-white/80 m-4 md:m-8 rounded-[3rem] shadow-2xl border-4 border-love-200 overflow-hidden relative"
            >
                {/* Envelope Effect Overlay (Optional sophisticated touch) */}
                <div className="absolute top-0 left-0 w-full h-4 bg-love-300 opacity-50"></div>

                {/* Left: Image (Majority) */}
                <div className="flex-1 relative bg-black/5 rounded-3xl overflow-hidden border-2 border-love-100 group">
                    <AnimatePresence mode='wait'>
                        <motion.img
                            key={currentImage}
                            src={`${import.meta.env.BASE_URL}images/${currentImage + 1}.jpeg`}
                            alt={`Memory ${currentImage + 1}`}
                            initial={{ opacity: 0, scale: 1.1 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 1.2 }}
                            className="w-full h-full object-contain md:object-cover" // Contain ensures full image seen if ratio differs
                            onError={(e) => { e.target.style.display = 'none'; }}
                        />
                    </AnimatePresence>

                    <div className="absolute top-4 left-4 bg-black/40 text-white px-3 py-1 rounded-full text-xs backdrop-blur-md">
                        {currentImage + 1} / {totalImages}
                    </div>
                </div>

                {/* Right: Comments (Vertical Sidebar) */}
                <div className="w-80 lg:w-96 flex-shrink-0 flex flex-col justify-center h-full bg-white/40 backdrop-blur-xl rounded-3xl border-2 border-white/60 p-4 shadow-xl ml-4">
                    <AnimatePresence mode='wait'>
                        <motion.div
                            key={currentImage}
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 50 }}
                            transition={{ duration: 0.5 }}
                            className="h-full flex flex-col justify-center items-center text-center relative"
                        >
                            <Quote className="text-love-500 w-10 h-10 mb-4" />

                            <h3 className="text-love-600 font-bold text-sm mb-4 uppercase tracking-widest">Memory #{currentImage + 1}</h3>

                            <p className="text-xl lg:text-2xl font-[Inter] text-gray-800 font-medium leading-relaxed italic">
                                "{captions[currentImage % captions.length]}"
                            </p>

                            <div className="mt-8 flex gap-2 text-love-400 justify-center">
                                <Heart className="fill-current w-5 h-5 animate-pulse" />
                                <Heart className="fill-current w-5 h-5 animate-pulse delay-75" />
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </motion.div>

            {/* Mobile Footer Comment (Only visible on small screens where sidebar is hidden) */}
            <div className="md:hidden absolute bottom-4 w-full px-4 z-30">
                <motion.div
                    key={currentImage}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="bg-white/80 backdrop-blur-md p-4 rounded-xl shadow-lg text-center"
                >
                    <p className="text-love-600 font-medium">"{captions[currentImage % captions.length]}"</p>
                </motion.div>
            </div>

            {/* Removed Music Text */}

        </div>,
        document.body
    );
};

export default BirthdayCard;
