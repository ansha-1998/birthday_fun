import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Heart } from 'lucide-react';

const SuccessScreen = () => {
    useEffect(() => {
        // Fire confetti repeatedly
        const duration = 5 * 1000;
        const animationEnd = Date.now() + duration;
        const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

        const randomInRange = (min, max) => Math.random() * (max - min) + min;

        const interval = setInterval(() => {
            const timeLeft = animationEnd - Date.now();

            if (timeLeft <= 0) {
                return clearInterval(interval);
            }

            const particleCount = 50 * (timeLeft / duration);
            confetti({
                ...defaults,
                particleCount,
                origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
            });
            confetti({
                ...defaults,
                particleCount,
                origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
            });
        }, 250);

        return () => clearInterval(interval);
    }, []);

    return (
        <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-center p-10 bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl border-4 border-love-500 max-w-2xl"
        >
            <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
                className="inline-block mb-6"
            >
                <Heart className="w-32 h-32 text-love-600 fill-love-500" />
            </motion.div>

            <h1 className="text-5xl font-extrabold text-love-600 mb-6 font-[Inter]">
                Yay! I knew it! ❤️
            </h1>

            <p className="text-2xl text-gray-700 font-medium leading-relaxed">
                You've made me the happiest person ever!
                <br />
                <span className="text-love-500">I love you so much!</span>
            </p>

            <div className="mt-8 flex justify-center gap-4">
                {[...Array(5)].map((_, i) => (
                    <motion.div
                        key={i}
                        animate={{ y: [0, -20, 0] }}
                        transition={{ delay: i * 0.1, repeat: Infinity, duration: 2 }}
                    >
                        <Heart className="text-love-400 fill-love-200" size={32} />
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
};

export default SuccessScreen;
