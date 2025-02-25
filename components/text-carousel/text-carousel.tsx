// components/TextCarousel.js

import React, { useEffect, useRef, useState } from 'react'
import styles from './text-carousel.module.css'
import { montserrat } from '../../app/fonts/fonts'
import { FaPlaneDeparture, FaMapMarkedAlt, FaMapPin } from 'react-icons/fa'

const TextCarousel = () => {
  const carouselRef = useRef<HTMLDivElement>(null)
  const [isInView, setIsInView] = useState<boolean>(false)
  const [hasAnimated, setHasAnimated] = useState<boolean>(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
        } else {
          setIsInView(false)
        }
      },
      { threshold: 0.5 }
    )

    if (carouselRef.current) {
      observer.observe(carouselRef.current)
    }

    return () => {
      if (carouselRef.current) {
        observer.unobserve(carouselRef.current)
      }
    }
  }, [])

  useEffect(() => {
    const messages = carouselRef.current?.querySelectorAll<HTMLElement>(
      `.${styles.message}`
    )
    if (isInView) {
      messages?.forEach((message, index) => {
        message.style.animationPlayState = 'running'
      })

      // Only set hasAnimated when the last message animation ends
      const lastMessage = messages
        ? messages[messages?.length - 1]
        : null
        
      if (lastMessage) {
        lastMessage.addEventListener('animationend', () => {
          setHasAnimated(true)
        }, { once: true })
      }
    } else {
      messages?.forEach(message => {
        message.style.animationPlayState = 'paused'
      })
    }
  }, [isInView])

  // We're removing the reset animations functionality
  // to keep the last message visible permanently

  return (
    <div className={`${styles.carouselContainer} ${montserrat.className}`} ref={carouselRef}>
      {/* Icons */}
      <FaPlaneDeparture className={`${styles.icon} ${styles.planeIcon}`} />
      <FaMapMarkedAlt className={`${styles.icon} ${styles.mapIcon}`} />
      <FaMapPin className={`${styles.icon} ${styles.destinationIcon}`} />
      
      <p className={`${styles.message}`}>
        <span className={styles.highlight}>Discover</span> hidden gems and local favorites in any destination ✨
      </p>
      <p className={`${styles.message}`}>
        <span className={styles.highlight}>Create</span> personalized itineraries tailored to your interests 🌟
      </p>
      <p className={`${styles.message}`}>
        <span className={styles.highlight}>Experience</span> stress-free travel planning for solo trips or group adventures 🌍
      </p>
      <p
        className={`${styles.message} ${hasAnimated ? styles.lastMessage : ''}`}
      >
        Your <span className={styles.highlight}>perfect journey</span> is just a conversation away! 🎯
      </p>
    </div>
  )
}

export default TextCarousel
