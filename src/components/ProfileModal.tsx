import React, { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { User } from "../types/types";
import Post from "./Post";

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: User;
}

const ProfileModal: React.FC<ProfileModalProps> = ({
  isOpen,
  onClose,
  user,
}) => {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={onClose}>
        <div className="fixed inset-0 bg-black bg-opacity-50" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="w-full max-w-4xl h-[90vh] bg-gray-800 rounded-lg p-6 shadow-lg overflow-hidden">
            <Dialog.Title className="text-lg font-semibold text-white">
              {user.nick || "Nick is unavailable"}
            </Dialog.Title>
            <p className="text-gray-400">
              @{user.username || "Username is unavailable"}
            </p>
            <p className="text-sm text-gray-500">
              Joined in: {user.joinedDate || "Joined Date is unavailable"}
            </p>

            <div className="flex justify-between mt-4 text-gray-300">
              <p>
                <span className="font-semibold">
                  {user.followers.length || "Followers count is unavailable"}
                </span>{" "}
                Followers
              </p>
              <p>
                <span className="font-semibold">
                  {user.following.length || "Following count is unavailable"}
                </span>{" "}
                Following
              </p>
              <p>
                <span className="font-semibold">
                  {user.posts.length || "Post count is unavailable"}
                </span>{" "}
                Posts
              </p>
            </div>

            <div className="mt-4 max-h-[65vh] overflow-y-auto space-y-4 p-2">
              {user.posts && user.posts.length > 0 ? (
                user.posts.map((post) => {
                  return (
                    <Post
                      key={post.id}
                      post={post}
                      username={user.username}
                      nick={user.nick}
                      onUserClick={() => {}}
                      onRepostClick={() => {}}
                      onQuoteClick={() => {}}
                      isProfilePage={true}
                    />
                  );
                })
              ) : (
                <p className="text-gray-400">No posts available</p>
              )}
            </div>

            <button
              onClick={onClose}
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
