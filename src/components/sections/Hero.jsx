import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import HeroGlobe from '../canvas/HeroGlobe';
import styles from './Hero.module.css';

const INTRO_DURATION = 5000; // ms – title reveals
const LETTERBOX_RETRACT = 4000; // ms – bars start sliding

// ── Module-level flag: persists across component re-mounts within the session
// First page load → runs full cinematic intro
// Navigating back to home → skips straight to the "after-intro" state
let hasSeenIntro = false;

const Hero = () => {
    const isFirstVisit = !hasSeenIntro;

    const [letterboxVisible, setLetterboxVisible] = useState(isFirstVisit);
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

        // Start retracting the letterbox bars at 4s
        const barTimer = setTimeout(() => setLetterboxVisible(false), LETTERBOX_RETRACT);

        // At 5s: unlock scroll and show content
        const introTimer = setTimeout(() => {
            window.__lenis?.start();
            setIntroComplete(true);
        }, INTRO_DURATION);

        return () => {
            clearTimeout(stopTimer);
            clearTimeout(barTimer);
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
            <AnimatePresence>
                {letterboxVisible && (
                    <motion.div
                        key="lb-top"
                        className={`${styles.letterbox} ${styles.letterboxTop}`}
                        initial={{ y: 0, opacity: 1 }}
                        exit={{ y: '-100%', opacity: 0 }}
                        transition={{ duration: 1.4, ease: [0.76, 0, 0.24, 1] }}
                    />
                )}
            </AnimatePresence>
            <AnimatePresence>
                {letterboxVisible && (
                    <motion.div
                        key="lb-bottom"
                        className={`${styles.letterbox} ${styles.letterboxBottom}`}
                        initial={{ y: 0, opacity: 1 }}
                        exit={{ y: '100%', opacity: 0 }}
                        transition={{ duration: 1.4, ease: [0.76, 0, 0.24, 1] }}
                    />
                )}
            </AnimatePresence>

            {/* ── Vignette ──────────────────────────────────────── */}
            <motion.div
                className={styles.vignette}
                initial={{ opacity: isFirstVisit ? 0 : 1 }}
                animate={{ opacity: introComplete ? 1 : 0 }}
                transition={{ duration: 2, ease: 'easeOut' }}
            />

            {/* ── Title + Tagline ───────────────────────────────── */}
            <AnimatePresence>
                {introComplete && (
                    <motion.div
                        key="content"
                        className={styles.contentOverlay}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: isFirstVisit ? 0.5 : 0.1 }}
                    >
                        <motion.span
                            className={styles.firstName}
                            initial={{ opacity: 0, y: 20, letterSpacing: '16px' }}
                            animate={{ opacity: 1, y: 0, letterSpacing: '3px' }}
                            transition={{ duration: isFirstVisit ? 1.8 : 0.4, ease: [0.16, 1, 0.3, 1] }}
                        >
                            
                        </motion.span>

                        <motion.span
                            className={styles.lastName}
                            initial={{ opacity: 0, y: isFirstVisit ? 50 : 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: isFirstVisit ? 1.8 : 0.4, delay: isFirstVisit ? 0.25 : 0, ease: [0.16, 1, 0.3, 1] }}
                        >
                            KARTHIKEYA
                        </motion.span>

                        <motion.p
                            className={styles.tagline}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: isFirstVisit ? 1.4 : 0.4, delay: isFirstVisit ? 0.8 : 0 }}
                        >
                            Where Finance meets Creativity!
                        </motion.p>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* ── Scroll Indicator ──────────────────────────────── */}
            <AnimatePresence>
                {introComplete && (
                    <motion.div
                        key="scroll-hint"
                        className={styles.scrollIndicator}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ delay: isFirstVisit ? 1.5 : 0.3, duration: 1 }}
                        style={{ opacity: scrollIndicatorO }}
                    >
                        <div className={styles.mouse} />
                        <p>Scroll to Enter</p>
                    </motion.div>
                )}
            </AnimatePresence>

        </section>
    );
};

export default Hero;
