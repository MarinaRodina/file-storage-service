import axios from 'axios';
import React, { useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import useAuth from '../Hooks/useAuth.jsx';
import routes from '../routes.js';
import { actions as filesActions } from '../Slices/filesSlice.js';
import FileSelectionComponent from './FileSelectionComponent.jsx';

const PersonalAccountPage = () => {
  const navigate = useNavigate();
  const auth = useAuth();

  const uploadedFiles = useSelector((state) => state.filesReducer.uploadedFiles) || [];
  const dispatch = useDispatch();

  const count = useSelector((state) => state.filesReducer.uploadedFilesCount);

  useEffect(() => {
    if (!localStorage.getItem('userInfo')) {
      navigate(routes.loginPage());
    }
  }, [navigate]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(routes.mediaGetPath(), {
          headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem('userInfo')).token}` },
        });
        dispatch(filesActions.updateFiles(response.data));
      } catch (error) {
        if (error.status === 401) {
          navigate(routes.loginPage());
        }
        console.log(error);
      }
    };
    fetchData();
  }, [dispatch, auth, navigate]);

  const handleAddFile = async (files) => {
    try {
      await axios.post(routes.mediaUploadPath(), files, {
        headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem('userInfo')).token}` },
      });
      console.log("Длина массива загруженных файлов:", uploadedFiles.length);
      //dispatch(filesActions.addFile(files));
      //console.log("Длина массива загруженных файлов:", uploadedFiles.length);
      const response = await axios.get(routes.mediaGetPath(), {
        headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem('userInfo')).token}` },
      });
      dispatch(filesActions.updateFiles(response.data));
    } catch (error) {
      console.error('Произошла ошибка при загрузке файла:', error);
    }
  };

  const handleFileChange = async (files) => {
    if (files.length > 0) {
      await handleAddFile(files);
    }
  };

  const handleRemoveFile = async (id) => {
    await axios.delete(`${routes.mediaDeletePath()}/${id}`, {
      headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem('userInfo')).token}` },
    });
    dispatch(filesActions.removeFile(id)); // Удаляем файл из состояния
  };

  return (
    <div className="container h-100 my-4 overflow-hidden rounded shadow">
      <div className="row h-100 bg-white flex-md-row">
        <div>
          <h2>Список файлов:</h2>
          <ul>
            {uploadedFiles.map(file => (
              <li key={file.id}>
                <div>{file.name}</div>
                <button className="btn btn-danger" onClick={() => handleRemoveFile(file.id)}>Удалить</button>
              </li>
            ))}
          </ul>
          <FileSelectionComponent onFileChange={handleFileChange} />
          <Button type="button" className="btn btn-primary" onClick={handleAddFile}>
            Добавить файл в хранилище документов</Button>
          <div className="fixed-bottom bg-secondary text-white p-3">Количество файлов: {count}</div>
        </div>
      </div>
    </div>
  );
};

export default PersonalAccountPage;
