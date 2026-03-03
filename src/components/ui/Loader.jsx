import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './Loader.module.css';

const Loader = ({ finishLoading }) => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(interval);
                    // Small delay after hitting 100% before transition triggers complete
                    setTimeout(finishLoading, 600);
                    return 100;
                }
                // To reach 100% smoothly over exactly 4 seconds (4000ms):
                // If we run every 40ms, that's 100 ticks.
                // 100 ticks * 1% increment = 100%
                return Math.min(prev + 1, 100);
            });
        }, 40); // 40ms interval for smooth 4s load

        return () => clearInterval(interval);
    }, [finishLoading]);

    return (
        <motion.div
            className={styles.loaderContainer}
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, y: -50, scale: 0.98 }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
        /* Cinematic slide-up ease out */
        >
            <div className={styles.topLeft}>
                <p>Initializing<br /><span>system assets...</span></p>
            </div>

            <div className={styles.topRight}>
                {progress}%
            </div>

            <div className={styles.centerContent}>
                <h1 className={styles.logoText}>KARTHIKEYA</h1>
            </div>

            <div className={styles.bottomSection}>
                <div className={styles.barContainer}>
                    <div className={styles.bar} style={{ width: `${progress}%` }}></div>
                </div>
                <div className={styles.footerLabels}>
                    <span>Finance Initialisation</span>
                    <span>Engineering Alpha</span>
                    <span>System Online</span>
                </div>
            </div>
        </motion.div>
    );
};

export default Loader;
