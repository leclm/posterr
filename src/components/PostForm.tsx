import React, { useState } from "react";

interface PostFormProps {
  onPostAdded: () => void;
  profileUserId: number;
}

/**
 * Component for creating and submitting a new post.
 *
 * @component
 * @param {Object} props - The properties object.
 * @param {function} props.onPostAdded - Callback function to be called when a post is successfully added.
 * @param {number} props.profileUserId - The ID of the user profile to which the post will be added.
 *
 * @returns {JSX.Element} The rendered PostForm component.
 *
 * @example
 * <PostForm onPostAdded={handlePostAdded} profileUserId={123} />
 *
 * @remarks
 * - The component maintains the state of the post text using the `useState` hook.
 * - The maximum length of the post text is limited to 777 characters.
 * - The component checks the number of posts made by the user on the current day and restricts it to a maximum of 5 posts per day.
 * - The posts are stored in the local storage under the key "mock".
 */
export const PostForm: React.FC<PostFormProps> = ({
  onPostAdded,
  profileUserId,
}) => {
  const [postText, setPostText] = useState("");
  const maxLength = 777;

  const handlePostChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPostText(e.target.value);
  };

  const handlePostSubmit = () => {
    const users = JSON.parse(localStorage.getItem("mock") || "[]");
    const user = users.find(
      (user: {
        id: number;
        posts: {
          id: number;
          text: string;
          createdAt: string;
          type: string;
          userId: number;
        }[];
      }) => user.id === profileUserId
    );

    if (user) {
      const today = new Date().toISOString().split("T")[0];
      const postsToday = user.posts.filter(
        (post: { createdAt: string }) => post.createdAt.split("T")[0] === today
      );

      if (postsToday.length >= 5) {
        alert("You have reached the limit of 5 posts for today.");
        return;
      }

      const newPost = {
        id: Date.now(),
        text: postText,
        createdAt: new Date().toISOString(),
        type: "normal",
        userId: profileUserId,
      };

      user.posts.unshift(newPost);
      localStorage.setItem("mock", JSON.stringify(users));
    }

    onPostAdded();
    setPostText("");
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
        <span className="text-sm text-gray-400">
          {charactersLeft} characters left
        </span>
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
