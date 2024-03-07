import axios from 'axios';
import React, { useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import useAuth from '../Hooks/useAuth.jsx';
import routes from '../routes.js';
import { actions as filesActions } from '../Slices/filesSlice.js';
import FileSelectionComponent from './FileSelectionComponent.jsx';

const getToken = () => {
  return JSON.parse(localStorage.getItem('userInfo')).token;
};

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
        const token = getToken();
        const response = await axios.get(routes.mediaGetPath(), {
          headers: { Authorization: `Bearer ${token}` },
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
      const token = getToken();
      await axios.post(routes.mediaUploadPath(), files, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const response = await axios.get(routes.mediaGetPath(), {
        headers: { Authorization: `Bearer ${token}` },
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
    const token = getToken();
    await axios.delete(`${routes.mediaDeletePath()}/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    dispatch(filesActions.removeFile(id)); // Удаляем файл из состояния
  };

  return (
    <div className="container h-100 my-4 overflow-hidden rounded shadow">
      <div className="row h-100 bg-white flex-md-row">
        <div>
          <h2>Список файлов:</h2>
          {uploadedFiles.map(file => (
            <span key={file.id}>
              <div>
                {file.name} <Button className="btn btn-danger" onClick={() => handleRemoveFile(file.id)}>Удалить</Button>
              </div>
            </span>
          ))}
          <br />
          <FileSelectionComponent onFileChange={handleFileChange} />
          <div className="fixed-bottom bg-secondary text-white p-3">
            <p>Количество файлов в хранилище: {count}</p>
            <p>Максимально допустимое количество файлов в хранилище: до 20</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalAccountPage;
