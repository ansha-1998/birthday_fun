import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

const QuestionCard = ({ question, onYes }) => {
    const [noBtnPosition, setNoBtnPosition] = useState({ x: 0, y: 0 });
    const [isHovered, setIsHovered] = useState(false);

    const [style, setStyle] = useState({});
    const noBtnRef = useRef(null);

    // Reset button state when question changes
    React.useEffect(() => {
        setNoBtnPosition({ x: 0, y: 0 });
        setStyle({});
    }, [question]);

    const moveNoButton = (e) => {
        const btn = noBtnRef.current;
        if (!btn) return;

        // Get current button dimensions/pos
        const rect = btn.getBoundingClientRect();

        // Current Mouse Pos
        const mouseX = e.clientX;
        const mouseY = e.clientY;

        // Calculate vector from mouse to button center
        const btnCenterX = rect.left + rect.width / 2;
        const btnCenterY = rect.top + rect.height / 2;

        let dirX = btnCenterX - mouseX;
        let dirY = btnCenterY - mouseY;

        // Normalize
        const length = Math.sqrt(dirX * dirX + dirY * dirY) || 1;

        // Slip distance (how far it runs)
        const slipDist = 200;

        // New move vector
        let moveX = (dirX / length) * slipDist;
        let moveY = (dirY / length) * slipDist;

        // Add slight randomness/jitter
        moveX += (Math.random() - 0.5) * 50;
        moveY += (Math.random() - 0.5) * 50;

        let newX = rect.left + moveX;
        let newY = rect.top + moveY;

        // Clamp to window bounds
        const padding = 20;
        const maxX = window.innerWidth - rect.width - padding;
        const maxY = window.innerHeight - rect.height - padding;

        // Simple wall bounce logic (if trying to go out, flip to other side of cursor or just clamp)
        // Clamping is safer
        newX = Math.min(Math.max(newX, padding), maxX);
        newY = Math.min(Math.max(newY, padding), maxY);

        // If it got trapped by cursor against wall, force a jump to center?
        // Let's just trust clamping for now, or maybe jump if distance is too small (caught)
        // (Optional refinement for later)

        setStyle({
            position: 'fixed',
            left: newX,
            top: newY,
        });

        // Reset old pos state just in case
        setNoBtnPosition({ x: 0, y: 0 });
    };

    return (
        <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white/30 backdrop-blur-md p-8 rounded-2xl shadow-xl max-w-md w-full text-center border-4 border-love-300 relative"
        >
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-love-300 via-love-500 to-love-300" />

            <div className="mb-8 flex justify-center">
                <div className="relative">
                    <Heart className="w-16 h-16 text-love-500 fill-love-100 animate-heartbeat" />
                    <motion.div
                        className="absolute -top-2 -right-2 text-love-400"
                        animate={{ y: -10, opacity: [0, 1, 0] }}
                        transition={{ repeat: Infinity, duration: 2 }}
                    >
                        <Heart size={20} fill="currentColor" />
                    </motion.div>
                </div>
            </div>

            <h2 className="text-3xl font-bold text-gray-800 mb-8 leading-tight font-[Inter]">
                {question}
            </h2>

            <div className="flex justify-center gap-8 relative z-10 min-h-[60px]">
                <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={onYes}
                    className="bg-love-500 hover:bg-love-600 text-white font-bold py-3 px-8 rounded-full shadow-lg transition-colors text-xl flex items-center gap-2"
                >
                    <Heart size={20} className="fill-current" />
                    Yes
                </motion.button>

                <motion.button
                    ref={noBtnRef}
                    animate={style.position === 'fixed' ? { left: style.left, top: style.top } : { x: 0 }}
                    style={style.position === 'fixed' ? { position: 'fixed', margin: 0 } : {}}
                    transition={{ type: "spring", stiffness: 200, damping: 20 }}
                    onMouseEnter={moveNoButton}
                    onTouchStart={moveNoButton}
                    onClick={moveNoButton}
                    className="bg-love-500 hover:bg-love-600 text-white font-bold py-3 px-8 rounded-full shadow-lg transition-colors text-xl flex items-center gap-2 z-50 whitespace-nowrap"
                >
                    <Heart size={20} className="fill-current" />
                    No
                </motion.button>
            </div>
        </motion.div>
    );
};

export default QuestionCard;
