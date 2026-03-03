import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, useScroll, useSpring } from 'framer-motion';
import PageWrapper from '../components/layout/PageWrapper';
import Footer from '../components/layout/Footer';
import styles from './ArticlePage.module.css';

// Mock data (in a real app, this would be fetched from a CMS or API)
const articlesData = {
    "the-art-of-void": {
        title: "The Art of Void",
        category: "Design",
        date: "Oct 2024",
        image: "https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?q=80&w=1400&auto=format&fit=crop",
        content: [
            "Emptiness is not the absence of design; it is the canvas upon which gravity is defined. In digital spaces, the 'void' provides the critical breathing room necessary for elements to exist with purpose and consequence.",
            "When we strip away the superfluous, we are left with the essence of interaction. The cinematic aesthetic we strive for relies heavily on deep, rich blacks and shadows to make the moments of light profound.",
            "QUOTE: \"Silence in design speaks louder than the noise of endless features.\"",
            "By harnessing darkness, we can guide the user's eye with laser precision. A subtle glow or a shifting gradient against a black backdrop holds far more weight than it would in a bright, cluttered interface. This is the core philosophy behind Karthikey Balaram."
        ]
    },
    "react-performance": {
        title: "React Performance",
        category: "Tech",
        date: "Nov 2024",
        image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1400&auto=format&fit=crop",
        content: [
            "Achieving a seamless 60 frames per second in a React application heavily laden with 3D elements and physics-based animations requires a strict adherence to performance best practices.",
            "We must constantly ask: 'Is this render necessary?' Utilizing useMemo and useCallback effectively, separating state that updates frequently from state that doesn't, and keeping the component tree shallow where possible are our primary weapons.",
            "QUOTE: \"Performance is a feature, not an afterthought.\"",
            "When combining React DOM with WebGL (via React Three Fiber), the bridge between the two realms must be carefully managed. Transferring data across this boundary is expensive, so keeping 3D logic self-contained within the canvas is crucial."
        ]
    },
    // Adding fallbacks/others
    "webgl-shaders": {
        title: "WebGL Shaders",
        category: "Graphics",
        date: "Dec 2024",
        image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1400&auto=format&fit=crop",
        content: [
            "Shaders are the secret to the cinematic feel. Writing custom GLSL code allows us to manipulate pixels at the GPU level, unlocking visual effects that are computationally impossible on the CPU alone.",
            "From the subtle noise overlays to the magnetic repulsion distortion, shaders give us raw, unadulterated power over the screen."
        ]
    },
    "antigravity-ux": {
        title: "Antigravity UX",
        category: "Theory",
        date: "Jan 2025",
        image: "https://images.unsplash.com/photo-1614730341194-75c60740a2d3?q=80&w=1400&auto=format&fit=crop",
        content: [
            "Interactions should feel natural, yet defying logic. When elements float off the grid or sway gently as if suspended in space, the interface ceases to be a static page and becomes an environment.",
            "This feeling of 'antigravity' breaks the rigidity of the web. It invites playfulness, discovery, and a deeper connection between the user and the digital material."
        ]
    }
};

const ArticlePage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [article, setArticle] = useState(null);

    // Reading Progress Bar Setup
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    useEffect(() => {
        // Simple fetch simulation based on ID (slug)
        const foundArticle = articlesData[id];
        if (foundArticle) {
            setArticle(foundArticle);
        } else {
            // Fallback for demo purposes if ID doesn't match
            setArticle(articlesData["the-art-of-void"]);
        }
    }, [id]);

    if (!article) return <PageWrapper><div style={{ minHeight: '100vh', background: 'var(--color-void)' }} /></PageWrapper>;

    return (
        <PageWrapper>
            {/* Reading Progress Indicator */}
            <motion.div className={styles.progressBar} style={{ scaleX }} />

            <article className={styles.articleContainer}>

                {/* Back Navigation */}
                <div className={styles.backButtonContainer}>
                    <button onClick={() => navigate('/articles')} className={styles.backButton}>
                        &larr; Back to Articles
                    </button>
                </div>

                {/* Article Header */}
                <header className={styles.articleHeader}>
                    <motion.span
                        className={styles.category}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        {article.category}
                    </motion.span>

                    <motion.h1
                        className={styles.title}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                    >
                        {article.title}
                    </motion.h1>

                    <motion.span
                        className={styles.date}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.5 }}
                    >
                        {article.date}
                    </motion.span>
                </header>

                {/* Hero Image / Parallax Banner */}
                {article.image && (
                    <motion.div
                        className={styles.heroImageContainer}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1, delay: 0.4 }}
                    >
                        <img src={article.image} alt={article.title} className={styles.heroImage} />
                    </motion.div>
                )}

                {/* Content Body */}
                <div className={styles.contentArea}>
                    {article.content.map((paragraph, idx) => {
                        // Check if it's a pull quote for special styling
                        if (paragraph.startsWith("QUOTE:")) {
                            const quoteText = paragraph.replace("QUOTE:", "").trim();
                            return (
                                <motion.blockquote
                                    key={idx}
                                    className={styles.pullQuote}
                                    initial={{ opacity: 0, x: -30 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true, margin: "-100px" }}
                                    transition={{ duration: 0.8 }}
                                >
                                    {quoteText}
                                </motion.blockquote>
                            );
                        }

                        // Regular paragraph
                        return (
                            <motion.p
                                key={idx}
                                className={styles.paragraph}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ duration: 0.6 }}
                            >
                                {paragraph}
                            </motion.p>
                        );
                    })}
                </div>
            </article>

            <Footer />
        </PageWrapper>
    );
};

export default ArticlePage;
