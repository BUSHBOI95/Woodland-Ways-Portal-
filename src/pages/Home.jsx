import React, { useState, useEffect } from "react";
import { FaThumbsUp, FaComment, FaPaperPlane } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import moment from "moment";
import Logo from "../../Icon.png";

const Home = () => {
  const [postText, setPostText] = useState("");
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const storedPosts = localStorage.getItem("posts");
    if (storedPosts) {
      setPosts(JSON.parse(storedPosts));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("posts", JSON.stringify(posts));
  }, [posts]);

  const handlePost = () => {
    if (postText.trim() === "") return;
    const newPost = {
      id: Date.now(),
      text: postText,
      timestamp: new Date().toISOString(),
    };
    setPosts([newPost, ...posts]);
    setPostText("");
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-white">
      {/* Header */}
      <div className="bg-orange-500 text-white text-center py-4 text-xl font-bold">
        Staff Portal
      </div>

      {/* Logo and Title */}
      <div className="flex flex-col items-center mt-6">
        <img src={Logo} alt="Logo" className="w-28 h-28 object-contain" />
        <h1 className="text-xl font-semibold mt-2">Woodland Ways</h1>
      </div>

      {/* Post Box */}
      <div className="bg-gray-100 rounded-xl mx-4 p-4 mt-4 shadow-sm">
        <textarea
          value={postText}
          onChange={(e) => setPostText(e.target.value)}
          placeholder="Share an update..."
          className="w-full p-2 border rounded-md resize-none focus:outline-none"
          rows={2}
        />
        <div className="flex justify-end mt-2">
          <button
            onClick={handlePost}
            className="bg-orange-500 text-white font-semibold px-4 py-2 rounded-full"
          >
            Post
          </button>
        </div>
      </div>

      {/* Post Feed */}
      <div className="px-4 mt-4 space-y-4 mb-24">
        {posts.map((post) => (
          <div key={post.id} className="bg-white rounded-lg shadow p-3">
            <div className="flex items-center mb-2">
              <img
                src={Logo}
                alt="Avatar"
                className="w-10 h-10 rounded-full mr-3 border"
              />
              <div>
                <p className="font-bold text-sm">Woodland Ways</p>
                <p className="text-xs text-gray-500">
                  {moment(post.timestamp).format("DD/MM/YYYY, HH:mm:ss")}
                </p>
              </div>
            </div>
            <p className="text-sm mb-3">{post.text}</p>
            <div className="flex justify-around text-gray-600 text-sm">
              <button className="flex items-center space-x-1">
                <FaThumbsUp />
                <span>Like</span>
              </button>
              <button className="flex items-center space-x-1">
                <FaComment />
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

      {/* Bottom Nav */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex justify-around py-2">
        <NavLink
          to="/home"
          className="flex flex-col items-center text-xs text-orange-500"
        >
          <i className="material-icons">home</i>
          Home
        </NavLink>
        <NavLink
          to="/courses"
          className="flex flex-col items-center text-xs text-gray-700"
        >
          <i className="material-icons">assignment</i>
          My Courses
        </NavLink>
        <NavLink
          to="/calendar"
          className="flex flex-col items-center text-xs text-gray-700"
        >
          <i className="material-icons">calendar_today</i>
          Calendar
        </NavLink>
        <NavLink
          to="/handbook"
          className="flex flex-col items-center text-xs text-gray-700"
        >
          <i className="material-icons">menu_book</i>
          Handbook
        </NavLink>
        <NavLink
          to="/menu"
          className="flex flex-col items-center text-xs text-gray-700"
        >
          <i className="material-icons">menu</i>
          Menu
        </NavLink>
      </div>
    </div>
  );
};

export default Home;
