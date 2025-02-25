'use client'
import React, { useState, useEffect } from 'react'
import styles from './landing-page.module.scss'
import { poppins, montserrat } from '../fonts/fonts'
import Button from '@/components/Button/button'
import Link from 'next/link'
import TextCarousel from '@/components/text-carousel/text-carousel'
import { FaMapMarkedAlt, FaCalendarAlt, FaLightbulb, FaGlobe } from 'react-icons/fa'

const LandingPage: React.FC = () => {
  const [greetingIndex, setGreetingIndex] = useState(0)
  const [animationComplete, setAnimationComplete] = useState(false)
  const greetings = ['Bonjour', 'Ciao', 'Namaste', 'Hello']
  
  useEffect(() => {
    // Only continue cycling if we haven't reached the final greeting
    if (greetingIndex < greetings.length - 1) {
      const interval = setInterval(() => {
        setGreetingIndex((prevIndex) => {
          const nextIndex = prevIndex + 1;
          // If we're about to show the last greeting, set animation as complete after a delay
          if (nextIndex === greetings.length - 1) {
            setTimeout(() => {
              setAnimationComplete(true);
            }, 2000); // Wait 2 seconds after showing "Hello" before removing cursor
          }
          return nextIndex < greetings.length ? nextIndex : prevIndex;
        });
      }, 2000); // Change greeting every 2 seconds
      
      return () => clearInterval(interval);
    }
  }, [greetingIndex, greetings.length]);

  const clickEvent = () => {
    console.log('clicked')
  }

  return (
    <div className={`${styles.pageWrapper}`}>
      <div className={`${styles.container}`}>
        <div className={`${styles.content}`}>
          <div className={`${styles.header} ${poppins.className}`}>
            <p className={`${styles.greeting}`}>
              <span className={`${animationComplete ? styles.greetingFinal : styles.greetingAnimation}`}>
                {greetings[greetingIndex]}
              </span>
            </p>
            <h1 className={`${styles.title}`}>
              <span className={`${styles.gradient}`}>Itinerary</span>GPT
            </h1>
            <p className={`${styles.subtitle}`}>
              Your AI travel companion for <span className={`${styles.highlightText}`}>unforgettable journeys</span>
            </p>
          </div>
          
          <div className={`${styles.ctaContainer} ${montserrat.className}`}>
            <Link href='/gpt-utility'>
              <Button text='Start Planning Your Trip' onClick={clickEvent} />
            </Link>
          </div>
          
          <div className={`${styles.carouselWrapper}`}>
            <TextCarousel />
          </div>
          
          <div className={`${styles.scrollIndicator}`}>
            <div className={`${styles.mouse}`}></div>
            <p>Scroll to explore</p>
          </div>
        </div>
      </div>
      
      {/* Features Section */}
      <section className={`${styles.featuresSection}`}>
        <div className={`${styles.sectionContainer}`}>
          <h2 className={`${styles.sectionTitle}`}>Why Choose ItineraryGPT?</h2>
          
          <div className={`${styles.featuresGrid}`}>
            <div className={`${styles.featureCard}`}>
              <div className={`${styles.featureIcon}`}>
                <FaMapMarkedAlt />
              </div>
              <h3>Personalized Itineraries</h3>
              <p>Get custom travel plans tailored to your interests, budget, and schedule.</p>
            </div>
            
            <div className={`${styles.featureCard}`}>
              <div className={`${styles.featureIcon}`}>
                <FaCalendarAlt />
              </div>
              <h3>Day-by-Day Planning</h3>
              <p>Receive detailed daily schedules with activities, attractions, and dining recommendations.</p>
            </div>
            
            <div className={`${styles.featureCard}`}>
              <div className={`${styles.featureIcon}`}>
                <FaLightbulb />
              </div>
              <h3>Local Insights</h3>
              <p>Discover hidden gems and authentic experiences beyond typical tourist attractions.</p>
            </div>
            
            <div className={`${styles.featureCard}`}>
              <div className={`${styles.featureIcon}`}>
                <FaGlobe />
              </div>
              <h3>Global Destinations</h3>
              <p>Plan trips to any location worldwide with destination-specific recommendations.</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* About Section */}
      <section className={`${styles.aboutSection}`}>
        <div className={`${styles.sectionContainer}`}>
          <h2 className={`${styles.sectionTitle}`}>About ItineraryGPT</h2>
          
          <div className={`${styles.aboutContent}`}>
            <p>
              ItineraryGPT combines the power of artificial intelligence with travel expertise to create 
              personalized travel plans in seconds. Whether you're planning a weekend getaway or a month-long 
              adventure, our AI assistant helps you make the most of your journey.
            </p>
            <p>
              Simply tell ItineraryGPT about your destination, interests, and preferences, and receive a 
              comprehensive itinerary complete with daily activities, dining suggestions, and practical travel tips.
            </p>
            <div className={`${styles.aboutCta}`}>
              <Link href='/gpt-utility'>
                <Button text='Try It Now' onClick={clickEvent} animated={false} />
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      <footer className={`${styles.footer}`}>
        <p className={`${styles.footerText}`}>
          Developed by <a href="https://github.com/shaun-ak" className={`${styles.footerLink}`} target="_blank" rel="noopener noreferrer">@shaun-ak</a>
        </p>
      </footer>
    </div>
  )
}

export default LandingPage
