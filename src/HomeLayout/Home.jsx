import React from 'react';
import FAQ from './FAQ';
import FeatureSection from './FeatureSection';
import Banner from './Banner';

const Home = () => {
     return (
          <div>
          <Banner></Banner>
          <FeatureSection></FeatureSection>
          <FAQ></FAQ>
          </div>
     );
};

export default Home;