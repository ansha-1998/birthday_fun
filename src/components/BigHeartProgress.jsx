import React from 'react';
import { motion } from 'framer-motion';

const BigHeartProgress = ({ progress, total, animationState }) => {
    // progress is current index (0 to total)
    // fill percentage = (progress / total) * 100
    const fillPercentage = Math.min(100, Math.max(0, (progress / total) * 100));

    const isCentering = animationState === 'centering';
    const isBlinking = animationState === 'blinking';

    return (
        <motion.div
            layout
            initial={{ top: '20px', right: '20px', x: 0, y: 0, scale: 1 }}
            animate={
                isCentering || isBlinking ? {
                    top: '50%',
                    right: '50%',
                    x: '50%',
                    y: '-50%',
                    scale: 3,
                    zIndex: 9999
                } : {
                    top: '20px',
                    right: '20px',
                    x: 0,
                    y: 0,
                    scale: 1,
                    zIndex: 1000
                }
            }
            transition={{ duration: 1, type: "spring" }}
            className="absolute"
        >
            <div className="relative w-16 h-16 md:w-20 md:h-20 drop-shadow-xl">
                {/* Background Heart (Empty/Outline) */}
                <svg viewBox="0 0 24 24" className="w-full h-full overflow-visible absolute top-0 left-0 z-10">
                    <path
                        fill="transparent"
                        d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                        stroke="#ef4444"
                        strokeWidth="2"
                    />
                </svg>

                {/* Foreground Heart (Filled based on percentage) */}
                <motion.svg
                    viewBox="0 0 24 24"
                    className="w-full h-full text-red-600 absolute top-0 left-0 z-0"
                    style={{
                        clipPath: `inset(${100 - fillPercentage}% 0 0 0)`
                    }}
                    animate={isBlinking ? {
                        opacity: [1, 0.2, 1],
                        scale: [1, 1.1, 1]
                    } : {}}
                    transition={isBlinking ? {
                        duration: 0.5,
                        repeat: 4,
                    } : {}}
                >
                    <path
                        fill="currentColor"
                        d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                    />
                </motion.svg>

            </div>
        </motion.div>
    );
};

export default BigHeartProgress;
