import React, { useState } from "react";
import { Post, Session } from "../../types/Interfaces";
import styles from "./Post.module.scss";
import { formatTimeAgo } from "../utils/formatTimeAgo";
import { useSession } from "next-auth/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface PostsProps {
  posts: Post;
}

const Posts = ({ posts }: PostsProps) => {
  const [content, setContent] = useState("");
  const queryClient = useQueryClient();

  const createComment = async () => {
    const res = await fetch(`/api/comment`, {
      method: "POST",
      body: JSON.stringify({ content, postId: posts.id }),
      headers: { "Content-Type": "application/json" },
    });
    if (res.ok) {
      setContent("");
    } else {
      alert("Error creating comment");
    }
    const data = await res.json();
    console.log(data);
  };

  const mutation = useMutation({
    mutationFn: createComment,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["comment"] });
    },
  });

  const { data: session }: { data: Session } = useSession() as {
    data: Session;
  };

  return (
    <div className={styles.container} key={posts.id}>
      <div className={styles.card}>
        <div className={styles.cards}>
          <div className={styles.header}>
            <span> {posts.subreddit.title} </span>.
            <p>Posted by {posts.author.name}</p>
            <p> {formatTimeAgo(posts.createdAt)}</p>
          </div>
          <div className={styles.body}>
            <h3>{posts.title}</h3>
            <p>{posts.body}</p>
          </div>
        </div>
        <div className={styles.comment_container}>
          <div className={styles.comments}>
            {session && (
              <div className={styles.comment_form}>
                <p>Send Comment as {session.user.name}</p>
                <textarea
                  name="content"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="What are your thoughts?"
                  id="content"></textarea>
                <input type="submit" onClick={() => mutation.mutate()} />
              </div>
            )}
            <div className={styles.comment_reverse}>
              {posts.Comment.length === 0
                ? "There is no comment"
                : posts.Comment.map((comment) => {
                    return (
                      <div key={comment.id}>
                        <div key={comment.id} className={styles.comment_head}>
                          <img src={posts.author.image} alt="Profile" />
                          <p>{posts.author.name}</p>
                          <p>{formatTimeAgo(comment.createdAt)}</p>
                        </div>
                        <div className={styles.comment_body}>
                          <p>{comment.content}</p>
                        </div>
                      </div>
                    );
                  })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Posts;
