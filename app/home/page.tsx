import React from 'react';
import Hero from '../../components/Home/Hero'; 
import FAQ from '../../components/FAQ'; 

const HomePage: React.FC = () => {
  const onExploreCars = () => {
    
  };

  return (
    <div>
      <Hero onExploreCars={onExploreCars} />
      <FAQ />
    </div>
  );
};

export default HomePage;
