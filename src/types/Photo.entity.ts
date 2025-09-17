export interface Like {
  user: {
    id: number;
  };
}

export interface Post {
  id: number;
  title: string;
  content: string;
  image?: string;
  published: boolean;
  createdAt: string;
  updatedAt: string;
  authorId: number;
  author: {
    name: string;
  };
  likes: Like[];
}
