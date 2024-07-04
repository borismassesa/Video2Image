import React, { useState } from 'react';
import VideoUploader from './VideoUploader';
import ProcessingControls from './ProcessingControls';
import ImageGallery from './ImageGallery';
import { useVideoProcessing } from './hooks/useVideoProcessing';
import './VideoProcessor.css';


const VideoProcessor = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const { processing, progress, images, error, processVideo, reset } = useVideoProcessing();

  const handleFileSelect = (file) => {
    setSelectedFile(file);
  };

  const handleProcessVideo = () => {
    processVideo(selectedFile);
  };

  return (
    <div className="video-processor">
      <h1>Video to Image Converter</h1>
      <VideoUploader 
        selectedFile={selectedFile} 
        onFileSelect={handleFileSelect}
        error={error}
      />
      <ProcessingControls 
        selectedFile={selectedFile}
        processing={processing}
        onProcessVideo={handleProcessVideo}
        onReset={reset}
        progress={progress}
      />
      <ImageGallery images={images} />
    </div>
  );
};

export default VideoProcessor;