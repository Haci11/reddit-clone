import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Posts from "../../components/post/Post";
import { Post } from "../../types/Interfaces";
import styles from "../../styles/Home.module.scss";

const Post = () => {
  const router = useRouter();
  const { id, postId } = router.query;

  const { data, isLoading } = useQuery<Post>({
    queryKey: ["comment", id, postId],
    queryFn: async () => {
      const response = await fetch(`/api/subreddits/${id}/${postId}`);
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
      <Posts posts={data} />
    </div>
  );
};

export default Post;
