import React from 'react';
import { motion } from 'framer-motion';

const Balloon = ({ delay, color, left }) => {
    // Randomize slight sway
    const sway = Math.random() * 20 - 10;

    return (
        <motion.div
            initial={{ y: "110vh", opacity: 0 }}
            animate={{
                y: "-20vh",
                opacity: [0, 0.4, 0.4, 0], // Subtle transparency
                x: [0, sway, 0, -sway, 0]
            }}
            transition={{
                duration: Math.random() * 15 + 20, // Very slow float
                repeat: Infinity,
                delay: delay,
                ease: "linear"
            }}
            className="absolute pointer-events-none z-0"
            style={{ left: left }}
        >
            <svg width="60" height="80" viewBox="0 0 50 70" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Balloon Body */}
                <ellipse cx="25" cy="30" rx="20" ry="25" fill={color} fillOpacity="0.4" />
                {/* Highlight */}
                <ellipse cx="18" cy="18" rx="5" ry="8" fill="white" fillOpacity="0.3" transform="rotate(-30 18 18)" />
                {/* String */}
                <path d="M25 55 Q25 65 25 70" stroke="white" strokeOpacity="0.3" strokeWidth="1" />
                {/* Knot */}
                <path d="M22 55 L28 55 L25 58 Z" fill={color} fillOpacity="0.4" />
            </svg>
        </motion.div>
    );
};

export default Balloon;
