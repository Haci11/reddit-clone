import { useQueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { formatTimeAgo } from "../components/utils/formatTimeAgo";
import styles from "../styles/Home.module.scss";
import type { Session, Subreddit } from "../types/Interfaces";

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

  const { data, isLoading } = useQuery<Subreddit>({
    queryKey: ["posts", id],
    queryFn: async () => {
      const response = await fetch(`/api/subreddits/${id}`);
      const data = await response.json();
      return data;
    },
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }
  console.log();

  if (!data) {
    return <div>erro...</div>;
  }

  return (
    <div className={styles.containers}>
      <div className={styles.container}>
        <div className={styles.card}>
          {data.posts.length === 0 ? (
            <div>
              <p>There is no posts</p>
              <br />
              <p>Be the first one to post in this subreddit</p>
            </div>
          ) : (
            data?.posts.map((post) => {
              return (
                <div className={styles.cards} key={post.id}>
                  <Link href="/[id]/[postId]" as={`/${data.id}/${post.id}`}>
                    <div className={styles.header}>
                      <span> {post.title} </span>.
                      <p>Posted by {post.author.name}</p>
                      <p> {formatTimeAgo(post.createdAt)}</p>
                    </div>
                    <div className={styles.body}>
                      <h3>{post.title}</h3>
                      <p>{post.body}</p>
                    </div>
                    <div className={styles.comment}>
                      {post.Comment.length} Comments
                    </div>
                  </Link>
                </div>
              );
            })
          )}
        </div>
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
