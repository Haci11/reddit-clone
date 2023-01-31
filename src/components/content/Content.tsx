import React, { useEffect, useState } from "react";
import Link from "next/link";
import styles from "./Content.module.scss";
import { useQuery } from "@tanstack/react-query";
import type { MyDataType } from "../../types/Interfaces";

const Content: React.FC = () => {
  const { data, isLoading } = useQuery<MyDataType[]>({
    queryKey: ["subreddits"],
    queryFn: async () => {
      const response = await fetch("http://localhost:3000/api/subreddits");
      const data = await response.json();
      return data;
    },
  });

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
