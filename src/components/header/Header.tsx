import { signIn, signOut, useSession } from "next-auth/react";
import styles from "./Header.module.scss";

interface Session {
  user: {
    name: string;
    image: string;
    email: string;
  };
}
const Header = () => {
  const { data: session }: { data: Session } = useSession() as {
    data: Session;
  };

  if (!session)
    return (
      <nav className={styles.nav}>
        <div>reddit_clone</div>
        <div className={styles.github}>
          <button className={styles.github__btn} onClick={() => signIn()}>
            Login
          </button>
        </div>
      </nav>
    );

  return (
    <nav className={styles.nav}>
      <div>reddit_clone</div>
      <div className={styles.github}>
        <img
          src={session?.user.image}
          className={styles.github__img}
          alt="Github Profile"
        />
        <h1 className={styles.github__name}> {session?.user.name}</h1>
        <div className={styles.dropdown}>
          <button className={styles.dropbtn}>
            Dropdown
            <i className="fa fa-caret-down"></i>
          </button>
          <div className={styles.dropdown_content}>
            <a href="#">Link 1</a>
            <a href="#">Link 2</a>
            <a onClick={() => signOut()}>Log Out</a>
          </div>
        </div>
      </div>
    </nav>
  );
};
export default Header;
