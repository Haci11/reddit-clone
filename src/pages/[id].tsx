import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import styles from "../styles/Home.module.scss";

interface Session {
  user: {
    name: string;
    image: string;
    email: string;
  };
}
interface MyDataType {
  id: string;
  posts: [{ title: string; body: string; id: string }];
}

const Id = () => {
  const { data: session }: { data: Session } = useSession() as {
    data: Session;
  };
  const router = useRouter();
  const { id } = router.query;
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState<MyDataType | null>(null);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const createPost = async () => {
    const res = await fetch(
      `http://localhost:3000/api/subreddits/${id}/posts`,
      {
        method: "POST",
        body: JSON.stringify({ title, body, subredditId: id }),
        headers: { "Content-Type": "application/json" },
      }
    );
    console.log(res);

    const data = await res.json();
    console.log(data);
  };

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(
        `http://localhost:3000/api/subreddits/${id}`
      );
      const data = await response.json();
      console.log(data);
      setData(data);
      setLoading(false);
    }
    fetchData();
    setLoading(!data);
  }, [id]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!data) {
    return <div>erro...</div>;
  }

  return (
    <div className={styles.container}>
      {data.posts.map((post) => (
        <Link key={post.id} href="/[id]/[postId]" as={`/${id}/${post.id}`}>
          <h1>{post.title}</h1>
          <p>{post.body}</p>
        </Link>
      ))}

      {session && (
        <div>
          <label htmlFor="">title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <label htmlFor="">text</label>
          <input
            type="text"
            value={body}
            onChange={(e) => setBody(e.target.value)}
          />
          <button onClick={() => createPost()}>Create a post</button>
        </div>
      )}
    </div>
  );
};

export default Id;
