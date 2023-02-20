import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { Post } from "../../types/Interfaces";
import { formatTimeAgo } from "../utils/formatTimeAgo";
import styles from "./Content.module.scss";

const Content: React.FC = () => {
  const { data, isLoading } = useQuery<Post[]>({
    queryKey: ["allposts"],
    queryFn: async () => {
      const response = await fetch("/api/posts");
      const data = await response.json();
      return data;
    },
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        {data?.map((data) => {
          return (
            <div className={styles.cards} key={data.id}>
              <Link
                href="/[id]/[postId]"
                as={`/${data.subreddit.id}/${data.id}`}>
                <div className={styles.header}>
                  <span> {data.subreddit.title} </span>.
                  <p>Posted by {data.author.name}</p>
                  <p> {formatTimeAgo(data.createdAt)}</p>
                </div>
                <div className={styles.body}>
                  <h3>{data.title}</h3>
                  <p>{data.body}</p>
                </div>
                <div className={styles.comment}>
                  {data.Comment.length} Comments
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default Content;
