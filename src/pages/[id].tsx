import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import styles from "../styles/Home.module.scss";

interface MyDataType {
  id: string;
  text: string;
}

const Id = () => {
  const router = useRouter();
  const { id } = router.query;
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState<MyDataType | null>(null);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(`http://localhost:3000/api/posts/${id}`);
      const data = await response.json();
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
      <h1>{data.text}</h1>
    </div>
  );
};

export default Id;
