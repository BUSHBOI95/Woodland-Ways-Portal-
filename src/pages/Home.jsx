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
  const [commentInputs, setCommentInputs] = useState({});
  const [showCommentInput, setShowCommentInput] = useState({});
  const [commentLikes, setCommentLikes] = useState({});
  const [postLikes, setPostLikes] = useState({});

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
        comments: [],
      };
      setPosts([newPost, ...posts]);
      setPostText("");
    }
  };

  const handleComment = (postId) => {
    const text = commentInputs[postId];
    if (!text?.trim()) return;
    const newComment = {
      id: Date.now(),
      text,
      timestamp: new Date().toISOString(),
      name: "Instructor",
    };
    const updatedPosts = posts.map((post) =>
      post.id === postId
        ? {
            ...post,
            comments: [...post.comments, newComment],
          }
        : post
    );
    setPosts(updatedPosts);
    setCommentInputs({ ...commentInputs, [postId]: "" });
  };

  const toggleCommentInput = (postId) => {
    setShowCommentInput({
      ...showCommentInput,
      [postId]: !showCommentInput[postId],
    });
  };

  const togglePostLike = (postId) => {
    setPostLikes((prev) => ({
      ...prev,
      [postId]: prev[postId] ? prev[postId] - 1 : 1,
    }));
  };

  const toggleCommentLike = (commentId) => {
    setCommentLikes((prev) => ({
      ...prev,
      [commentId]: prev[commentId] ? prev[commentId] - 1 : 1,
    }));
  };

  return (
    <div className="max-w-md mx-auto bg-white min-h-screen shadow-sm flex flex-col justify-between">
      {/* Header */}
      <header className="bg-orange-500 text-white px-4 py-3 flex justify-center items-center">
        <h1 className="text-xl font-bold">Staff Portal</h1>
      </header>

      <div className="flex-1 overflow-y-auto px-4 pb-24">
        <div className="flex justify-center py-3">
          <img src={Icon} alt="Woodland Ways Logo" className="h-24 w-auto" />
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

        {/* Quick buttons */}
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
            <div
              key={post.id}
              className="bg-white border rounded-xl p-4 shadow-sm"
            >
              <div className="flex items-center mb-2">
                <img
                  src={Icon}
                  alt="Avatar"
                  className="w-10 h-10 rounded-full mr-3"
                />
                <div>
                  <p className="font-semibold text-sm">Woodland Ways</p>
                  <p className="text-xs text-gray-500">
                    Instructor • {moment(post.timestamp).fromNow()}
                  </p>
                </div>
              </div>
              <p className="text-sm text-gray-800 mb-2">{post.text}</p>
              <div className="flex justify-around text-gray-500 text-xs border-t pt-2">
                <button
                  onClick={() => togglePostLike(post.id)}
                  className="flex items-center gap-1"
                >
                  <ThumbUp fontSize="small" />
                  <span>Like ({postLikes[post.id] || 0})</span>
                </button>
                <button
                  onClick={() => toggleCommentInput(post.id)}
                  className="flex items-center gap-1"
                >
                  <ChatBubble fontSize="small" />
                  <span>Comment</span>
                </button>
                <div className="flex items-center gap-1">
                  <Send fontSize="small" />
                  <span>Send</span>
                </div>
              </div>

              {/* Comment input */}
              {showCommentInput[post.id] && (
                <div className="flex items-center mt-2 space-x-2">
                  <input
                    type="text"
                    placeholder="Write a comment..."
                    value={commentInputs[post.id] || ""}
                    onChange={(e) =>
                      setCommentInputs({
                        ...commentInputs,
                        [post.id]: e.target.value,
                      })
                    }
                    className="flex-1 p-2 rounded-full border border-gray-300 text-sm"
                  />
                  <button
                    onClick={() => handleComment(post.id)}
                    className="text-orange-500"
                  >
                    <Send />
                  </button>
                </div>
              )}

              {/* Comments */}
              <div className="mt-2 space-y-2">
                {post.comments.map((comment) => (
                  <div
                    key={comment.id}
                    className="bg-gray-100 rounded-xl px-4 py-2 ml-2"
                  >
                    <div className="flex items-center mb-1">
                      <img
                        src={Icon}
                        alt="Avatar"
                        className="w-6 h-6 rounded-full mr-2"
                      />
                      <div>
                        <p className="font-semibold text-xs">
                          {comment.name}
                        </p>
                        <p className="text-[11px] text-gray-500">
                          {moment(comment.timestamp).fromNow()}
                        </p>
                      </div>
                    </div>
                    <p className="text-sm text-gray-800">{comment.text}</p>
                    <div className="flex gap-4 text-xs text-gray-500 mt-1 ml-1">
                      <button
                        onClick={() => toggleCommentLike(comment.id)}
                        className="flex items-center gap-1"
                      >
                        <ThumbUp fontSize="inherit" />
                        <span>Like ({commentLikes[comment.id] || 0})</span>
                      </button>
                      <div className="flex items-center gap-1">
                        <Reply fontSize="inherit" />
                        <span>Reply</span>
                      </div>
                    </div>
                  </div>
                ))}
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
