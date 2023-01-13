import styles from "../styles/Home.module.scss";
import Header from "../components/header/Header";
import { useSession, signIn, signOut } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();

  return (
    <>
      <div className={styles.container}>
        <Header />
        <h1>Welcome {session?.user?.name}</h1>
        <button onClick={() => signOut()}>Sign out</button>
      </div>
    </>
  );
}
