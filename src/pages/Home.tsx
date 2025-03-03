import React, { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { PostForm } from "../components/PostForm";
import Post from "../components/Post";
import ProfileModal from "../components/ProfileModal";
import { User, Post as PostTypes } from "../types/types";
import { storeMock } from "../utils/mock";

const POSTS_LIMIT = 10;

const Home: React.FC = () => {
  const navigate = useNavigate();
  const { userId } = useParams();
  const [, setTotalPosts] = useState<number>(0);
  const postsContainerRef = useRef<HTMLDivElement | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [posts, setPosts] = useState<PostTypes[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const loadPosts = () => {
    const allUsers = JSON.parse(localStorage.getItem("mock") || "[]");

    const allPosts = allUsers.flatMap((user: User) =>
      user.posts.map((post) => ({
        ...post,
        username: user.username,
        nick: user.nick,
      }))
    );

    allPosts.sort(
      (a: PostTypes, b: PostTypes) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    setTotalPosts(allPosts.length);
    setPosts(allPosts.slice(0, POSTS_LIMIT));
  };

  useEffect(() => {
    loadPosts();
  }, []);

  useEffect(() => {
    if (!localStorage.getItem("mock")) {
      storeMock();
    }
  }, []);

  useEffect(() => {
    if (userId) {
      const allUsers = JSON.parse(localStorage.getItem("mock") || "[]");
      const user = allUsers.find((user: User) => user.id === Number(userId));

      if (user) {
        setSelectedUser(user);
      }
    } else {
      setSelectedUser(null);
    }
  }, [userId]);

  const handleScroll = useCallback(() => {
    if (!postsContainerRef.current) return;

    const { scrollTop, scrollHeight, clientHeight } = postsContainerRef.current;

    if (scrollHeight - scrollTop <= clientHeight + 5 && !isLoading) {
      setIsLoading(true);

      setTimeout(() => {
        const allUsers = JSON.parse(localStorage.getItem("mock") || "[]");

        const allPosts = allUsers
          .flatMap((user: User) =>
            user.posts.map((post) => ({
              ...post,
              username: user.username,
              nick: user.nick,
            }))
          )
          .sort(
            (a: PostTypes, b: PostTypes) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );

        if (posts.length < allPosts.length) {
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
  }, [isLoading, posts.length]);

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
  }, [isLoading, handleScroll]);
  
  const handleUserClick = (userId: number) => {
    navigate(`/${userId}`);
  };

  const closeModal = () => {
    navigate("/");
  };

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
            <Post
              key={index}
              post={post}
              username={post.username}
              nick={post.nick}
              onUserClick={handleUserClick}
            />
          ))}

          {selectedUser && (
            <ProfileModal
              isOpen={!!userId}
              onClose={closeModal}
              user={selectedUser}
            />
          )}

          {isLoading && (
            <div className="text-center">Loading more posts...</div>
          )}
        </div>
      </div>
    </>
  );
};

export default Home;
