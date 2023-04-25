import styles from "../styles/Home.module.scss";
import Content from "../components/content/Content";

export default function Home() {
  return (
    <div className={styles.container}>
      <Content />
    </div>
  );
}
