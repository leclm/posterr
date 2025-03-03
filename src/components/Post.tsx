import React from "react";
import { FaRedo, FaQuoteRight } from "react-icons/fa";
import { Post as PostTypes } from "../types/types";

interface PostProps {
  post: PostTypes;
  username: string;
  nick: string;
  onUserClick: (userId: number) => void;
  onRepostClick: (postId: number) => void;
  onQuoteClick: (postId: number) => void;
}

const Post: React.FC<PostProps> = ({
  post,
  username,
  nick,
  onUserClick,
  onRepostClick,
  onQuoteClick,
}) => {
  if (!post) return null;

  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow-md space-y-2">
      <div className="text-md text-gray-400">
        <button
          onClick={() => onUserClick(post.userId)}
          className="font-bold text-blue-400 hover:underline"
        >
          {username}
        </button>
        <span className="text-gray-500"> @{nick}</span>
      </div>

      {(post.type !== "repost") && (
        <p className="text-lg text-gray-300">{post.text}</p>
      )}

      {(post.type === "quote" || post.type === "repost") && post.repost && (
        <div className="border-4 border-gray-700 pl-6 mt-6 mb-6 bg-gray-800 p-4">
          <p className="text-sm text-gray-400">Original Post:</p>

          <div className="text-md text-gray-400">
            <button
              onClick={() => onUserClick(post.repost.userId)}
              className="font-bold text-blue-400 hover:underline"
            >
              {post.repost.username}
            </button>
            <span className="text-gray-500"> @{post.repost.nick}</span>
          </div>

          <p className="text-lg text-gray-300">{post.repost.text}</p>
        </div>
      )}

      <div className="flex justify-between space-x-4 mt-2">
        <div className="text-sm text-gray-500">
          {new Date(post.createdAt).toLocaleString()} | {post.type} post
        </div>
        <div className="flex space-x-4 items-center">
          <>
            <button
              onClick={() => onRepostClick(post.id)}
              className="flex items-center text-gray-300 hover:text-white bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-full"
            >
              <FaRedo size={15} className="mr-2" />
              Repost
            </button>
            <button
              onClick={() => onQuoteClick(post.id)}
              className="flex items-center text-gray-300 hover:text-white bg-green-500 hover:bg-green-600 px-4 py-2 rounded-full"
            >
              <FaQuoteRight size={15} className="mr-2" />
              Quote
            </button>
          </>
        </div>
      </div>
    </div>
  );
};

export default Post;
