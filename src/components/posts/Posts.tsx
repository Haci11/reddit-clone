import React from "react";
import { Post } from "../../types/Interfaces";
import { formatTimeAgo } from "../utils/formatTimeAgo";
import styles from "./Posts.module.scss";
interface PostsProps {
  posts: Post;
}

const Posts = ({ posts }: PostsProps) => {
  return (
    <div className={styles.container}>
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
      </div>
    </div>
  );
};

export default Posts;
