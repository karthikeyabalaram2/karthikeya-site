import React from 'react';
import Projects from '../components/sections/Projects';
import Footer from '../components/layout/Footer';
import PageWrapper from '../components/layout/PageWrapper';

const ProjectsPage = () => {
    return (
        <PageWrapper>
            <div style={{ paddingTop: '80px', paddingBottom: '200px', minHeight: '100vh' }}>
                <Projects />
            </div>
            <Footer />
        </PageWrapper>
    );
};

export default ProjectsPage;
