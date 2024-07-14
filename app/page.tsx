import styles from "./page.module.scss";
import Head from 'next/head';
import AiChat from "@/components/ai-chat/ai-chat";
import LandingPage from "./landing-page/page";
import { roboto_mono } from "./fonts/fonts";

export default function Home() {
  return (
      <div className={styles.container}>
        <Head>
          <title>Your Page Title</title>
        </Head>

        {/* Include the BottomInput component */}
        <LandingPage/>
      </div>
  );
}
