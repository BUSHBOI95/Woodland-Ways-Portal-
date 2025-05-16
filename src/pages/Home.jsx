import React, { useState, useEffect } from "react";
import Icon from "../../Icon.png";
import { NavLink } from "react-router-dom";
import moment from "moment";
import {
  Home as HomeIcon,
  Assignment,
  CalendarMonth,
  MenuBook,
  Menu,
  Photo,
  Event,
  Group,
  Send,
  ThumbUp,
  ChatBubble,
  Reply,
} from "@mui/icons-material";

const Home = () => {
  const [postText, setPostText] = useState("");
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const savedPosts = localStorage.getItem("posts");
    if (savedPosts) {
      setPosts(JSON.parse(savedPosts));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("posts", JSON.stringify(posts));
  }, [posts]);

  const handlePost = () => {
    if (postText.trim()) {
      const newPost = {
        id: Date.now(),
        text: postText,
        timestamp: new Date().toISOString(),
        likes: 0,
        comments: [],
        newComment: "",
      };
      setPosts([newPost, ...posts]);
      setPostText("");
    }
  };

  const handleLike = (postId) => {
    const updatedPosts = posts.map((post) =>
      post.id === postId ? { ...post, likes: post.likes + 1 } : post
    );
    setPosts(updatedPosts);
  };

  const handleCommentChange = (e, postId) => {
    const updatedPosts = posts.map((post) =>
      post.id === postId ? { ...post, newComment: e.target.value } : post
    );
    setPosts(updatedPosts);
  };

  const handleCommentSubmit = (postId) => {
    const updatedPosts = posts.map((post) => {
      if (post.id === postId && post.newComment?.trim()) {
        const newComment = {
          id: Date.now(),
          text: post.newComment,
          timestamp: new Date().toISOString(),
        };
        return {
          ...post,
          comments: [...post.comments, newComment],
          newComment: "",
        };
      }
      return post;
    });
    setPosts(updatedPosts);
  };

  return (
    <div className="max-w-md mx-auto bg-white min-h-screen shadow-sm flex flex-col justify-between">
      {/* Header */}
      <header className="bg-orange-500 text-white px-4 py-3 flex justify-center items-center">
        <h1 className="text-xl font-bold">Staff Portal</h1>
      </header>

      <div className="flex-1 overflow-y-auto px-4 pb-24">
        <div className="flex justify-center py-3">
          <img src={Icon} alt="Logo" className="h-24 w-auto object-contain" />
        </div>

        {/* Post input */}
        <div className="bg-gray-100 rounded-xl p-3 mb-4">
          <textarea
            className="w-full border border-gray-300 rounded-md p-2 text-sm resize-none"
            rows={3}
            placeholder="What's on your mind?"
            value={postText}
            onChange={(e) => setPostText(e.target.value)}
          />
          <button
            onClick={handlePost}
            className="bg-orange-500 text-white px-4 py-2 mt-2 rounded-full text-sm float-right"
          >
            Post
          </button>
        </div>

        {/* Action buttons */}
        <div className="grid grid-cols-3 gap-2 mb-4 text-center text-sm">
          <div className="flex flex-col items-center">
            <Photo fontSize="small" />
            <span>Photos</span>
          </div>
          <div className="flex flex-col items-center">
            <Event fontSize="small" />
            <span>Events</span>
          </div>
          <div className="flex flex-col items-center">
            <Group fontSize="small" />
            <span>Directory</span>
          </div>
        </div>

        {/* Posts */}
        <div className="space-y-4">
          {posts.map((post) => (
            <div key={post.id} className="bg-white border rounded-lg p-3 shadow-sm">
              <div className="flex items-center mb-2">
                <img
                  src={Icon}
                  alt="Avatar"
                  className="w-10 h-10 rounded-full mr-3 object-cover"
                />
                <div>
                  <p className="font-semibold text-sm">Woodland Ways</p>
                  <p className="text-xs text-gray-500">
                    Instructor • {moment(post.timestamp).fromNow()}
                  </p>
                </div>
              </div>
              <p className="text-sm text-gray-800 mb-2">{post.text}</p>

              {/* Buttons */}
              <div className="flex justify-around text-gray-500 text-xs border-t pt-2">
                <button onClick={() => handleLike(post.id)} className="flex items-center gap-1">
                  <ThumbUp fontSize="small" />
                  <span>{post.likes} Like</span>
                </button>
                <div className="flex items-center gap-1">
                  <ChatBubble fontSize="small" />
                  <span>Comment</span>
                </div>
                <div className="flex items-center gap-1">
                  <Send fontSize="small" />
                  <span>Send</span>
                </div>
              </div>

              {/* Comments */}
              {post.comments.map((comment) => (
                <div
                  key={comment.id}
                  className="mt-3 ml-3 p-2 bg-gray-100 rounded-lg text-sm"
                >
                  <div className="flex items-center gap-2 mb-1">
                    <img src={Icon} alt="Avatar" className="w-6 h-6 rounded-full" />
                    <span className="font-semibold text-xs">Woodland Ways</span>
                    <span className="text-[10px] text-gray-500 ml-1">
                      {moment(comment.timestamp).fromNow()}
                    </span>
                  </div>
                  <p className="ml-8">{comment.text}</p>
                  <div className="flex ml-8 gap-4 mt-1 text-xs text-gray-500">
                    <button className="flex items-center gap-1">
                      <ThumbUp fontSize="inherit" />
                      Like
                    </button>
                    <button className="flex items-center gap-1">
                      <Reply fontSize="inherit" />
                      Reply
                    </button>
                  </div>
                </div>
              ))}

              {/* Comment box */}
              <div className="flex items-center gap-2 mt-3 ml-3">
                <img src={Icon} alt="Avatar" className="w-8 h-8 rounded-full" />
                <input
                  type="text"
                  value={post.newComment || ""}
                  onChange={(e) => handleCommentChange(e, post.id)}
                  placeholder="Write a comment..."
                  className="flex-1 border rounded-full px-4 py-1 text-sm"
                />
                <button
                  onClick={() => handleCommentSubmit(post.id)}
                  className="text-orange-500"
                >
                  <Send fontSize="small" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Nav */}
      <footer className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200">
        <nav className="flex justify-around py-2 text-xs text-gray-700">
          <NavLink to="/" className="flex flex-col items-center text-orange-500">
            <HomeIcon fontSize="medium" />
            <span className="text-[11px]">Home</span>
          </NavLink>
          <NavLink to="/my-courses" className="flex flex-col items-center">
            <Assignment fontSize="medium" />
            <span className="text-[11px]">My Courses</span>
          </NavLink>
          <NavLink to="/calendar" className="flex flex-col items-center">
            <CalendarMonth fontSize="medium" />
            <span className="text-[11px]">Calendar</span>
          </NavLink>
          <NavLink to="/handbook" className="flex flex-col items-center">
            <MenuBook fontSize="medium" />
            <span className="text-[11px]">Handbook</span>
          </NavLink>
          <NavLink to="/menu" className="flex flex-col items-center">
            <Menu fontSize="medium" />
            <span className="text-[11px]">Menu</span>
          </NavLink>
        </nav>
      </footer>
    </div>
  );
};

export default Home;
