import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart } from 'lucide-react';

const LegsAnimation = ({ isRunning }) => (
    <AnimatePresence>
        {isRunning && (
            <motion.div
                initial={{ opacity: 1, y: -20, scale: 0.5 }}
                animate={{ opacity: 1, y: 10, scale: 1 }}
                exit={{ opacity: 0, scale: 0 }}
                className="absolute top-[55%] left-1/2 -translate-x-1/2 -z-10 pointer-events-none"
            >
                <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <motion.path
                        d="M25 5 L25 45 L10 45"
                        stroke="black"
                        strokeWidth="4"
                        strokeLinecap="round"
                        fill="none"
                        initial={{ rotate: 0 }}
                        animate={{ rotate: [0, 30, -30, 0] }}
                        transition={{ duration: 0.3, repeat: Infinity, ease: "linear" }}
                        style={{ originX: "25px", originY: "5px" }}
                    />
                    <motion.path
                        d="M35 5 L35 45 L50 45"
                        stroke="black"
                        strokeWidth="4"
                        strokeLinecap="round"
                        fill="none"
                        initial={{ rotate: 0 }}
                        animate={{ rotate: [0, -30, 30, 0] }}
                        transition={{ duration: 0.3, repeat: Infinity, ease: "linear", delay: 0.15 }}
                        style={{ originX: "35px", originY: "5px" }}
                    />
                </svg>
            </motion.div>
        )}
    </AnimatePresence>
);

const QuestionCard = ({ question, onYes, isTrickQuestion }) => {
    // const isTrickQuestion = index === 1; // Handled by prop now
    const [noBtnPosition, setNoBtnPosition] = useState({ x: 0, y: 0 });
    const [isHovered, setIsHovered] = useState(false);

    const [style, setStyle] = useState({});
    const [isRunning, setIsRunning] = useState(false);
    const noBtnRef = useRef(null);

    // Reset button state when question changes
    React.useEffect(() => {
        setNoBtnPosition({ x: 0, y: 0 });
        setStyle({});
    }, [question]);

    const moveNoButton = (e) => {
        setIsRunning(true);
        // Keep legs running a bit longer
        setTimeout(() => setIsRunning(false), 1000);

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

    const getFontSize = (text) => {
        const len = text?.length || 0;
        if (len < 20) return "text-5xl md:text-7xl";
        if (len < 40) return "text-4xl md:text-6xl";
        return "text-3xl md:text-5xl";
    };

    return (
        <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-5xl w-full text-center relative z-20"
        >
            {/* Removed internal decoration, using main background */}

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

            <h2 className={`${getFontSize(question)} font-bold text-white mb-20 leading-tight drop-shadow-lg transition-all duration-300`} style={{ fontFamily: 'Great Vibes, cursive' }}>
                {question}
            </h2>

            <div className="flex justify-center gap-[200px] relative z-10 min-h-[80px]">
                {/* YES BUTTON */}
                <motion.button
                    // Logic: If trick question, this button runs away. Otherwise standard.
                    {...(isTrickQuestion ? {
                        key: `yes-btn-trick-${question}`,
                        ref: noBtnRef, // Use the running ref
                        animate: style.position === 'fixed' ? { left: style.left, top: style.top } : { x: 0 },
                        style: style.position === 'fixed' ? { position: 'fixed', margin: 0 } : {},
                        transition: { type: "spring", stiffness: 200, damping: 20 },
                        onMouseEnter: moveNoButton,
                        onTouchStart: moveNoButton,
                        onClick: moveNoButton,
                        className: "bg-love-500 hover:bg-love-600 text-white font-bold py-3 px-8 rounded-full shadow-lg transition-colors text-xl flex items-center gap-2 z-50 whitespace-nowrap relative overflow-visible"
                    } : {
                        whileHover: { scale: 1.1 },
                        whileTap: { scale: 0.95 },
                        onClick: onYes,
                        className: "bg-love-500 hover:bg-love-600 text-white font-bold py-3 px-8 rounded-full shadow-lg transition-colors text-xl flex items-center gap-2"
                    })}
                >
                    {isTrickQuestion && <LegsAnimation isRunning={isRunning} />}
                    <Heart size={20} className="fill-current" />
                    Yes
                </motion.button>

                {/* NO BUTTON */}
                <motion.button
                    {...(isTrickQuestion ? {
                        // If trick question, this button acts as the "Yes" (safe) button
                        whileHover: { scale: 1.1 },
                        whileTap: { scale: 0.95 },
                        onClick: onYes, // Proceed to next
                        className: "bg-love-500 hover:bg-love-600 text-white font-bold py-3 px-8 rounded-full shadow-lg transition-colors text-xl flex items-center gap-2"
                    } : {
                        // Otherwise, this is the running button
                        key: `no-btn-${question}`,
                        ref: noBtnRef,
                        animate: style.position === 'fixed' ? { left: style.left, top: style.top } : { x: 0 },
                        style: style.position === 'fixed' ? { position: 'fixed', margin: 0 } : {},
                        transition: { type: "spring", stiffness: 200, damping: 20 },
                        onMouseEnter: moveNoButton,
                        onTouchStart: moveNoButton,
                        onClick: moveNoButton,
                        className: "bg-love-500 hover:bg-love-600 text-white font-bold py-3 px-8 rounded-full shadow-lg transition-colors text-xl flex items-center gap-2 z-50 whitespace-nowrap relative overflow-visible"
                    })}
                >
                    {!isTrickQuestion && <LegsAnimation isRunning={isRunning} />}
                    <Heart size={20} className="fill-current" />
                    No
                </motion.button>
            </div>
        </motion.div>
    );
};

export default QuestionCard;
