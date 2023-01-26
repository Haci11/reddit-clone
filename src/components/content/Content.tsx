import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";

interface MyDataType {
  id: string;
  title: string;
}

const Content: React.FC = () => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState<MyDataType[]>([]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch("http://localhost:3000/api/posts");
      const data = await response.json();
      console.log(data);
      setData(data);
    }

    fetchData();
    setLoading(!data);
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  console.log(data);

  return (
    <div>
      <div>
        {data?.map((item) => (
          <Link key={item.id} href="/[id]" as={`/${item.id}`}>
            <p>{item.title}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};
export default Content;
