import axios from 'axios';
import React, { useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import useAuth from '../Hooks/useAuth.jsx';
import routes from '../routes.js';
import { actions as filesActions } from '../Slices/filesSlice.js';
import FileSelectionComponent from './FileSelectionComponent.jsx';
import image2 from '../images/image2.jpg';
import image3 from '../images/image3.jpg';


const PersonalAccountPage = () => {
  const getToken = () => {
    return JSON.parse(localStorage.getItem('userInfo')).token;
  };
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
      if (error) {
        if (error.message === 'Request failed with status code 470') {
          alert('Внимание! Превышено допустимое количество файлов в хранилище (20 штук)');
        }
        if (error.message === 'Network Error') {
          alert('Внимание! Превышен допустимый размер файла (за 1 запрос - 1MБ)');
        }
      } else {
        console.error('Произошла ошибка:', error);
      }
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

  const handleDownloadFile = async (id) => {
    try {
      const token = getToken();
      const response = await axios.get(`${routes.mediaIdGetPath()}/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
        responseType: 'blob',
      });

      const fileName = uploadedFiles.filter(file => file.id === id)[0].fileName;
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', fileName);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error('Произошла ошибка при скачивании файла:', error);
    }
  };

  return (
    <div className="container my-4">
      <h2>Количество файлов в хранилище: {count}</h2>
      <FileSelectionComponent onFileChange={handleFileChange} />
      <h3 className="text-center">Список файлов:</h3>
      <div>
        <div className="row">
          {uploadedFiles.map(file => {
            const mimeTypeParts = file.mimeType.split('/');
            const fileType = mimeTypeParts[0];
            return (
              <div key={file.id} className="col-lg-2 col-md-3 col-sm-4" style={{ padding: '10px' }} >
                <div className="card">
                  <div className="card-body text-center">
                    {fileType === 'image' ? (
                      <img src={image3} alt={file.name} style={{ maxWidth: '100px', height: '100px' }} />
                    ) : (
                      <img src={image2} alt={file.name} style={{ maxWidth: '100px', height: '100px' }} />
                    )} <br /><span className="card-title">{file.fileName}</span>
                    <div>
                      <Button className="btn btn-info" onClick={() => handleDownloadFile(file.id)}>Скачать</Button>
                      <Button className="btn btn-light" onClick={() => handleRemoveFile(file.id)}>Удалить</Button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default PersonalAccountPage;
