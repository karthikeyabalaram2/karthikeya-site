import React from 'react';
import { motion } from 'framer-motion';
import styles from './Projects.module.css';

// Placeholder colorful images matching the vibe of the reference
const projectsData = [
    {
        id: "1",
        title: "Nebula OS",
        description: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem",
        image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=600&auto=format&fit=crop",
        rotation: -5
    },
    {
        id: "2",
        title: "Quantized Typography",
        description: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem",
        image: "https://images.unsplash.com/photo-1614850523296-6313d42f6368?q=80&w=600&auto=format&fit=crop",
        rotation: 3
    },
    {
        id: "3",
        title: "Void Commerce",
        description: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem",
        image: "https://images.unsplash.com/photo-1614730341194-75c60740a2d3?q=80&w=600&auto=format&fit=crop",
        rotation: -2
    }
];

const Projects = () => {
    return (
        <section className={styles.section}>
            <div className={styles.container}>

                {/* Massive Top Text */}
                <div className={styles.massiveTextContainer}>
                    <h1 className={styles.massiveText}>PROJECTS</h1>
                </div>

                {/* 3 Column Grid */}
                <div className={styles.grid}>
                    {projectsData.map((project, index) => (
                        <motion.div
                            key={project.id}
                            className={styles.card}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.8, delay: index * 0.2 }}
                        >
                            <div className={styles.imageContainer}>
                                <motion.img
                                    src={project.image}
                                    alt={project.title}
                                    className={styles.image}
                                    style={{ rotate: project.rotation }}
                                    whileHover={{ scale: 1.05, rotate: 0 }}
                                    transition={{ duration: 0.5, ease: "easeOut" }}
                                />
                                <div className={styles.numberOverlay}>{project.id}</div>
                            </div>
                            <div className={styles.content}>
                                {/* Using the description from the image mockup */}
                                <p className={styles.description}>{project.description}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>

            </div>
        </section>
    );
};

export default Projects;
