import React, { useState } from 'react';

interface PostFormProps {
  onPostAdded: () => void;
}

export const PostForm: React.FC<PostFormProps> = ({ onPostAdded }) => {
  const [postText, setPostText] = useState('');
  const maxLength = 777; // Limite de caracteres

  const handlePostChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPostText(e.target.value);
  };

  const handlePostSubmit = () => {
    const users = JSON.parse(localStorage.getItem('mock') || '[]');
    const user = users.find((user: { id: number; posts: { id: number; text: string; createdAt: string; type: string; userId: number }[] }) => user.id === 0);

    if (user) {
      const today = new Date().toISOString().split('T')[0];
      const postsToday = user.posts.filter((post: { createdAt: string }) => post.createdAt.split('T')[0] === today);

      if (postsToday.length >= 5) {
        alert('You have reached the limit of 5 posts for today.');
        return;
      }

      const newPost = {
        id: Date.now(),
        text: postText,
        createdAt: new Date().toISOString(),
        type: 'normal',
        userId: 0,
      };

      user.posts.unshift(newPost);
      localStorage.setItem('mock', JSON.stringify(users));
    }

    onPostAdded();
    setPostText('');
  };

  const charactersLeft = maxLength - postText.length;

  return (
    <div className="space-y-4">
      <textarea
        value={postText}
        onChange={handlePostChange}
        className="w-full p-4 border border-gray-300 rounded-md"
        rows={4}
        placeholder="What's going on?"
        maxLength={maxLength}
      />
      <div className="flex justify-between">
        <span className="text-sm text-gray-400">{charactersLeft} characters left</span>
        <button
          onClick={handlePostSubmit}
          className="px-4 py-2 bg-blue-500 text-white rounded-md"
          disabled={!postText || postText.length > maxLength}
        >
          Post
        </button>
      </div>
    </div>
  );
};
