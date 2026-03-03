import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import styles from './Footer.module.css';

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                <div className={styles.column}>
                    <h3 className={styles.heading}><Link to="/articles">Articles</Link></h3>
                    <ul className={styles.list}>
                        <li>The Art of Void</li>
                        <li>React Performance</li>
                        <li>Antigravity UX</li>
                    </ul>
                </div>

                <div className={styles.column}>
                    <h3 className={styles.heading}><Link to="/projects">Projects</Link></h3>
                    <ul className={styles.list}>
                        <li>Nebula OS</li>
                        <li>Quantized Type</li>
                        <li>Void Commerce</li>
                    </ul>
                </div>

                <div className={styles.column}>
                    <h3 className={styles.heading}><Link to="/gallery">Gallery</Link></h3>
                    <ul className={styles.list}>
                        <li>Parallax Exploration</li>
                        <li>Selected Works</li>
                        <li>Case Studies</li>
                    </ul>
                </div>

                <div className={styles.column}>
                    <h3 className={styles.heading}><Link to="/about">About Me</Link></h3>
                    <ul className={styles.list}>
                        <li>Background</li>
                        <li>Zero-Gravity Skills</li>
                        <li>Contact</li>
                    </ul>
                </div>
            </div>
            <div className={styles.bottomBar}>
                <p>&copy; {new Date().getFullYear()} Karthikey Balaram. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
