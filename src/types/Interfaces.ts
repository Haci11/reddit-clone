export interface Session {
  user: {
    name: string;
    image: string;
    email: string;
  };
}

export interface MyDataType {
  id: string;
  title: string;
  body: string;
  posts: [{ title: string; body: string; id: string }];
}

export interface Post {
  id: string;
  authorId: string;
  createdAt: string;
  updatedAt: string;
  title: string;
  body: string;
  subredditId: string;
  subreddit: Subreddit;
  author: Author;
}

export interface Subreddit {
  id: string;
  createdAt: string;
  updatedAt: string;
  title: string;
}

export interface Author {
  id: string;
  name: string;
  email: string;
  emailVerified: any;
  image: string;
  createdAt: string;
  updatedAt: string;
}
