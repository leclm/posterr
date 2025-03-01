import React, { useState } from 'react';

interface PostFormProps {
  onPostAdded: () => void;
}

export const PostForm: React.FC<PostFormProps> = ({ onPostAdded }) => {
  const [postText, setPostText] = useState('');

  const handlePostChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPostText(e.target.value);
  };

  const handlePostSubmit = () => {
    const newPost = {
      id: Date.now(),
      text: postText,
      createdAt: new Date().toISOString(),
      type: 'normal',
    };
    const savedPosts = JSON.parse(localStorage.getItem('posts') || '[]');
    savedPosts.unshift(newPost);
    localStorage.setItem('posts', JSON.stringify(savedPosts));
    onPostAdded();
    setPostText('');
  };

  return (
    <div className="space-y-4">
      <textarea
        value={postText}
        onChange={handlePostChange}
        className="w-full p-4 border border-gray-300 rounded-md"
        rows={4}
        placeholder="What's going on?"
      />
      <button
        onClick={handlePostSubmit}
        className="px-4 py-2 bg-blue-500 text-white rounded-md"
        disabled={!postText}
      >
        Post
      </button>
    </div>
  );
};
