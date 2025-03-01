import React, { useState, useEffect, useRef } from "react";
import { PostForm } from "../components/PostForm";
import Post from "../components/Post";

const POSTS_LIMIT = 10;

const Home: React.FC = () => {
  interface PostType {
    id: number;
    text: string;
    createdAt: string;
    type: "normal" | "quote" | "repost";
  }

  const [posts, setPosts] = useState<PostType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [totalPosts, setTotalPosts] = useState<number>(0); 
  const postsContainerRef = useRef<HTMLDivElement | null>(null);

  const loadPosts = () => {
    const allPosts = JSON.parse(localStorage.getItem("posts") || "[]");
    setTotalPosts(allPosts.length);
    setPosts(allPosts.slice(0, POSTS_LIMIT));
  };

  const handleScroll = () => {
    if (!postsContainerRef.current) return;

    const { scrollTop, scrollHeight, clientHeight } = postsContainerRef.current;
    if (scrollHeight - scrollTop === clientHeight && !isLoading) {
      setIsLoading(true);
      setTimeout(() => {
        const allPosts = JSON.parse(localStorage.getItem("posts") || "[]");

        if (posts.length < totalPosts) {
          setPosts((prevPosts) => {
            const nextPosts = allPosts.slice(
              prevPosts.length,
              prevPosts.length + POSTS_LIMIT
            );
            return [...prevPosts, ...nextPosts];
          });
        }
        setIsLoading(false);
      }, 1000);
    }
  };

  useEffect(() => {
    loadPosts();
  }, []);

  useEffect(() => {
    const container = postsContainerRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll);
    }
    return () => {
      if (container) {
        container.removeEventListener("scroll", handleScroll);
      }
    };
  }, [isLoading]);

  return (
    <>
      <div className="max-w-2xl mx-auto p-4">
        <h1 className="text-xl font-bold mb-4">Posterr | Home</h1>
      </div>
      <div className="container mx-auto p-4">
        <PostForm onPostAdded={loadPosts} />
        <div
          ref={postsContainerRef}
          className="flex flex-col space-y-4 mt-4 overflow-y-auto"
          style={{ maxHeight: "80vh" }}
        >
          {posts.map((post, index) => (
            <Post key={index} post={post} />
          ))}
          {isLoading && (
            <div className="text-center">Loading more posts...</div>
          )}
        </div>
      </div>
    </>
  );
};

export default Home;
