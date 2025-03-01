import React from "react";
import { FaRedo, FaQuoteRight } from "react-icons/fa";

interface PostProps {
  post: {
    id: number;
    text: string;
    createdAt: string;
    type: "normal" | "quote" | "repost";
  };
}

const Post: React.FC<PostProps> = ({ post }) => {
  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow-md space-y-2">
      <p className="text-gray-300">{post.text}</p>
      <div className="text-sm text-gray-500">
        {new Date(post.createdAt).toLocaleString()} | {post.type} post
      </div>
      <div className="flex space-x-4 mt-2">
        <button className="flex items-center text-gray-300 hover:text-white">
          <FaRedo size={15} className="mr-2" />
          Repost
        </button>
        <button className="flex items-center text-gray-300 hover:text-white">
          <FaQuoteRight size={15} className="mr-2" />
          Quote
        </button>
      </div>
    </div>
  );
};

export default Post;
