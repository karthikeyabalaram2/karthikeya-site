import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './Header.module.css';

const NAV_LINKS = [
    { to: '/about', label: 'About' },
    { to: '/projects', label: 'Projects' },
    { to: '/articles', label: 'Articles' },
    { to: '/gallery', label: 'Gallery' },
];

const Header = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const location = useLocation();

    const closeMenu = () => setMenuOpen(false);

    return (
        <>
            <motion.header
                className={styles.header}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 5.5, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            >
                {/* Logo */}
                <div className={styles.logo}>
                    <Link to="/" onClick={closeMenu}>K.B.</Link>
                </div>

                {/* Desktop nav */}
                <nav className={styles.nav}>
                    {NAV_LINKS.map(({ to, label }) => (
                        <Link
                            key={to}
                            to={to}
                            className={location.pathname === to ? styles.navLinkActive : styles.navLink}
                        >
                            {label}
                        </Link>
                    ))}
                </nav>

                {/* Hamburger button – mobile only */}
                <button
                    className={styles.hamburger}
                    onClick={() => setMenuOpen(o => !o)}
                    aria-label={menuOpen ? 'Close menu' : 'Open menu'}
                >
                    <span className={`${styles.bar} ${menuOpen ? styles.barTop : ''}`} />
                    <span className={`${styles.bar} ${menuOpen ? styles.barMid : ''}`} />
                    <span className={`${styles.bar} ${menuOpen ? styles.barBot : ''}`} />
                </button>
            </motion.header>

            {/* Full-screen mobile menu overlay */}
            <AnimatePresence>
                {menuOpen && (
                    <motion.div
                        className={styles.mobileOverlay}
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <nav className={styles.mobileNav}>
                            {NAV_LINKS.map(({ to, label }, i) => (
                                <motion.div
                                    key={to}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.07, duration: 0.4 }}
                                >
                                    <Link
                                        to={to}
                                        className={styles.mobileNavLink}
                                        onClick={closeMenu}
                                    >
                                        <span className={styles.mobileNavNum}>0{i + 1}</span>
                                        {label}
                                    </Link>
                                </motion.div>
                            ))}
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default Header;
