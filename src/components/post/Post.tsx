import React from "react";
import { Post, Session } from "../../types/Interfaces";
import styles from "./Post.module.scss";
import { formatTimeAgo } from "../utils/formatTimeAgo";
import { useSession } from "next-auth/react";

interface PostsProps {
  posts: Post;
}

const Posts = ({ posts }: PostsProps) => {
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
        <div className={styles.comment_comtainer}>
          <div className={styles.comments}>
            {session && <p>Send Comment as {session.user.name}</p>}
            {posts.Comment.length === 0
              ? "There is no comment"
              : posts.Comment.map((comment) => {
                  return (
                    <div>
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
  );
};

export default Posts;
