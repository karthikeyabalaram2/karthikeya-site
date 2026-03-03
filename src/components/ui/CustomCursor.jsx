import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import styles from './CustomCursor.module.css';

const CustomCursor = () => {
    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);

    // Smooth spring physics
    const springConfig = { damping: 25, stiffness: 700 };
    const cursorXSpring = useSpring(cursorX, springConfig);
    const cursorYSpring = useSpring(cursorY, springConfig);

    useEffect(() => {
        const moveCursor = (e) => {
            cursorX.set(e.clientX - 16); // Center the 32px cursor
            cursorY.set(e.clientY - 16);
        };

        window.addEventListener('mousemove', moveCursor);
        return () => window.removeEventListener('mousemove', moveCursor);
    }, [cursorX, cursorY]);

    return (
        <motion.div
            className={styles.cursor}
            style={{
                translateX: cursorXSpring,
                translateY: cursorYSpring
            }}
        />
    );
};

export default CustomCursor;
