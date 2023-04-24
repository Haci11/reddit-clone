import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { MyDataType, Session } from "../../types/Interfaces";
import styles from "./sidebar.module.scss";

const sidebar = () => {
  const { data: session }: { data: Session } = useSession() as {
    data: Session;
  };
  const [title, setTitle] = useState("");

  const router = useRouter();
  const createSubReddit = async () => {
    const res = await fetch("/api/subreddits", {
      method: "POST",
      body: JSON.stringify({ title }),
      headers: { "Content-Type": "application/json" },
    });
    const data = await res.json();
    router.replace("/" + data.id);
    console.log(data);
  };

  const { data, isLoading } = useQuery<MyDataType[]>({
    queryKey: ["subreddits"],
    queryFn: async () => {
      const response = await fetch("/api/subreddits");
      const data = await response.json();
      return data;
    },
  });

  return (
    <div className={styles.sidebar_container}>
      <div className={styles.sidebar}>
        <div>
          <h1 className={styles.title}>SubReddits</h1>
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
          <div className={styles.card}>
            {data?.map((subreddits) => (
              <Link
                key={subreddits.id}
                href="/[id]"
                as={`/${subreddits.id}`}
                className={styles.cards}>
                <p>{subreddits.title}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default sidebar;
