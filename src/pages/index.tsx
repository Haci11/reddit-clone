import styles from "../styles/Home.module.scss";
import Header from "../components/header/Header";
import { useSession, signIn, signOut } from "next-auth/react";
import Content from "../components/content/Content";

export default function Home() {
  const { data: session } = useSession();

  return (
    <>
      <div className={styles.container}>
        <Content />
      </div>
    </>
  );
}
