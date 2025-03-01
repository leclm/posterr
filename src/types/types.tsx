export interface Post {
  id: number;
  userId: number;
  text: string;
  createdAt: string;
  type: string;
  username: string;
  nick: string;
}

export interface User {
  id: number;
  username: string;
  nick: string;
  joinedDate: string;
  followersCount: number;
  followingCount: number;
  postsCount: number;
  posts: Post[];
  followers: User[];
  following: User[];
}
