import React from 'react';
import StayTuned from '../components/sections/StayTuned';
import Footer from '../components/layout/Footer';
import PageWrapper from '../components/layout/PageWrapper';

import styles from './PageAesthetic.module.css';

const ArticlesPage = () => {
    return (
        <PageWrapper>
            <div className={styles.pageContainer}>
                <div className={styles.massiveTextContainer}>
                    <h1 className={styles.massiveText}>ARTICLES</h1>
                </div>
                <div>
                    <StayTuned />
                </div>
            </div>
            <Footer />
        </PageWrapper>
    );
};

export default ArticlesPage;
