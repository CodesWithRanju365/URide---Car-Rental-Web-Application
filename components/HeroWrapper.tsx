"use client";

import Hero from '../components/Home/Hero';

export default function HeroWrapper() {
  const handleExploreCars = () => {
    console.log('Explore Cars clicked!');
  
  };

  return <Hero onExploreCars={handleExploreCars} />;
}
