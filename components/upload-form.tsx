'use client';

import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid'; // Import UUID library
import { useRouter } from 'next/navigation'; // Import useRouter from next/navigation

export default function UploadForm() {
  const [videoId, setVideoId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null); // State for error messages
  const router = useRouter(); // Initialize the router

  useEffect(() => {
    // Generate a unique identifier for the video
    const id = uuidv4();
    setVideoId(id);
    // Store the identifier in the session storage
    sessionStorage.setItem('videoId', id);
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    
    // Log form data for debugging
    const entries = Array.from(formData.entries());
    for (let [key, value] of entries) {
      console.log(`${key}: ${value}`);
    }
    
    // Check if the file is present and log its details
    const file = formData.get('file');
    if (file instanceof File) {
      console.log(`File name: ${file.name}`);
      console.log(`File type: ${file.type}`);
      console.log(`File size: ${file.size}`);
    } else {
      console.error('No file found in the form data.');
      setError('No file found. Please select a file to upload.');
      return;
    }

    // Append the unique video identifier to the form data
    if (videoId) {
      formData.append('videoId', videoId);
    } else {
      console.error('No video ID found.');
      setError('An error occurred. Please try again.');
      return;
    }

    try {
      const response = await fetch('http://localhost:8000/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        setError(null); // Clear any previous errors
        router.push('/generate'); // Redirect to the generate page
      } else if (response.status === 422) {
        setError('Unprocessable Entity: Please check the uploaded file and try again.');
      } else {
        setError('Failed to upload video.');
      }
    } catch (error) {
      console.error('Error uploading video:', error);
      setError('An error occurred while uploading the video.');
    }
  };

  return (
    <form className="mx-auto max-w-[400px]" onSubmit={handleSubmit}>
      <div>
        <label
          className="mb-1 block text-sm font-medium text-indigo-200/65"
          htmlFor="file"
        >
          Video File
        </label>
        <input
          id="file"
          name="file"
          type="file"
          className="form-input w-full"
          accept=".mp4, .mov, .3gp, .avi"
          required
        />
      </div>
      {error && (
        <div className="mt-4 text-red-500">
          {error}
        </div>
      )}
      <div className="mt-6">
        <button className="btn w-full bg-gradient-to-t from-indigo-600 to-indigo-500 bg-[length:100%_100%] bg-[bottom] text-white shadow-[inset_0px_1px_0px_0px_theme(colors.white/.16)] hover:bg-[length:100%_150%]">
          Загрузить
        </button>
      </div>
    </form>
  );
}
