import React from 'react';
import Hero from '../components/sections/Hero';
import StarPath from '../components/sections/StarPath';
import Footer from '../components/layout/Footer';
import PageWrapper from '../components/layout/PageWrapper';

const Home = () => {
    return (
        <PageWrapper>
            <Hero />
            <StarPath />
            <Footer />
        </PageWrapper>
    );
};

export default Home;
