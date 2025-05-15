import React, { useState, useEffect } from "react";
import moment from "moment";
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
      time: new Date().toISOString(),  // store actual date
      avatar: WWLogo,
      likes: 0,
      comments: [],
    };
    const updatedPosts = [newPost, ...posts];
    setPosts(updatedPosts);
    localStorage.setItem("posts", JSON.stringify(updatedPosts));
    setPostText("");
  };

  const formatTime = (isoTime) => {
    return moment(isoTime).calendar(null, {
      sameDay: "[Today at] h:mm A",
      lastDay: "[Yesterday at] h:mm A",
      lastWeek: "dddd [at] h:mm A",
      sameElse: "MMM D [at] h:mm A",
    });
  };

  return (
    <div className="flex flex-col items-center p-4 space-y-4 bg-white min-h-screen">
      <div className="w-full bg-orange-500 py-3 text-white text-center text-2xl font-bold">
        Staff Portal
      </div>

      <div className="w-full max-w-md">
        <textarea
          value={postText}
          onChange={(e) => setPostText(e.target.value)}
          placeholder="What's on your mind?"
          className="w-full p-2 border border-gray-300 rounded mb-2"
        />
        <button
          onClick={handlePost}
          className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600"
        >
          Post
        </button>
      </div>

      {posts.map((post) => (
        <div key={post.id} className="w-full max-w-md bg-gray-100 rounded-lg p-4 shadow">
          <div className="flex items-center mb-2">
            <img src={post.avatar} alt="avatar" className="w-10 h-10 rounded-full mr-3" />
            <div>
              <div className="font-bold">{post.author}</div>
              <div className="text-xs text-gray-500">{post.role}</div>
              <div className="text-xs text-gray-500">{formatTime(post.time)}</div>
            </div>
          </div>
          <div className="mb-2">{post.content}</div>
          <div className="flex justify-between text-gray-600 text-sm">
            <button className="flex items-center space-x-1">
              <FaThumbsUp /> <span>Like</span>
            </button>
            <button className="flex items-center space-x-1">
              <FaCommentAlt /> <span>Comment</span>
            </button>
            <button className="flex items-center space-x-1">
              <FaPaperPlane /> <span>Send</span>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Home;
