import React from 'react';

// определяем компонент, отвечающий за выбор документов для загрузки:

const FileSelectionComponent = ({ onFileChange }) => {
  const handleFileChange = (event) => {
    const files = event.target.files;
    onFileChange(files);;
  };

  return (
    <div>
      <label htmlFor="file-upload" className="btn btn-primary">
        Выбрать файлы для загрузки в хранилище
      </label>
      <input id="file-upload" type="file" className="form-control form-control-lg" onChange={handleFileChange} multiple style={{ display: 'none' }} />
    </div>
  );
};

export default FileSelectionComponent;