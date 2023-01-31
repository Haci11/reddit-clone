import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { MyDataType } from "../../types/Interfaces";
import styles from "./Content.module.scss";

const Content: React.FC = () => {
  const { data, isLoading } = useQuery<MyDataType[]>({
    queryKey: ["allposts"],
    queryFn: async () => {
      const response = await fetch("http://localhost:3000/api/posts");
      const data = await response.json();
      console.log(data);
      return data;
    },
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }
  console.log(data);

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        {data?.map((data) => {
          return (
            <Link href="/" className={styles.cards}>
              {data.title} <div>{data.body}</div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};
export default Content;
