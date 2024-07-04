import React from 'react';
import { Play, RotateCcw } from 'lucide-react';

const ProcessingControls = ({ selectedFile, processing, onProcessVideo, onReset, progress }) => {
  return (
    <div className="processing-controls">
      <button 
        className="btn btn-primary"
        onClick={onProcessVideo} 
        disabled={!selectedFile || processing}
      >
        {processing ? 'Processing...' : 'Start Processing'}
        {!processing && <Play size={16} style={{ marginLeft: '5px' }} />}
      </button>
      <button 
        className="btn btn-secondary"
        onClick={onReset} 
        disabled={processing}
      >
        Reset
        <RotateCcw size={16} style={{ marginLeft: '5px' }} />
      </button>
      {processing && (
        <div className="progress-bar">
          <div 
            className="progress" 
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      )}
    </div>
  );
};

export default ProcessingControls;
