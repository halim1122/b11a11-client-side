import React from 'react';
import FAQ from './FAQ';
import FeatureSection from './FeatureSection';
import Banner from './Banner';
import { Helmet } from 'react-helmet-async';
import FeaturedAssignments from './FeaturedAssignments';

const Home = () => {
     return (
          <div>
               <Helmet>
                         <title>
                              home
                         </title>
                    </Helmet>
          <Banner></Banner>
          <FeatureSection></FeatureSection>
          <FAQ></FAQ>
          <FeaturedAssignments></FeaturedAssignments>
          </div>
     );
};

export default Home;