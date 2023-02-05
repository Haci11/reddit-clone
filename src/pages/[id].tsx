import { useQueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Posts from "../components/posts/Posts";
import styles from "../styles/Home.module.scss";
import type { Session, MyDataType } from "../types/Interfaces";

const Id = () => {
  const { data: session }: { data: Session } = useSession() as {
    data: Session;
  };
  const router = useRouter();
  const { id } = router.query;
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const queryClient = useQueryClient();

  const createPost = async () => {
    const res = await fetch(`http://localhost:3000/api/subreddits/${id}/post`, {
      method: "POST",
      body: JSON.stringify({ title, body, subredditId: id }),
      headers: { "Content-Type": "application/json" },
    });
    const data = await res.json();
    console.log(data);
  };
  const mutation = useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });

  const { data, isLoading } = useQuery<MyDataType>({
    queryKey: ["posts", id],
    queryFn: async () => {
      const response = await fetch(
        `http://localhost:3000/api/subreddits/${id}`
      );
      const data = await response.json();
      return data;
    },
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!data) {
    return <div>erro...</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        {data?.posts?.map((post) => (
          <Link
            key={post.id}
            href="/[id]/[postId]"
            as={`/${id}/${post.id}`}
            className={styles.cards}>
            <h1>{post.title}</h1>
            <p>{post.body}</p>
          </Link>
        ))}
      </div>

      {session && (
        <div className={styles.form}>
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
          <button onClick={() => mutation.mutate()}>Create a post</button>
        </div>
      )}
    </div>
  );
};

export default Id;
