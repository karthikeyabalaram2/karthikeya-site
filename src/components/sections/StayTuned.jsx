import React from 'react';
import { motion, useMotionTemplate, useMotionValue } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import styles from './StayTuned.module.css';

const articles = [
    { title: "The Art of Void", category: "Design", date: "Oct 2024" },
    { title: "React Performance", category: "Tech", date: "Nov 2024" },
    { title: "WebGL Shaders", category: "Graphics", date: "Dec 2024" },
    { title: "Antigravity UX", category: "Theory", date: "Jan 2025" },
];

const Card = ({ title, category, date, index }) => {
    let mouseX = useMotionValue(0);
    let mouseY = useMotionValue(0);
    const navigate = useNavigate();

    // Generate a simple slug from the title
    const slug = title.toLowerCase().replace(/ /g, '-');

    function handleMouseMove({ currentTarget, clientX, clientY }) {
        let { left, top } = currentTarget.getBoundingClientRect();
        mouseX.set(clientX - left);
        mouseY.set(clientY - top);
    }

    return (
        <motion.div
            className={styles.cardWrapper}
            onMouseMove={handleMouseMove}
            onClick={() => navigate(`/article/${slug}`)}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: index * 0.15 }}
        >
            <motion.div
                className={styles.spotlight}
                style={{
                    background: useMotionTemplate`
                        radial-gradient(
                            600px circle at ${mouseX}px ${mouseY}px,
                            rgba(47, 84, 235, 0.4),
                            transparent 40%
                        )
                    `
                }}
            />
            <div className={styles.cardContent}>
                <span className={styles.category}>{category}</span>
                <h3 className={styles.title}>{title}</h3>
                <span className={styles.date}>{date}</span>
                <button className={styles.readMore}>Read Article &rarr;</button>
            </div>
        </motion.div>
    );
};

const StayTuned = () => {
    return (
        <section className={styles.section}>
            <div className={styles.container}>
                <div className={styles.grid}>
                    {articles.map((article, i) => (
                        <Card key={i} index={i} {...article} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default StayTuned;
