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
        Ready to create unforgettable travel memories? ✨
      </p>
      <p className={`${styles.message}`}>
        Dreaming of the perfect family getaway? 🌟
      </p>
      <p className={`${styles.message}`}>
        Want to plan an amazing adventure with friends? 🌍
      </p>
      <p
        className={`${styles.message} ${hasAnimated ? styles.lastMessage : ''}`}
      >
        Let ItineraryGPT be your personal travel planner! 🎯
      </p>
    </div>
  )
}

export default TextCarousel
