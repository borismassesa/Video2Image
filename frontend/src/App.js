import React from 'react';
import VideoProcessor from './components/VideoProcessor/VideoProcessor';
import ErrorBoundary from './components/ErrorBoundary';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Video to Image Converter</h1>
      </header>
      <main>
        <ErrorBoundary>
          <VideoProcessor />
        </ErrorBoundary>
      </main>
      <footer>
        <p>© 2024 Boris Massesa. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;