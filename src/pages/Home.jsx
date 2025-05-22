import React, { useState } from "react";
import moment from "moment";
import WWLogo from "../../Icon.png";
import {
  Home as HomeIcon,
  MenuBook,
  CalendarMonth,
  Menu,
  Notifications,
  Image,
  Event,
  Group,
  ThumbUpAltRounded,
  ChatBubbleOutlineRounded,
  SendRounded,
  ReplyRounded,
} from "@mui/icons-material";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState("");
  const [commentInputs, setCommentInputs] = useState({});

  const handlePost = () => {
    if (newPost.trim()) {
      const post = {
        id: Date.now(),
        author: "Woodland Ways",
        role: "Instructor",
        timestamp: moment(),
        content: newPost,
        likes: 0,
        liked: false,
        comments: [],
      };
      setPosts([post, ...posts]);
      setNewPost("");
    }
  };

  const handleLikePost = (postId) => {
    setPosts(posts.map(post =>
      post.id === postId
        ? { ...post, likes: post.liked ? post.likes - 1 : post.likes + 1, liked: !post.liked }
        : post
    ));
  };

  const handleLikeComment = (postId, commentId) => {
    setPosts(posts.map(post =>
      post.id === postId
        ? {
            ...post,
            comments: post.comments.map(comment =>
              comment.id === commentId
                ? { ...comment, likes: comment.liked ? comment.likes - 1 : comment.likes + 1, liked: !comment.liked }
                : comment
            ),
          }
        : post
    ));
  };

  const handleComment = (postId) => {
    const commentText = commentInputs[postId];
    if (commentText && commentText.trim()) {
      const newComment = {
        id: Date.now(),
        author: "Woodland Ways",
        timestamp: moment(),
        content: commentText,
        likes: 0,
        liked: false,
      };
      setPosts(posts.map(post =>
        post.id === postId
          ? { ...post, comments: [...post.comments, newComment] }
          : post
      ));
      setCommentInputs({ ...commentInputs, [postId]: "" });
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col justify-between pt-0">
      {/* Header */}
      <div className="bg-orange-500 text-white text-center py-2 text-xl font-semibold">
        Staff Portal
      </div>

      {/* Logo */}
      <div className="flex justify-center mt-2 mb-1">
        <img src={WWLogo} alt="Woodland Ways Logo" className="h-20" />
      </div>

      {/* Post Input */}
      <div className="px-4 pb-4">
        <textarea
          placeholder="What's on your mind?"
          value={newPost}
          onChange={(e) => setNewPost(e.target.value)}
          className="w-full p-3 border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-orange-500"
        />
        <div className="flex items-center justify-between mt-2">
          <div className="flex gap-6 px-2">
            <div className="flex flex-col items-center text-xs text-gray-600">
              <Image fontSize="medium" />
              Photos
            </div>
            <div className="flex flex-col items-center text-xs text-gray-600">
              <Event fontSize="medium" />
              Events
            </div>
            <div className="flex flex-col items-center text-xs text-gray-600">
              <Group fontSize="medium" />
              Directory
            </div>
          </div>
          <button
            onClick={handlePost}
            className="bg-orange-500 text-white px-4 py-1 rounded-full font-semibold shadow-md hover:bg-orange-600"
          >
            Post
          </button>
        </div>

        {/* Posts */}
        {posts.map(post => (
          <div key={post.id} className="mt-6 p-4 border rounded-lg shadow-sm bg-white">
            <div className="flex items-center gap-2 mb-2">
              <img src={WWLogo} alt="Avatar" className="h-6 w-6 rounded-full" />
              <div>
                <p className="text-sm font-bold">Woodland Ways</p>
                <p className="text-xs text-gray-500">{post.role} • {post.timestamp.fromNow()}</p>
              </div>
            </div>
            <p className="mb-3 text-sm">{post.content}</p>
            <div className="flex items-center text-gray-600 text-sm gap-4 mb-3">
              <button onClick={() => handleLikePost(post.id)} className="flex items-center gap-1">
                <ThumbUpAltRounded fontSize="small" />
                Like ({post.likes})
              </button>
              <div className="flex items-center gap-1">
                <ChatBubbleOutlineRounded fontSize="small" />
                Comment
              </div>
              <div className="flex items-center gap-1">
                <SendRounded fontSize="small" />
                Send
              </div>
            </div>

            {/* Comments */}
            {post.comments.map(comment => (
              <div key={comment.id} className="bg-gray-100 p-3 rounded-xl mb-2 ml-3">
                <div className="flex items-center gap-2 mb-1">
                  <img src={WWLogo} alt="Avatar" className="h-5 w-5 rounded-full" />
                  <p className="text-sm font-bold">Woodland Ways</p>
                  <p className="text-xs text-gray-500 ml-auto">{comment.timestamp.fromNow()}</p>
                </div>
                <p className="text-sm">{comment.content}</p>
                <div className="flex items-center gap-4 text-sm mt-1 text-gray-600">
                  <button onClick={() => handleLikeComment(post.id, comment.id)} className="flex items-center gap-1">
                    <ThumbUpAltRounded fontSize="small" />
                    Like ({comment.likes})
                  </button>
                  <div className="flex items-center gap-1">
                    <ReplyRounded fontSize="small" />
                    Reply
                  </div>
                </div>
              </div>
            ))}

            <div className="flex items-center mt-2 gap-2">
              <img src={WWLogo} alt="Avatar" className="h-6 w-6 rounded-full" />
              <input
                type="text"
                placeholder="Write a comment..."
                value={commentInputs[post.id] || ""}
                onChange={(e) =>
                  setCommentInputs({ ...commentInputs, [post.id]: e.target.value })
                }
                className="flex-1 border px-3 py-2 rounded-full text-sm focus:outline-orange-400"
              />
              <button
                onClick={() => handleComment(post.id)}
                className="text-orange-500 pr-2"
              >
                <SendRounded />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Nav Bar */}
      <div className="fixed bottom-0 w-full flex justify-around items-center border-t bg-white py-2 shadow-inner">
        <div className="flex flex-col items-center text-xs text-orange-500">
          <HomeIcon fontSize="small" />
          Home
        </div>
        <div className="flex flex-col items-center text-xs text-gray-600">
          <MenuBook fontSize="small" />
          My Courses
        </div>
        <div className="flex flex-col items-center text-xs text-gray-600">
          <CalendarMonth fontSize="small" />
          Calendar
        </div>
        <div className="flex flex-col items-center text-xs text-gray-600">
          <Notifications fontSize="small" />
          Alerts
        </div>
        <div className="flex flex-col items-center text-xs text-gray-600">
          <Menu fontSize="small" />
          Menu
        </div>
      </div>
    </div>
  );
}
