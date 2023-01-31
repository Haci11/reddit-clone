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
