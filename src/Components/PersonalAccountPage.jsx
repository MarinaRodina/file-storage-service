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

  const handleDownloadFile = async (id) => {
    try {
      const token = getToken();
      const response = await axios.get(`${routes.mediaIdGetPath()}/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
        responseType: 'blob',
      });

      const disposition = response.headers['content-disposition'];
      const fileNameRegex = /filename\*?=['"]?(?:UTF-\d['"]? )?([^;\r\n"']+)/i;
      const matches = fileNameRegex.exec(disposition);
      let fileName = 'file'; // Default filename if not found in response headers

      if (matches !== null && matches[1]) {
        fileName = decodeURIComponent(matches[1]);
      }

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
      <h2 className="text-center">Список файлов:</h2>
      <div style={{ maxHeight: "600px", overflow: "auto" }}>
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
          {uploadedFiles.map(file => {
            const mimeTypeParts = file.mimeType.split('/');
            const fileType = mimeTypeParts[0];
            return (
              <div key={file.id} className="col-6 col-md-4 col-lg-3">
                <div className="card">
                  <div className="card-body">
                    {fileType === 'image' ? (
                      <img src={image3} alt={file.name} style={{ maxWidth: '15%', height: 'auto' }} />
                    ) : (
                      <img src={image2} alt={file.name} style={{ maxWidth: '15%', height: 'auto' }} />
                    )} <span className="card-title">{file.fileName}</span>
                    <div>
                      <Button className="btn btn-success" onClick={() => handleDownloadFile(file.id)}>Скачать</Button>
                      <Button variant="danger" onClick={() => handleRemoveFile(file.id)}>Удалить</Button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <br />
      <FileSelectionComponent onFileChange={handleFileChange} />
      <div className="fixed-bottom bg-secondary text-white p-3">
        <p>Количество файлов в хранилище: {count}</p>
        <p>Максимально допустимое количество файлов в хранилище: до 20</p>
      </div>
    </div>
  );
};

export default PersonalAccountPage;
