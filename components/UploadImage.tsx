import React, { useState, useEffect, useRef } from 'react';
import { FaCloudUploadAlt, FaCheckCircle, FaExclamationCircle, FaCopy } from 'react-icons/fa';
import axios from 'axios';
import anime from "animejs/lib/anime.es.js";

const UploadImage: React.FC = () => {
  const [imageLinks, setImageLinks] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const notificationRef = useRef<HTMLDivElement | null>(null);
  const loadingRef = useRef<HTMLDivElement | null>(null);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = () => {
    setDragging(false);
  };

  const handleDrop = async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(false);
    const files = Array.from(e.dataTransfer.files);
    await uploadFiles(files);
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    await uploadFiles(files);
  };

  const uploadFiles = async (files: File[]) => {
    setLoading(true);
    setNotification(null);
    try {
      if (files.length > 4) {
        throw new Error('You can only upload up to 4 images.');
      }

      const uploadPromises = files.map((file) => {
        if (!file.type.startsWith('image/')) {
          throw new Error(`File ${file.name} is not an image.`);
        }

        const formData = new FormData();
        formData.append('image', file);
        formData.append('title', 'Image Upload');
        formData.append('description', 'Uploaded via React App');

        return axios.post('/api/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }).then(response => response.data.link);
      });

      const links = await Promise.all(uploadPromises);
      setImageLinks(links);
      setNotification({ type: 'success', message: 'Images uploaded successfully!' });
    } catch (error: any) {
      setNotification({ type: 'error', message: error.message || 'Error uploading images.' });
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (link: string) => {
    navigator.clipboard.writeText(link);
    setNotification({ type: 'success', message: 'Link copied to clipboard!' });
  };

  useEffect(() => {
    if (notification) {
      anime({
        targets: notificationRef.current,
        translateY: [-50, 0],
        opacity: [0, 1],
        duration: 500,
        easing: 'easeOutQuart',
        complete: () => {
          setTimeout(() => {
            anime({
              targets: notificationRef.current,
              translateY: [0, -50],
              opacity: [1, 0],
              duration: 500,
              easing: 'easeInQuart',
              complete: () => setNotification(null),
            });
          }, 2000);
        },
      });
    }
  }, [notification]);

  useEffect(() => {
    if (loading) {
      anime({
        targets: loadingRef.current,
        opacity: [0, 1],
        duration: 500,
        easing: 'easeOutQuart',
      });
    }
  }, [loading]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-5 bg-gray-100">
      {loading && (
        <div
          ref={loadingRef}
          className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50"
        >
          <div className="w-16 h-16 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
        </div>
      )}

      <div
        className={`relative flex flex-col items-center justify-center w-full max-w-lg p-10 space-y-4 border-2 border-dashed rounded-lg cursor-pointer transition-all duration-300 ease-in-out ${dragging ? 'border-blue-500 bg-blue-100' : 'border-gray-300 bg-white'}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <FaCloudUploadAlt className="text-gray-400 text-6xl" />
        <p className="text-gray-600">Drag & Drop your images here</p>
        <p className="text-gray-600">or</p>
        <label className="px-4 py-2 text-white bg-blue-500 rounded-lg cursor-pointer hover:bg-blue-600">
          Browse Files
          <input
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={handleFileChange}
          />
        </label>
      </div>

      {notification && (
        <div
          ref={notificationRef}
          className={`fixed top-4 right-4 p-4 rounded-lg shadow-lg z-50 ${notification.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}
        >
          <div className="flex items-center">
            {notification.type === 'success' ? <FaCheckCircle className="mr-2 text-xl" /> : <FaExclamationCircle className="mr-2 text-xl" />}
            {notification.message}
          </div>
        </div>
      )}

      <div className="flex flex-col w-full max-w-lg mt-8 overflow-auto" style={{ maxHeight: 'calc(100vh - 200px)' }}>
        {imageLinks.length > 0 && (
          <div className="flex flex-col gap-4">
            {imageLinks.map((link, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-white border rounded-lg shadow-md">
                <a
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="truncate w-3/4 text-gray-800"
                >
                  {link}
                </a>
                <button
                  onClick={() => copyToClipboard(link)}
                  className="p-2 text-gray-600 hover:text-blue-500 transition-colors duration-300"
                >
                  <FaCopy />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default UploadImage;
