import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import styles from './Gallery.module.css';

const images = [
    "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1614850523296-6313d42f6368?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1614730341194-75c60740a2d3?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1618172193763-c511deb635ca?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1000&auto=format&fit=crop",
];

const Gallery = () => {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const yColumn1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
    const yColumn2 = useTransform(scrollYProgress, [0, 1], [0, -250]); // Faster
    const yColumn3 = useTransform(scrollYProgress, [0, 1], [0, -50]); // Slower

    return (
        <section ref={containerRef} className={styles.gallerySection}>

            <div className={styles.masonryGrid}>
                {/* Column 1 */}
                <motion.div className={styles.column} style={{ y: yColumn1 }}>
                    <motion.div
                        className={styles.imageItem}
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 0.8, delay: 0.1 }}
                    >
                        <img src={images[0]} alt="Work 1" />
                    </motion.div>
                    <motion.div
                        className={styles.imageItem}
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        <img src={images[3]} alt="Work 4" />
                    </motion.div>
                </motion.div>

                {/* Column 2 (Center - Faster) */}
                <motion.div className={styles.column} style={{ y: yColumn2 }}>
                    <motion.div
                        className={styles.imageItem}
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                    >
                        <img src={images[1]} alt="Work 2" />
                    </motion.div>
                    <motion.div
                        className={styles.imageItem}
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                    >
                        <img src={images[4]} alt="Work 5" />
                    </motion.div>
                    <motion.div
                        className={styles.imageItem}
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 0.8, delay: 0.5 }}
                    >
                        <img src={images[0]} alt="Work 6" />
                    </motion.div>
                </motion.div>

                {/* Column 3 */}
                <motion.div className={styles.column} style={{ y: yColumn3 }}>
                    <motion.div
                        className={styles.imageItem}
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        <img src={images[2]} alt="Work 3" />
                    </motion.div>
                    <motion.div
                        className={styles.imageItem}
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                    >
                        <img src={images[5]} alt="Work 6" />
                    </motion.div>
                </motion.div>
            </div>

            {/* Tilt-shift Blur Overlay at top/bottom of section is handled by global mask or specific overlays? 
                Let's add a gradient mask at the bottom for smooth exit */}
            <div className={styles.bottomMask} />
        </section>
    );
};

export default Gallery;
