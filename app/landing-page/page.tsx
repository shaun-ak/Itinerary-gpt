'use client'
import React from 'react'
import styles from './landing-page.module.scss'
import { poppins, montserrat } from '../fonts/fonts'
import Button from '@/components/Button/button'
import Link from 'next/link'
import TextCarousel from '@/components/text-carousel/text-carousel'

const LandingPage: React.FC = () => {
  const clickEvent = () => {
    console.log('clicked')
  }

  return (
    <>
      <div className={`${styles.container}`}>
        <div className={`${styles['top-container']}`}>
          <div className={poppins.className}>
            <div className={`${styles.hello}`}>
              <p className={`${styles['hola-text']}`}>
                Hola, from
                <span className={`${styles.gradient}`}>Itinerary-GPT</span>
              </p>
              <p className={`${styles.description}`}>want to try it out?</p>
              <div className={`${styles.button} ${montserrat.className}`}>
                <Link href='/gpt-utility'>
                  <Button text='Click here!' onClick={clickEvent} />
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className={`${styles['mid-container-1']}`}>
          <TextCarousel/>
        </div>
      </div>
    </>
  )
}

export default LandingPage
