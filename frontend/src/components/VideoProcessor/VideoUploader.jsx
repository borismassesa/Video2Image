import React, { useRef } from 'react';
import { Upload } from 'lucide-react';

const VideoUploader = ({ selectedFile, onFileSelect, error }) => {
  const fileInputRef = useRef(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith('video/')) {
      onFileSelect(file);
    } else {
      onFileSelect(null);
      alert('Please select a valid video file.');
    }
  };

  return (
    <div className="video-uploader" onClick={() => fileInputRef.current.click()}>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="video/*"
        style={{ display: 'none' }}
      />
      <Upload size={48} color="#4a90e2" />
      <p>{selectedFile ? `Selected: ${selectedFile.name}` : 'Click or drag to upload a video'}</p>
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default VideoUploader;