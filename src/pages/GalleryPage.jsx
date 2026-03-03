import React from 'react';
import Gallery from '../components/sections/Gallery';
import Footer from '../components/layout/Footer';
import PageWrapper from '../components/layout/PageWrapper';

import styles from './PageAesthetic.module.css';

const GalleryPage = () => {
    return (
        <PageWrapper>
            <div className={styles.pageContainer}>
                <div className={styles.massiveTextContainer}>
                    <h1 className={styles.massiveText}>GALLERY</h1>
                </div>
                <div>
                    <Gallery />
                </div>
            </div>
            <Footer />
        </PageWrapper>
    );
};

export default GalleryPage;
