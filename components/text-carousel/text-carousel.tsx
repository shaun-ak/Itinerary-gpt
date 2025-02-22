// components/TextCarousel.js

import React, { useEffect, useRef, useState } from 'react'
import styles from './text-carousel.module.css'
import { cormorant } from '../../app/fonts/fonts'

const TextCarousel = () => {
  const carouselRef = useRef<HTMLDivElement>(null)
  const [isInView, setIsInView] = useState<boolean>(false)
  const [hasAnimated, setHasAnimated] = useState<boolean>(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
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
  }, [hasAnimated])

  useEffect(() => {
    const messages = carouselRef.current?.querySelectorAll<HTMLElement>(
      `.${styles.message}`
    )
    if (isInView) {
      messages?.forEach((message, index) => {
        message.style.animationPlayState = 'running'
      })

      const lastMessage = messages
        ? messages[messages?.length - 1]
        : new HTMLElement()
      lastMessage.onanimationend = () => {
        setHasAnimated(true)
      }
    } else {
      messages?.forEach(message => {
        message.style.animationPlayState = 'paused'
      })
    }
  }, [isInView])

  return (
    <div className={`${styles.carouselContainer} ${cormorant.className}`} ref={carouselRef}>
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
