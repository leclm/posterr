import React from "react";
import { FaRedo, FaQuoteRight } from "react-icons/fa";
import { Post as PostTypes } from "../types/types";

interface PostProps {
  post: PostTypes;
  username: string;
  nick: string;
  // onUserClick: (userId: number) => void;
}

const Post: React.FC<PostProps> = ({ post }) => {
  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow-md space-y-2">
      <div className="text-md text-gray-400">
        <button
          // onClick={() => onUserClick(post.userId)}
          className="font-bold text-blue-400 hover:underline"
        >
          {post.username}
        </button>
        <span className="text-gray-500"> @{post.nick}</span>
      </div>

      <p className="text-lg text-gray-300">{post.text}</p>

      <div className="flex justify-between space-x-4 mt-2">
        <div className="text-sm text-gray-500">
          {new Date(post.createdAt).toLocaleString()} | {post.type} post
        </div>
        <div className="flex space-x-4 items-center">
          <button className="flex items-center text-gray-300 hover:text-white bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-full">
            <FaRedo size={15} className="mr-2" />
            Repost
          </button>
          <button className="flex items-center text-gray-300 hover:text-white bg-green-500 hover:bg-green-600 px-4 py-2 rounded-full">
            <FaQuoteRight size={15} className="mr-2" />
            Quote
          </button>
        </div>
      </div>
    </div>
  );
};

export default Post;
