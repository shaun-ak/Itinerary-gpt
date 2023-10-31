import styles from "./page.module.css";
import Head from "next/head";
import AiChat from "@/pages/components/ai-chat/ai-chat";

export default function Home() {
  return (
      <div className={styles.container}>
        <Head>
          <title>Your Page Title</title>
        </Head>

        {/* Include the BottomInput component */}
        <AiChat/>
      </div>
  );
}
