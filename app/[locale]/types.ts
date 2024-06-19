// BlogCard types

export interface PostProps {
  id: number;
  title: string;
  description: string;
  authorId: number;
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
}

export interface PostData {
  id: number;
  title: string;
  body: string;
  userId: number;
  tags: string[];
  reactions: number;
}

export interface PaginatedResponse extends PostData {
  total: number;
  skip: number;
  limit: number;
}

export interface FetchedPost {
  posts: PaginatedResponse[];
}

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  productId: number;
}
