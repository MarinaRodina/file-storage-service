import React from 'react';

// определяем компонент, отвечающий за выбор документов для загрузки:

const FileSelectionComponent = ({ onFileChange }) => {
  const handleFileChange = (event) => {
    const files = event.target.files;
    onFileChange(files);;
  };

  return (
    <div>
      <input type="file" className="form-control form-control-lg" onChange={handleFileChange} multiple />
    </div>
  );
};

export default FileSelectionComponent;