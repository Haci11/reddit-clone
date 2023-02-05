import React from "react";
import { Post } from "../../types/Interfaces";
import { formatTimeAgo } from "../utils/formatTimeAgo";
import styles from "./Posts.module.scss";

const Posts = ({ Post }: Post) => {
  console.log(Post);
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.cards}>
          <div className={styles.header}>
            <span> {Post.subreddit.title} </span>.
            <p>Posted by {Post.author.name}</p>
            <p> {formatTimeAgo(Post.createdAt)}</p>
          </div>
          <div className={styles.body}>
            <h3>{Post.title}</h3>
            <p>{Post.body}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Posts;
