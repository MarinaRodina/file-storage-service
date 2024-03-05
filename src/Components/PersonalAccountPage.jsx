import axios from 'axios';
import React, { useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import useAuth from '../Hooks/useAuth.jsx';
import routes from '../routes.js';
import { actions as filesActions } from '../Slices/filesSlice.js';

const PersonalAccountPage = () => {
  const navigate = useNavigate();
  const auth = useAuth();

  const uploadedFiles = useSelector((state) => state.filesReducer.files) || [];
  const dispatch = useDispatch();

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
        console.log(response.data.files);
        dispatch(filesActions.displayFile(response.data.files));

      } catch (error) {
        if (error.status === 401) {
          navigate(routes.loginPage());
        }
        console.log(error);
      }
    };
    fetchData();
  }, [dispatch, auth, navigate]);

  const handleAddFile = async (file) => {
    await axios.post(routes.mediaUploadPath(), {
      headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem('userInfo')).token}` },
    });
    dispatch(filesActions.addFile(file)); // Добавляем файл в состояние
  };

  const handleRemoveFile = async (id) => {
    await axios.delete(routes.mediaDeletePath(), {
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
                {file.name}
                <button onClick={() => handleRemoveFile(file.id)}>Удалить</button>
              </li>
            ))}
          </ul>
          <Button type="button" className="btn btn-primary" onClick={() => handleAddFile({
            id: {},
            name: '',
            fileName: '',
            mimeType: '',
            url: '',
            createdAt: {},
          })}>
            Добавить файл</Button>
        </div>
      </div>
    </div>
  );
};

export default PersonalAccountPage;
