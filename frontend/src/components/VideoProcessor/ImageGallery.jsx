import React from 'react';

const ImageGallery = ({ images }) => {
  if (images.length === 0) return null;

  return (
    <div className="image-gallery">
      <h2>Processed Images</h2>
      <div className="image-grid">
        {images.map((image, index) => (
          <div key={index} className="image-item">
            <img src={`http://localhost:5001/api/images/${image}`} alt={`Frame ${index}`} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageGallery;