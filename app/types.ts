// BlogCard types

export interface Props {
  id: number;
  title: string;
  description: string;
  authorId: number;
}

export interface User {
  id: number;
  firstName: string;
  lastName: string;
}
export interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
  tags: string[];
  reactions: number;
  params: { id: string };
}

export interface PaginatedResponse extends Post {
  total: number;
  skip: number;
  limit: number;
}

export interface FetchedPost {
  posts: PaginatedResponse[];
}
