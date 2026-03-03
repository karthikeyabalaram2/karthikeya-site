import React from 'react';
import { motion } from 'framer-motion';
import styles from './About.module.css';

const skills = [
    "React", "Three.js", "WebGL", "UX Design",
    "Node.js", "Motion", "Shader", "Creative Dev"
];

const floatVariant = (i) => ({
    animate: {
        y: [0, -20, 0],
        x: [0, 10, 0],
        rotate: [0, 5, -5, 0],
        transition: {
            duration: 5 + Math.random() * 3,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.5,
        },
    },
});

const About = () => {
    return (
        <section className={styles.aboutSection}>
            <div className={styles.container}>
                {/* Visual Side (Profile) */}
                <div className={styles.profileSide}>
                    <motion.div
                        className={styles.profileImage}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1 }}
                    >
                        {/* Placeholder for Profile */}
                        <div className={styles.placeholderProfile} />
                    </motion.div>
                </div>

                {/* Content Side (Zero Gravity Cluster) */}
                <div className={styles.contentSide}>
                    <motion.p
                        className={styles.bio}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 0.8, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        I craft digital experiences that defy gravity. Blending technical precision with cinematic aesthetics to create webs that feel alive.
                    </motion.p>

                    {/* The Cluster */}
                    <div className={styles.cluster}>
                        {skills.map((skill, i) => (
                            <motion.div
                                key={skill}
                                className={styles.skillBox}
                                custom={i}
                                variants={floatVariant(i)}
                                animate="animate"
                                whileHover={{
                                    scale: 1.1,
                                    boxShadow: "0 0 20px rgba(47, 84, 235, 0.6)",
                                    zIndex: 10
                                }}
                            >
                                {skill}
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
