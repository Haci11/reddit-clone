import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { Session } from "../../types/Interfaces";
import styles from "./Header.module.scss";
import Logo from "../../assets/redditlogoo.png";
import Image from "next/image";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
const Header = () => {
  const { data: session }: { data: Session } = useSession() as {
    data: Session;
  };

  if (!session)
    return (
      <nav className={styles.nav}>
        <Link href="/" className={styles.nav_title}>
          <Image src={Logo} alt="aa" /> Reddit-Clone
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
        <Image src={Logo} alt="aa" /> Reddit-Clone
      </Link>
      <div className={styles.github}>
        <div className={styles.dropdown}>
          <button className={styles.dropbtn}>
            <div className={styles.dropinfo}>
              <img
                src={session?.user.image}
                className={styles.github__img}
                alt="Github Profile"
              />
              <h3 className={styles.github__name}> {session?.user.name}</h3>
            </div>
            <MdOutlineKeyboardArrowDown />
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
