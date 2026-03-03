import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import HeroGlobe from '../canvas/HeroGlobe';
import styles from './Hero.module.css';

const INTRO_DURATION = 5000; // ms – title reveals

// ── Module-level flag: persists across component re-mounts within the session
// First page load → runs full cinematic intro
// Navigating back to home → skips straight to the "after-intro" state
let hasSeenIntro = false;

const Hero = () => {
    const isFirstVisit = !hasSeenIntro;

    const [introComplete, setIntroComplete] = useState(!isFirstVisit);

    // ── Scroll-driven canvas fade ─────────────────────────────────────
    const { scrollY } = useScroll();
    const canvasOpacity = useTransform(scrollY, [0, 600], [1, 0]);
    const pointerEvents = useTransform(scrollY, [0, 600], ['auto', 'none']);
    const scrollIndicatorO = useTransform(scrollY, [0, 200], [1, 0]);

    // ── Cinematic intro effect (runs only once) ───────────────────────
    useEffect(() => {
        if (!isFirstVisit) {
            // Returning visit: ensure scroll is unlocked and state is clean
            window.__lenis?.start();
            return;
        }

        // Mark as seen so any future home navigation skips the intro
        hasSeenIntro = true;

        // Lock Lenis scroll
        const stopTimer = setTimeout(() => window.__lenis?.stop(), 50);

        // At 5s: unlock scroll and show content
        const introTimer = setTimeout(() => {
            window.__lenis?.start();
            setIntroComplete(true);
        }, INTRO_DURATION);

        return () => {
            clearTimeout(stopTimer);
            clearTimeout(introTimer);
            window.__lenis?.start();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <section className={styles.heroContainer}>

            {/* ── Video Canvas ─────────────────────────────────── */}
            <motion.div
                className={styles.canvasWrapper}
                style={introComplete
                    ? { opacity: canvasOpacity, pointerEvents }
                    : { opacity: 1, pointerEvents: 'none' }
                }
            >
                {/* On return visits, seek video to 6s so the cinematic open is skipped */}
                <HeroGlobe seekTo={isFirstVisit ? 0 : 6} />
            </motion.div>

            {/* ── Letterbox Bars (only on first visit) ─────────── */}
            {/* ── Letterbox Bars ─────────── */}
            <>
                <motion.div
                    className={`${styles.letterbox} ${styles.letterboxTop}`}
                    initial={{ y: 0 }}
                    animate={{ y: isFirstVisit ? '-100%' : '-100%' }}
                    transition={{ delay: 3.5, duration: 2, ease: [0.76, 0, 0.24, 1] }}
                />
                <motion.div
                    className={`${styles.letterbox} ${styles.letterboxBottom}`}
                    initial={{ y: 0 }}
                    animate={{ y: isFirstVisit ? '100%' : '100%' }}
                    transition={{ delay: 3.5, duration: 2, ease: [0.76, 0, 0.24, 1] }}
                />
            </>

            {/* ── Vignette ──────────────────────────────────────── */}
            <motion.div
                className={styles.vignette}
                initial={{ opacity: isFirstVisit ? 0 : 1 }}
                animate={{ opacity: introComplete ? 1 : 0 }}
                transition={{ duration: 2, ease: 'easeOut' }}
            />

            {/* ── Title + Tagline ───────────────────────────────── */}
            <motion.div
                className={styles.contentOverlay}
                initial={{ opacity: 0 }}
                animate={{ opacity: introComplete ? 1 : 0 }}
                transition={{ duration: isFirstVisit ? 0.5 : 0.1 }}
                style={{ pointerEvents: introComplete ? 'auto' : 'none' }}
            >
                <motion.span
                    className={styles.lastName}
                    initial={{ opacity: 0, y: isFirstVisit ? 50 : 10 }}
                    animate={{ opacity: introComplete ? 1 : 0, y: introComplete ? 0 : (isFirstVisit ? 50 : 10) }}
                    transition={{ duration: isFirstVisit ? 1.8 : 0.4, delay: isFirstVisit ? 0.25 : 0, ease: [0.16, 1, 0.3, 1] }}
                >
                    KARTHIKEYA
                </motion.span>

                <motion.p
                    className={styles.tagline}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: introComplete ? 1 : 0, y: introComplete ? 0 : 10 }}
                    transition={{ duration: isFirstVisit ? 1.4 : 0.4, delay: isFirstVisit ? 0.8 : 0 }}
                >
                    Where Finance meets Creativity!
                </motion.p>
            </motion.div>

            {/* ── Scroll Indicator ──────────────────────────────── */}
            <motion.div
                className={styles.scrollIndicator}
                initial={{ opacity: 0 }}
                animate={{ opacity: introComplete ? 1 : 0 }}
                transition={{ delay: isFirstVisit && introComplete ? 1.5 : (introComplete ? 0.3 : 0), duration: 1 }}
                style={{ opacity: scrollIndicatorO, pointerEvents: introComplete ? 'auto' : 'none' }}
            >
                <div className={styles.mouse} />
                <p>Scroll to Enter</p>
            </motion.div>

        </section>
    );
};

export default Hero;
