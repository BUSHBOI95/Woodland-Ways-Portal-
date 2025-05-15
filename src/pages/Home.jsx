import React, { useState, useEffect } from "react";
import { FaThumbsUp, FaCommentAlt, FaPaperPlane } from "react-icons/fa";
import WWLogo from "../../Icon.png";

const Home = () => {
  const [postText, setPostText] = useState("");
  const [posts, setPosts] = useState(() => {
    const saved = localStorage.getItem("posts");
    return saved ? JSON.parse(saved) : [];
  });

  const handlePost = () => {
    if (postText.trim() === "") return;
    const newPost = {
      id: Date.now(),
      author: "Jon Magellan",
      role: "All-star contributor",
      content: postText,
      time: "just now",
      avatar: WWLogo,
      likes: 0,
      comments: [],
    };
    const updatedPosts = [newPost, ...posts];
    setPosts(updatedPosts);
    localStorage.setItem("posts", JSON.stringify(updatedPosts));
    setPostText("");
  };

  return (
    <div className="flex flex-col items-center p-4 space-y-4 bg-white min-h-screen">
      <div className="w-full bg-orange-500 py-3 text-white text-center text-2xl font-bold shadow">
        Staff Portal
      </div>
      <img src={WWLogo} alt="Woodland Ways" className="w-48 md:w-64 mt-2" />
      <div className="w-full max-w-md bg-gray-100 p-4 rounded-lg shadow">
        <input
          type="text"
          placeholder="What's on your mind?"
          className="w-full border border-gray-300 rounded-full px-4 py-2 text-gray-700 mb-3 focus:outline-none"
          value={postText}
          onChange={(e) => setPostText(e.target.value)}
        />
        <div className="flex justify-between space-x-2">
          <button className="bg-orange-400 text-white rounded-full px-4 py-2 font-semibold">
            Photos
          </button>
          <button className="bg-orange-400 text-white rounded-full px-4 py-2 font-semibold">
            Events
          </button>
          <button className="bg-orange-400 text-white rounded-full px-4 py-2 font-semibold">
            Directory
          </button>
          <button
            onClick={handlePost}
            className="bg-orange-500 text-white rounded-full px-4 py-2 font-bold"
          >
            Post
          </button>
        </div>
      </div>
      <div className="w-full max-w-md space-y-4">
        {posts.map((post) => (
          <div key={post.id} className="bg-gray-100 p-4 rounded-lg shadow">
            <div className="flex items-center mb-2">
              <img
                src={post.avatar}
                alt="avatar"
                className="w-8 h-8 rounded-full mr-2"
              />
              <div>
                <p className="font-semibold">{post.author}</p>
                <p className="text-xs text-gray-500">
                  {post.role} · {post.time}
                </p>
              </div>
            </div>
            <p className="text-gray-800 mb-2">{post.content}</p>
            <div className="flex justify-around text-gray-600 text-sm">
              <button className="flex items-center space-x-1">
                <FaThumbsUp />
                <span>Like</span>
              </button>
              <button className="flex items-center space-x-1">
                <FaCommentAlt />
                <span>Comment</span>
              </button>
              <button className="flex items-center space-x-1">
                <FaPaperPlane />
                <span>Send</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
