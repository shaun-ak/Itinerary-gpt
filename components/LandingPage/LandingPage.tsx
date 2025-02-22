import React from 'react';
import styles from './LandingPage.module.scss'; // Assuming you have a module for styles

const LandingPage = () => {
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Hola, from Itinerary-GPT</h1>
            <p className={styles.subtitle}>Want to try it out? Click here!</p>
            <button className={styles.button}>Get Started</button>
            <p className={styles.description}>Let ItineraryGPT be your personal travel planner! 🎯</p>
        </div>
    );
};

export default LandingPage; 