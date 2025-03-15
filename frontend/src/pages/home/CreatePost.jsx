import React, { useState, useRef } from 'react';
import axios from 'axios';
import { ENDPOINTS } from '../../config/api';

export const CreatePost = () => {
  const [postContent, setPostContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!postContent.trim()) return;

    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append('content', postContent);
      if (selectedFile) {
        formData.append('file', selectedFile);
      }

      await axios.post(ENDPOINTS.POSTS, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setPostContent('');
      setSelectedFile(null);
      window.location.reload();
    } catch (error) {
      console.error('Error creating post:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="border-b border-gray-700 p-4">
      <form onSubmit={handleSubmit}>
        <div className="flex gap-4">
          <div className="w-12 h-12 rounded-full bg-gray-300"></div>
          <div className="flex-1">
            <textarea
              value={postContent}
              onChange={(e) => setPostContent(e.target.value)}
              placeholder="What's happening?"
              className="w-full bg-transparent border-none focus:ring-0 resize-none text-lg"
              rows={3}
            />
            {selectedFile && (
              <div className="mt-2 text-sm text-gray-500">
                Selected file: {selectedFile.name}
              </div>
            )}
            <div className="flex justify-between items-center mt-2">
              <div className="flex gap-4">
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileUpload}
                  className="hidden"
                  accept="image/*"
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current.click()}
                  className="text-blue-500 hover:text-blue-600"
                >
                  📷
                </button>
                <button type="button" className="text-blue-500 hover:text-blue-600">
                  🎯
                </button>
                <button type="button" className="text-blue-500 hover:text-blue-600">
                  😊
                </button>
              </div>
              <button
                type="submit"
                disabled={!postContent.trim() || isLoading}
                className={`px-4 py-2 rounded-full ${
                  postContent.trim() && !isLoading
                    ? 'bg-blue-500 hover:bg-blue-600'
                    : 'bg-blue-300 cursor-not-allowed'
                } text-white font-semibold`}
              >
                {isLoading ? 'Posting...' : 'Post'}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
