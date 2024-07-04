export const handleDragEnter = (e, setSelectedFile) => {
    e.preventDefault();
    e.stopPropagation();
    e.currentTarget.classList.add('dragover');
  };
  
  export const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    e.currentTarget.classList.remove('dragover');
  };
  
  export const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };
  
  export const handleDrop = (e, setSelectedFile) => {
    e.preventDefault();
    e.stopPropagation();
    e.currentTarget.classList.remove('dragover');
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('video/')) {
      setSelectedFile(file);
    } else {
      setSelectedFile(null);
    }
  };