import styles from "../styles/Home.module.scss";
import Content from "../components/content/Content";
import { useState } from "react";
import { useSession } from "next-auth/react";

interface Session {
  user: {
    name: string;
    image: string;
    email: string;
  };
}

export default function Home() {
  const { data: session }: { data: Session } = useSession() as {
    data: Session;
  };
  const [title, setTitle] = useState("");

  const createSubReddit = async () => {
    const res = await fetch("http://localhost:3000/api/subreddits", {
      method: "POST",
      body: JSON.stringify({ title }),
      headers: { "Content-Type": "application/json" },
    });
    const data = await res.json();
    console.log(data);
  };
  return (
    <>
      <div className={styles.container}>
        <Content />

        {session && (
          <div className={styles.form}>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <button onClick={() => createSubReddit()}>
              Create a subreddit
            </button>
          </div>
        )}
      </div>
    </>
  );
}
