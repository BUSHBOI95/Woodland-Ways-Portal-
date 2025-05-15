import React, { useState, useEffect } from "react";
import Icon from "../../Icon.png";
import { NavLink } from "react-router-dom";
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
} from "@mui/icons-material";
import moment from "moment";

const Home = () => {
  const [postText, setPostText] = useState("");
  const [posts, setPosts] = useState([]);
  const [commentInputs, setCommentInputs] = useState({});

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
        timestamp: new Date(),
        likes: 0,
        comments: [],
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

  const handleCommentChange = (postId, value) => {
    setCommentInputs({ ...commentInputs, [postId]: value });
  };

  const handleCommentSubmit = (postId) => {
    const commentText = commentInputs[postId]?.trim();
    if (!commentText) return;

    const newComment = {
      id: Date.now(),
      text: commentText,
      timestamp: new Date(),
      likes: 0,
    };

    const updatedPosts = posts.map((post) =>
      post.id === postId
        ? { ...post, comments: [...post.comments, newComment] }
        : post
    );

    setPosts(updatedPosts);
    setCommentInputs({ ...commentInputs, [postId]: "" });
  };

  const handleCommentLike = (postId, commentId) => {
    const updatedPosts = posts.map((post) => {
      if (post.id !== postId) return post;
      const updatedComments = post.comments.map((comment) =>
        comment.id === commentId
          ? { ...comment, likes: comment.likes + 1 }
          : comment
      );
      return { ...post, comments: updatedComments };
    });
    setPosts(updatedPosts);
  };

  return (
    <div className="max-w-md mx-auto bg-white min-h-screen shadow-sm flex flex-col justify-between">
      <header className="bg-orange-500 text-white px-4 py-3 flex justify-center items-center">
        <h1 className="text-xl font-bold">Staff Portal</h1>
      </header>

      <div className="flex-1 overflow-y-auto px-4 pb-24">
        <div className="flex justify-center py-3">
          <img
            src={Icon}
            alt="Woodland Ways Logo"
            className="h-24 w-auto object-contain"
          />
        </div>

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

        <div className="space-y-4">
          {posts.map((post) => (
            <div key={post.id} className="bg-white border rounded-lg p-3 shadow-sm">
              <div className="flex items-center mb-2">
                <img src={Icon} alt="Avatar" className="w-10 h-10 rounded-full mr-3" />
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
                  onClick={() => handleLike(post.id)}
                  className="flex items-center gap-1"
                >
                  <ThumbUp fontSize="small" />
                  <span>Like ({post.likes})</span>
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
              <div className="mt-2 flex items-center gap-2 px-2">
                <input
                  type="text"
                  placeholder="Write a comment..."
                  className="flex-1 text-sm px-3 py-1 border rounded-full"
                  value={commentInputs[post.id] || ""}
                  onChange={(e) => handleCommentChange(post.id, e.target.value)}
                />
                <button onClick={() => handleCommentSubmit(post.id)}>
                  <Send fontSize="small" className="text-orange-500" />
                </button>
              </div>
              <div className="mt-2 space-y-2">
                {post.comments.map((comment) => (
                  <div key={comment.id} className="ml-4 flex items-start gap-2">
                    <img src={Icon} alt="Avatar" className="w-6 h-6 rounded-full mt-1" />
                    <div>
                      <p className="font-semibold text-xs">Woodland Ways</p>
                      <p className="text-xs text-gray-500">
                        {moment(comment.timestamp).fromNow()}
                      </p>
                      <p className="text-sm">{comment.text}</p>
                      <button
                        onClick={() => handleCommentLike(post.id, comment.id)}
                        className="text-xs text-gray-500 flex items-center gap-1 mt-1"
                      >
                        <ThumbUp fontSize="small" />
                        <span>Like ({comment.likes})</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

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
