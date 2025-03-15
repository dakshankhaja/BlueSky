import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ENDPOINTS } from '../../config/api';
import { FaImage, FaSmile, FaPoll, FaCalendarAlt } from 'react-icons/fa';

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newPost, setNewPost] = useState('');

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(ENDPOINTS.POSTS);
        setPosts(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching posts:', error);
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const handleCreatePost = async (e) => {
    e.preventDefault();
    if (!newPost.trim()) return;

    try {
      const response = await axios.post(ENDPOINTS.POSTS, { content: newPost });
      setPosts([response.data, ...posts]);
      setNewPost('');
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  const handleDeletePost = async (postId) => {
    try {
      await axios.delete(`${ENDPOINTS.POSTS}/${postId}`);
      setPosts(posts.filter((post) => post._id !== postId));
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="max-w-[600px] border-x border-gray-800 min-h-screen">
      {/* Create Post */}
      <div className="p-4 border-b border-gray-800">
        <form onSubmit={handleCreatePost}>
          <div className="flex gap-4">
            <img
              src="/avatar-placeholder.png"
              alt="Profile"
              className="w-12 h-12 rounded-full"
            />
            <div className="flex-1">
              <textarea
                value={newPost}
                onChange={(e) => setNewPost(e.target.value)}
                placeholder="What's happening?"
                className="w-full bg-transparent resize-none focus:outline-none text-xl min-h-[100px]"
              />
              <div className="flex justify-between items-center mt-4">
                <div className="flex gap-4 text-blue-500">
                  <button type="button" className="hover:bg-blue-500/20 p-2 rounded-full transition-all">
                    <FaImage />
                  </button>
                  <button type="button" className="hover:bg-blue-500/20 p-2 rounded-full transition-all">
                    <FaPoll />
                  </button>
                  <button type="button" className="hover:bg-blue-500/20 p-2 rounded-full transition-all">
                    <FaSmile />
                  </button>
                  <button type="button" className="hover:bg-blue-500/20 p-2 rounded-full transition-all">
                    <FaCalendarAlt />
                  </button>
                </div>
                <button
                  type="submit"
                  disabled={!newPost.trim()}
                  className="bg-blue-500 text-white px-6 py-2 rounded-full font-semibold hover:bg-blue-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Post
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>

      {/* Posts Feed */}
      <div>
        {posts.length === 0 ? (
          <div className="text-center p-8 text-gray-500">No posts yet</div>
        ) : (
          posts.map((post) => (
            <article
              key={post._id}
              className="p-4 border-b border-gray-800 hover:bg-gray-900/50 transition-all cursor-pointer"
            >
              <div className="flex gap-4">
                <img
                  src={post.author?.profileImage || '/avatar-placeholder.png'}
                  alt={post.author?.username}
                  className="w-12 h-12 rounded-full"
                />
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold hover:underline">
                      {post.author?.fullName || 'Anonymous'}
                    </h3>
                    <span className="text-gray-500">@{post.author?.username}</span>
                    <span className="text-gray-500">·</span>
                    <time className="text-gray-500">
                      {new Date(post.createdAt).toLocaleDateString()}
                    </time>
                  </div>
                  <p className="mt-2 text-gray-200 whitespace-pre-wrap">{post.content}</p>
                  <div className="flex justify-between mt-4 text-gray-500 max-w-md">
                    <button className="hover:text-blue-500 hover:bg-blue-500/20 p-2 rounded-full transition-all">
                      💬 {post.comments?.length || 0}
                    </button>
                    <button className="hover:text-green-500 hover:bg-green-500/20 p-2 rounded-full transition-all">
                      🔄 {post.reposts || 0}
                    </button>
                    <button className="hover:text-red-500 hover:bg-red-500/20 p-2 rounded-full transition-all">
                      ❤️ {post.likes || 0}
                    </button>
                    <button className="hover:text-blue-500 hover:bg-blue-500/20 p-2 rounded-full transition-all">
                      📤
                    </button>
                    <button
                      onClick={() => handleDeletePost(post._id)}
                      className="hover:text-red-500 hover:bg-red-500/20 p-2 rounded-full transition-all"
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              </div>
            </article>
          ))
        )}
      </div>
    </div>
  );
};

export default Posts;
