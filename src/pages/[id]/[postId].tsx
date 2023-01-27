import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

interface MyDataType {
  id: string;
  title: string;
  body: string;
}

const Post = () => {
  const router = useRouter();
  const { id, postId } = router.query;
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState<MyDataType | null>(null);

  console.log(id, postId);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(
        `http://localhost:3000/api/subreddits/${id}/${postId}`
      );
      const data = await response.json();
      setData(data);
      setLoading(false);
    }

    fetchData();
    setLoading(!data);
  }, []);

  console.log(data + "aaa");
  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <h1>{data?.title}</h1>
      <p>{data?.body}</p>
    </div>
  );
};

export default Post;
