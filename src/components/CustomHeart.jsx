import React from 'react';
import { motion } from 'framer-motion';

const CustomHeart = ({ delay, style }) => (
    <motion.div
        initial={{ y: "100vh", opacity: 0, scale: 0.5 }}
        animate={{
            y: "-100vh",
            opacity: [0, 0.8, 0.8, 0], // Slightly more visible
            scale: [0.5, 1, 0.5],
            x: [0, Math.random() * 50 - 25, 0]
        }}
        transition={{
            duration: Math.random() * 10 + 10, // Slower float
            repeat: Infinity,
            delay: delay,
            ease: "linear"
        }}
        className="absolute pointer-events-none z-0"
        style={{ ...style }}
    >
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M19.5 12.572l-7.5 7.428l-7.5 -7.428a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572"
                stroke="rgba(244, 63, 94, 0.6)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    </motion.div>
);

export default CustomHeart;
