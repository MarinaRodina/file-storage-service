import React from 'react';

const FileSelectionComponent = ({ onFileChange }) => {
  const handleFileChange = (event) => {
    const files = event.target.files;
    onFileChange(files);;
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} multiple />
    </div>
  );
};

export default FileSelectionComponent;