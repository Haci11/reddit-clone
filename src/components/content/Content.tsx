import React, { useEffect, useState } from "react";
import Link from "next/link";
import styles from "./Content.module.scss";
interface MyDataType {
  id: string;
  title: string;
}

const Content: React.FC = () => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState<MyDataType[]>([]);

  async function fetchData() {
    const response = await fetch("http://localhost:3000/api/subreddits");
    const data = await response.json();
    setData(data);
  }
  useEffect(() => {
    fetchData();
    setLoading(!data);
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className={styles.card}>
        {data?.map((item) => (
          <Link
            key={item.id}
            href="/[id]"
            as={`/${item.id}`}
            className={styles.cards}>
            <p>{item.title}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};
export default Content;
