import { MdArrowBack } from "react-icons/md";
import styles from "./topNav.module.scss";
import Link from "next/link";


export default function TopNav() {
  return (
    <div className={styles.header}>
      <Link href="/landing-page">
        <div className={styles["back-arrow"]}><MdArrowBack size={30} /></div>
      </Link>
      <div className={styles.title}><p>ItineraryGPT</p></div>
    </div>
  );
}
