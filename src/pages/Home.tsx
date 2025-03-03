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
  const [quotePost, setQuotePost] = useState<PostTypes | null>(null);
  const [quoteText, setQuoteText] = useState<string>("");

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

  const handleRepostClick = (postId: number) => {
    const postToRepost = posts.find((post) => post.id === postId);
    if (postToRepost) {
      const newRepost: PostTypes = {
        id: new Date().getTime(),
        userId: 0, 
        text: postToRepost.text,
        type: "repost",
        createdAt: new Date().toISOString(),
        repost: postToRepost,
        username: "Letícia Lima",
        nick: "leclm",
      };

      const allUsers = JSON.parse(localStorage.getItem("mock") || "[]");
      const userIndex = allUsers.findIndex((user: User) => user.id === 0);
      if (userIndex !== -1) {
        allUsers[userIndex].posts.push(newRepost);
        localStorage.setItem("mock", JSON.stringify(allUsers));
        loadPosts();
      }
    }
  };

  const handleQuoteClick = (postId: number) => {
    const postToQuote = posts.find((post) => post.id === postId);
    if (postToQuote) {
      setQuotePost(postToQuote); 
      setQuoteText("");
    }
  };

  const handleCloseModal = () => {
    setQuotePost(null);
  };

  const handleQuoteSubmit = () => {
    if (!quoteText || !quotePost) return;

    const newQuotePost: PostTypes = {
      id: new Date().getTime(),
      userId: 0,
      text: quoteText,
      type: "quote",
      createdAt: new Date().toISOString(),
      repost: quotePost,
      username: "Letícia Lima",
      nick: "leclm",
    };

    const allUsers = JSON.parse(localStorage.getItem("mock") || "[]");
    const userIndex = allUsers.findIndex((user: User) => user.id === 0);
    if (userIndex !== -1) {
      allUsers[userIndex].posts.push(newQuotePost);
      localStorage.setItem("mock", JSON.stringify(allUsers));
      loadPosts();
    }

    setQuotePost(null);
    setQuoteText("");
  };

  const handleCloseProfileModal = () => {
    setSelectedUser(null);
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
              onQuoteClick={handleQuoteClick}
              onRepostClick={handleRepostClick}
            />
          ))}

          {selectedUser && (
            <ProfileModal
              isOpen={!!userId}
              onClose={handleCloseProfileModal}
              user={selectedUser}
            />
          )}

          {isLoading && (
            <div className="text-center">Loading more posts...</div>
          )}
        </div>
      </div>

      {quotePost && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-gray-900 p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-white text-lg mb-4">Add your quote</h2>
            <textarea
              className="w-full p-2 bg-gray-700 text-white rounded"
              rows={4}
              value={quoteText}
              onChange={(e) => setQuoteText(e.target.value)}
              placeholder="Write something..."
            />
            <div className="flex justify-end space-x-2 mt-4">
              <button
                onClick={handleCloseModal}
                className="px-4 py-2 bg-gray-600 text-white rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleQuoteSubmit}
                className="px-4 py-2 bg-green-500 text-white rounded"
                disabled={!quoteText}
              >
                Quote
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Home;
