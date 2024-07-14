"use client";
import React from "react";
import styles from "./landing-page.module.scss"
import { poppins,montserrat } from "../fonts/fonts";
import Button from "@/components/Button/button";

const LandingPage: React.FC = () => {

  return (<>
    <div className={`${styles["top-container"]}`}>
      <div className={poppins.className}>
        <div className={`${styles.hello}`}>
          <p className={`${styles["hola-text"]}`}>Hola, from <span className={`${styles.gradient}`}>Itinerary-GPT</span></p>
          <p className={`${styles.description}`}>want to try it out?</p>
          <div className={`${styles.button} ${montserrat.className}`}>
            <Button text="Click here!" onClick={() => console.log("clicked")
            } /></div>
        </div>
      </div>
    </div>
  </>);
};

export default LandingPage;
