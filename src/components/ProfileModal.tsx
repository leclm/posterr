import React, { Fragment, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Dialog, Transition } from "@headlessui/react";
import { User } from "../types/types";
import Post from "./Post";
import { PostForm } from "./PostForm";

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: User;
  onRepostClick: (postId: number, profileUserId: number) => void;
  onQuoteClick: (postId: number, profileUserId: number) => void;
  onNewPost: () => void;
}

const ProfileModal: React.FC<ProfileModalProps> = ({
  isOpen,
  onClose,
  user,
  onRepostClick,
  onQuoteClick,
  onNewPost,
}) => {
  const navigate = useNavigate();
  const loggedUserId = 0;
  const [isFollowing, setIsFollowing] = useState(false);
  const [followersCount, setFollowersCount] = useState(user.followers.length);

  useEffect(() => {
    const storedData = localStorage.getItem("mock");
    if (storedData) {
      const users = JSON.parse(storedData);
      const loggedUser = users.find((u: User) => u.id === loggedUserId);
      setIsFollowing(loggedUser.following.some((u: User) => u.id === user.id));
    }
  }, [user]);

  const handleFollowToggle = () => {
    const storedData = localStorage.getItem("mock");
    if (!storedData) return;

    const users = JSON.parse(storedData);
    const loggedUser = users.find((u: User) => u.id === loggedUserId);
    const targetUser = users.find((u: User) => u.id === user.id);

    if (!loggedUser || !targetUser) return;

    if (isFollowing) {
      loggedUser.following = loggedUser.following.filter(
        (u: User) => u.id !== user.id
      );
      targetUser.followers = targetUser.followers.filter(
        (u: User) => u.id !== loggedUserId
      );
      setFollowersCount((prev) => prev - 1);
    } else {
      loggedUser.following.push({
        id: user.id,
        username: user.username,
        nick: user.nick,
      });
      targetUser.followers.push({
        id: loggedUserId,
        username: loggedUser.username,
        nick: loggedUser.nick,
      });
      setFollowersCount((prev) => prev + 1);
    }

    localStorage.setItem("mock", JSON.stringify(users));
    setIsFollowing(!isFollowing);
  };

  const handleClose = () => {
    onClose();
    navigate("/");
  };

  const handlePostAdded = () => {
    onNewPost();
    alert("Post added successfully! Return to home page to view!");
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={handleClose}>
        <div className="fixed inset-0 bg-black bg-opacity-50" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="w-full max-w-4xl h-[90vh] bg-gray-800 rounded-lg p-6 shadow-lg overflow-y-auto flex flex-col">
            <Dialog.Title className="text-lg font-semibold text-white">
              {user.nick || "Nick is unavailable"}
            </Dialog.Title>
            <p className="text-gray-400">
              @{user.username || "Username is unavailable"}
            </p>
            <p className="text-sm text-gray-500">
              Joined in: {user.joinedDate || "Joined Date is unavailable"}
            </p>

            {user.id !== loggedUserId && (
              <button
                onClick={handleFollowToggle}
                className={`mt-4 px-4 py-2 rounded-md text-white ${
                  isFollowing
                    ? "bg-red-500 hover:bg-red-600"
                    : "bg-green-500 hover:bg-green-600"
                }`}
              >
                {isFollowing ? "Unfollow" : "Follow"}
              </button>
            )}

            <div className="flex justify-between mt-4 text-gray-300">
              <p>
                <span className="font-semibold">{followersCount}</span>{" "}
                Followers
              </p>
              <p>
                <span className="font-semibold">
                  {user.following.length || 0}
                </span>{" "}
                Following
              </p>
              <p>
                <span className="font-semibold">{user.posts.length || 0}</span>{" "}
                Posts
              </p>
            </div>

            {user.id === 0 && (
              <div className="mt-4 text-gray-300">
                <PostForm
                  onPostAdded={handlePostAdded}
                  profileUserId={user.id}
                />
              </div>
            )}

            <div className="mt-4 max-h-[65vh] overflow-y-auto space-y-4 p-2">
              {user.posts && user.posts.length > 0 ? (
                user.posts.map((post) => (
                  <Post
                    key={post.id}
                    post={post}
                    username={user.username}
                    nick={user.nick}
                    onUserClick={() => {}}
                    onRepostClick={() => onRepostClick(post.id, user.id)}
                    onQuoteClick={() => onQuoteClick(post.id, user.id)}
                    profileUserId={user.id}
                  />
                ))
              ) : (
                <p className="text-gray-400">No posts available</p>
              )}
            </div>

            <button
              onClick={handleClose}
              className="mt-4 w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
            >
              Return
            </button>
          </Dialog.Panel>
        </div>
      </Dialog>
    </Transition>
  );
};

export default ProfileModal;
