import React from 'react';
import About from '../components/sections/About';
import Footer from '../components/layout/Footer';
import PageWrapper from '../components/layout/PageWrapper';

import styles from './PageAesthetic.module.css';

const AboutPage = () => {
    return (
        <PageWrapper>
            <div className={styles.pageContainer}>
                <div className={styles.massiveTextContainer}>
                    <h1 className={styles.massiveText}>ABOUT ME</h1>
                </div>
                <div>
                    <About />
                </div>
            </div>
            <Footer />
        </PageWrapper>
    );
};

export default AboutPage;
