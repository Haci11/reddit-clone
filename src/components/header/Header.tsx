import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { Session } from "../../types/Interfaces";
import styles from "./Header.module.scss";

const Header = () => {
  const { data: session }: { data: Session } = useSession() as {
    data: Session;
  };

  if (!session)
    return (
      <nav className={styles.nav}>
        <Link href="/" className={styles.nav_title}>
          reddit_clone{" "}
        </Link>

        <div className={styles.github}>
          <button className={styles.github__btn} onClick={() => signIn()}>
            Login
          </button>
        </div>
      </nav>
    );

  return (
    <nav className={styles.nav}>
      <Link href="/" className={styles.nav_title}>
        reddit_clone
      </Link>
      <div className={styles.github}>
        <img
          src={session?.user.image}
          className={styles.github__img}
          alt="Github Profile"
        />
        <h1 className={styles.github__name}> {session?.user.name}</h1>
        <div className={styles.dropdown}>
          <button className={styles.dropbtn}>
            Meny <i className="fa fa-caret-down"></i>
          </button>
          <div className={styles.dropdown_content}>
            <a onClick={() => signOut()}>Log Out</a>
          </div>
        </div>
      </div>
    </nav>
  );
};
export default Header;
