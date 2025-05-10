// components/Home/Hero
"use client";
import React from 'react';
import styles from './Hero.module.css';

interface HeroProps {
  onExploreCars: () => void; // Function to scroll to cars
}

function Hero({ onExploreCars }: HeroProps) {
  return (
    <div className={styles.heroContainer}>
      <div className={styles.heroText}>
        <h2 className={styles.heroTitle}>
          <pre><span>URide — Your Journey, Your Rules</span></pre>
          <pre><span>Rent</span></pre>
          <pre><span>Ride</span></pre>
          <pre><span>Repeat</span></pre>

        </h2>
        <h3 className={styles.heroSubtitle}>
          Drive your journey by selecting from our exclusive fleet of premium cars.
        </h3>
        <button className={styles.heroButton} onClick={onExploreCars}>
          Explore Cars
        </button>
      </div>
    </div>
  );
}

export default Hero;
