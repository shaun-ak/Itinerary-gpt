// components/TextCarousel.js

import React, { useEffect, useRef, useState } from 'react'
import styles from './text-carousel.module.css'
import { kalnia } from '../../app/fonts/fonts'

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
      messages?.forEach(message => {
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
    <div className={`${styles.carouselContainer} ${kalnia.className}`} ref={carouselRef}>
      <p className={`${styles.message}`}>
        Planning to go on a holiday with your parents?
      </p>
      <p className={`${styles.message}`}>
        Planning a long weekend with friends?
      </p>
      <p className={`${styles.message}`}>
        Planning a vacation with your partner?
      </p>
      <p
        className={`${styles.message} ${hasAnimated ? styles.lastMessage : ''}`}
      >
        Let ItineraryGPT help you in planning your Itinerary
      </p>
    </div>
  )
}

export default TextCarousel
