import { useState } from 'react';

export const useVideoProcessing = () => {
  const [processing, setProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [images, setImages] = useState([]);
  const [error, setError] = useState('');

  const processVideo = async (file) => {
    if (!file) {
      setError('Please select a video file first.');
      return;
    }

    setProcessing(true);
    setProgress(0);
    setImages([]);
    setError('');

    const formData = new FormData();
    formData.append('video', file);

    try {
      const response = await fetch('/api/process-video', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Video processing failed');
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        
        const chunk = decoder.decode(value);
        const lines = chunk.split('\n');
        
        for (const line of lines) {
          if (line.startsWith('progress:')) {
            setProgress(parseInt(line.split(':')[1]));
          } else if (line.startsWith('image:')) {
            setImages(prev => [...prev, line.split(':')[1]]);
          }
        }
      }

      setProcessing(false);
    } catch (error) {
      setError('An error occurred during video processing.');
      setProcessing(false);
    }
  };

  const reset = () => {
    setProcessing(false);
    setProgress(0);
    setImages([]);
    setError('');
  };

  return { processing, progress, images, error, processVideo, reset };
};