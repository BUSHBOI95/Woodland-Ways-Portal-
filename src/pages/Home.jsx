import React, { useState } from "react";
import { ThumbUpRounded, ChatBubbleRounded, SendRounded } from "@mui/icons-material";
import moment from "moment";
import Logo from "../../Icon.png"; // Ensure this file exists in public or correct path

export default function Home() {
  const [postText, setPostText] = useState("");
  const [posts, setPosts] = useState([]);
  const [commentText, setCommentText] = useState({});
  const [replyText, setReplyText] = useState({});
  const [likedPosts, setLikedPosts] = useState({});
  const [likedComments, setLikedComments] = useState({});
  const [showReplyInput, setShowReplyInput] = useState({});

  const handlePost = () => {
    if (!postText.trim()) return;
    const newPost = {
      id: Date.now(),
      text: postText,
      timestamp: new Date(),
      comments: [],
    };
    setPosts([newPost, ...posts]);
    setPostText("");
  };

  const handleComment = (postId) => {
    if (!commentText[postId]?.trim()) return;
    const newComment = {
      id: Date.now(),
      text: commentText[postId],
      timestamp: new Date(),
      replies: [],
    };
    setPosts(
      posts.map((post) =>
        post.id === postId
          ? { ...post, comments: [...post.comments, newComment] }
          : post
      )
    );
    setCommentText({ ...commentText, [postId]: "" });
  };

  const handleReply = (postId, commentId) => {
    if (!replyText[commentId]?.trim()) return;
    const newReply = {
      id: Date.now(),
      text: replyText[commentId],
      timestamp: new Date(),
    };
    setPosts(
      posts.map((post) =>
        post.id === postId
          ? {
              ...post,
              comments: post.comments.map((comment) =>
                comment.id === commentId
                  ? {
                      ...comment,
                      replies: [...(comment.replies || []), newReply],
                    }
                  : comment
              ),
            }
          : post
      )
    );
    setReplyText({ ...replyText, [commentId]: "" });
    setShowReplyInput({ ...showReplyInput, [commentId]: false });
  };

  const toggleLikePost = (postId) => {
    setLikedPosts((prev) => ({ ...prev, [postId]: !prev[postId] }));
  };

  const toggleLikeComment = (commentId) => {
    setLikedComments((prev) => ({ ...prev, [commentId]: !prev[commentId] }));
  };

  return (
    <div className="flex flex-col items-center bg-white min-h-screen pb-20">
      <h1 className="bg-orange-500 w-full text-white text-center py-3 text-xl font-semibold">
        Staff Portal
      </h1>
      <img src={Logo} alt="Woodland Ways" className="w-28 mt-3 mb-2" />
      <div className="w-[90%] bg-gray-100 rounded-xl p-3 mb-2">
        <input
          type="text"
          value={postText}
          onChange={(e) => setPostText(e.target.value)}
          placeholder="What's on your mind?"
          className="w-full p-3 border border-gray-300 rounded-xl text-sm"
        />
        <button
          onClick={handlePost}
          className="bg-orange-500 text-white mt-3 px-4 py-1 rounded-full float-right"
        >
          Post
        </button>
      </div>

      <div className="flex justify-around w-[90%] text-sm text-gray-600 my-2">
        <div className="text-center">
          <img src="/photos.png" alt="Photos" className="w-6 mx-auto mb-1" />
          Photos
        </div>
        <div className="text-center">
          <img src="/events.png" alt="Events" className="w-6 mx-auto mb-1" />
          Events
        </div>
        <div className="text-center">
          <img src="/directory.png" alt="Directory" className="w-6 mx-auto mb-1" />
          Directory
        </div>
      </div>

      {posts.map((post) => (
        <div
          key={post.id}
          className="w-[90%] bg-white border border-gray-300 rounded-xl p-3 my-2 shadow-sm"
        >
          <div className="flex items-center mb-2">
            <img src={Logo} alt="Avatar" className="w-8 h-8 rounded-full mr-2" />
            <div>
              <p className="text-sm font-bold">Woodland Ways</p>
              <p className="text-xs text-gray-500">
                Instructor • {moment(post.timestamp).fromNow()}
              </p>
            </div>
          </div>
          <p className="mb-2">{post.text}</p>
          <div className="flex items-center space-x-4 text-sm text-gray-600 mb-2">
            <button
              onClick={() => toggleLikePost(post.id)}
              className="flex items-center space-x-1"
            >
              <ThumbUpRounded fontSize="small" className="text-gray-600" />
              <span>{likedPosts[post.id] ? "Unlike" : "Like"} ({likedPosts[post.id] ? 1 : 0})</span>
            </button>
            <div className="flex items-center space-x-1">
              <ChatBubbleRounded fontSize="small" className="text-gray-600" />
              <span>Comment</span>
            </div>
            <div className="flex items-center space-x-1">
              <SendRounded fontSize="small" className="text-gray-600" />
              <span>Send</span>
            </div>
          </div>

          {post.comments.map((comment) => (
            <div key={comment.id} className="bg-gray-100 rounded-xl p-2 mb-1 ml-2">
              <div className="flex items-center mb-1">
                <img src={Logo} alt="Avatar" className="w-6 h-6 rounded-full mr-2" />
                <div>
                  <p className="text-sm font-bold">Woodland Ways</p>
                  <p className="text-xs text-gray-500">{moment(comment.timestamp).fromNow()}</p>
                </div>
              </div>
              <p className="text-sm ml-8">{comment.text}</p>
              <div className="flex items-center text-sm text-gray-600 ml-8 space-x-3">
                <button onClick={() => toggleLikeComment(comment.id)}>
                  Like ({likedComments[comment.id] ? 1 : 0})
                </button>
                <button onClick={() =>
                  setShowReplyInput((prev) => ({
                    ...prev,
                    [comment.id]: !prev[comment.id],
                  }))
                }>
                  Reply
                </button>
              </div>

              {showReplyInput[comment.id] && (
                <div className="flex items-center mt-1 ml-8">
                  <input
                    type="text"
                    placeholder="Write a reply..."
                    value={replyText[comment.id] || ""}
                    onChange={(e) =>
                      setReplyText({ ...replyText, [comment.id]: e.target.value })
                    }
                    className="border border-gray-300 rounded-xl p-2 w-full text-sm"
                  />
                  <button
                    onClick={() => handleReply(post.id, comment.id)}
                    className="ml-2 text-sm text-orange-500"
                  >
                    Submit
                  </button>
                </div>
              )}

              {comment.replies &&
                comment.replies.map((reply) => (
                  <div
                    key={reply.id}
                    className="bg-gray-200 rounded-xl p-2 my-1 ml-14"
                  >
                    <p className="text-sm">{reply.text}</p>
                    <p className="text-xs text-gray-500">
                      {moment(reply.timestamp).fromNow()}
                    </p>
                  </div>
                ))}
            </div>
          ))}

          <div className="flex items-center mt-2">
            <img src={Logo} alt="Avatar" className="w-6 h-6 rounded-full mr-2" />
            <input
              type="text"
              value={commentText[post.id] || ""}
              onChange={(e) =>
                setCommentText({ ...commentText, [post.id]: e.target.value })
              }
              placeholder="Write a comment..."
              className="border border-gray-300 rounded-full px-4 py-2 w-full text-sm"
            />
            <button
              onClick={() => handleComment(post.id)}
              className="ml-2 text-orange-500"
            >
              <SendRounded fontSize="small" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
