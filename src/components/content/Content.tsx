import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { Post } from "../../types/Interfaces";
import styles from "./Content.module.scss";

const Content: React.FC = () => {
  const { data, isLoading } = useQuery<Post[]>({
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
              <Link
                href="/[id]/[postId]"
                as={`/${data.subreddit.id}/${data.id}`}>
                <div className={styles.header}>
                  <span> {data.subreddit.title} </span>.
                  <p>Posted by {data.author.name}</p>
                </div>
                <div className={styles.body}>
                  <h3>{data.title}</h3>
                  <p>{data.body}</p>
                </div>
              </Link>
            </Link>
          );
        })}
      </div>
    </div>
  );
};
export default Content;
