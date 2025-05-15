import React, { useState, useEffect } from "react";
import Icon from "../../Icon.png"; // Correct path
import { ThumbUpAlt, ChatBubbleOutline, Send } from "@mui/icons-material";

const Home = () => {
  const [postText, setPostText] = useState("");
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const storedPosts = JSON.parse(localStorage.getItem("staffPortalPosts") || "[]");
    setPosts(storedPosts);
  }, []);

  const handlePost = () => {
    if (!postText.trim()) return;
    const newPost = {
      id: Date.now(),
      name: "Jon Magellan",
      role: "All-star contributor",
      time: "just now",
      text: postText.trim(),
      avatar: Icon,
    };
    const updatedPosts = [newPost, ...posts];
    setPosts(updatedPosts);
    localStorage.setItem("staffPortalPosts", JSON.stringify(updatedPosts));
    setPostText("");
  };

  return (
    <div className="max-w-md mx-auto bg-white min-h-screen flex flex-col justify-between">
      {/* Header */}
      <header className="flex items-center justify-center px-4 py-4 bg-orange-500">
        <h1 className="text-xl font-bold text-white">Staff Portal</h1>
      </header>

      {/* Logo */}
      <div className="flex justify-center mt-4">
        <img src={Icon} alt="Woodland Ways Logo" className="h-28 w-auto" />
      </div>

      {/* Post Box */}
      <div className="px-4 mt-4 mb-2">
        <div className="bg-gray-100 rounded-xl p-3">
          <input
            type="text"
            placeholder="What's on your mind?"
            className="w-full p-2 text-sm rounded-md border border-gray-300 mb-3"
            value={postText}
            onChange={(e) => setPostText(e.target.value)}
          />
          <div className="flex justify-between flex-wrap gap-2">
            <button className="bg-orange-400 text-white px-4 py-2 rounded-full text-xs">Photos</button>
            <button className="bg-orange-400 text-white px-4 py-2 rounded-full text-xs">Events</button>
            <button className="bg-orange-400 text-white px-4 py-2 rounded-full text-xs">Directory</button>
            <button onClick={handlePost} className="bg-orange-600 text-white px-4 py-2 rounded-full text-xs">Post</button>
          </div>
        </div>
      </div>

      {/* Feed */}
      <div className="px-4 mb-20">
        {posts.map((post) => (
          <div key={post.id} className="bg-gray-50 p-4 mb-4 rounded-xl shadow-sm">
            <div className="flex items-center mb-1">
              <img src={post.avatar} alt="Avatar" className="h-6 w-6 rounded-full mr-2" />
              <div>
                <p className="font-semibold text-sm">{post.name}</p>
                <p className="text-[11px] text-gray-500">{post.role} · {post.time}</p>
              </div>
            </div>
            <p className="text-sm text-gray-800 mt-2 mb-3">{post.text}</p>
            <div className="flex justify-around text-gray-600 text-xs">
              <button className="flex items-center gap-1">
                <ThumbUpAlt fontSize="small" /> Like
              </button>
              <button className="flex items-center gap-1">
                <ChatBubbleOutline fontSize="small" /> Comment
              </button>
              <button className="flex items-center gap-1">
                <Send fontSize="small" /> Send
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
