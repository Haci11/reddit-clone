import styles from "../styles/Home.module.scss";
import Content from "../components/content/Content";
import { useState } from "react";
import { useSession } from "next-auth/react";
import type { Session } from "../types/Interfaces";
import { useRouter } from "next/router";

export default function Home() {
  const { data: session }: { data: Session } = useSession() as {
    data: Session;
  };
  const [title, setTitle] = useState("");
  const router = useRouter();
  const createSubReddit = async () => {
    const res = await fetch("http://localhost:3000/api/subreddits", {
      method: "POST",
      body: JSON.stringify({ title }),
      headers: { "Content-Type": "application/json" },
    });
    const data = await res.json();
    router.replace("/" + data.id);
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
