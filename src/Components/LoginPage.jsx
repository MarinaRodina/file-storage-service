import React, { useState } from 'react';
import { useFormik } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';
import image1 from '../images/image1.jpg';
import routes from '../routes.js';
import cn from 'classnames';
import useAuth from '../Hooks/useAuth.jsx';

const LoginPage = () => {
  const auth = useAuth();
  const navigate = useNavigate();

  const [error, setError] = useState('');

  const {
    values, errors, handleChange, handleSubmit, setSubmitting, isSubmitting,
  } = useFormik({
    initialValues: {
      emaii: '',
      password: '',
    },
    validateOnChange: false,
    errorToken: false,
    onSubmit: () => {
      setSubmitting(true);
      axios.post(routes.loginPath(), { email: values.email, password: values.password })
        .then((response) => {
          auth.logIn(response);
          navigate(routes.accountPage());
        })
        .catch((err) => {
          if (err.status === 401) {
            setError('Неверные email пользователя или пароль');
            setSubmitting(false);
          }
          setSubmitting(false);
        })
        .finally(() => {
          setSubmitting(true);
        });
    },
  });

  const errorClass = cn('form-control', {
    'is-invalid': (errors.password) || (errors.username) || error,
  });

  return (
    <>
      <div className="container-fluid h-100">
        <div className="row justify-content-center align-content-center h-100">
          <div className="col-12 col-md-8 col-xxl-6">
            <div className="card shadow-sm">
              <div className="card-body row p-5">
                <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
                  <img src={image1} style={{ width: '350px', height: 'auto' }} alt={'Войти'} />
                </div>
                <Form className="col-12 col-md-6 mt-3 mt-mb-0" onSubmit={handleSubmit}>
                  <h1 className="text-center mb-4">{'Войти'}</h1>
                  <Form.Group className="form-floating mb-3">
                    <Form.Control
                      name="email"
                      autoComplete="email"
                      required=""
                      placeholder={'Email'}
                      id="email"
                      className={errorClass}
                      value={values.email}
                      onChange={handleChange}
                    />
                    <Form.Label htmlFor="email">{'Email'}</Form.Label>
                  </Form.Group>
                  <Form.Group className="form-floating mb-4">
                    <Form.Control
                      name="password"
                      autoComplete="current-password"
                      required=""
                      placeholder={'Пароль'}
                      type="password"
                      id="password"
                      className={errorClass}
                      value={values.password}
                      onChange={handleChange}
                    />
                    <Form.Label className="form-label" htmlFor="password">{'Пароль'}</Form.Label>
                    <Form.Control.Feedback type="invalid">{'Неверные email пользователя или пароль'}</Form.Control.Feedback>
                  </Form.Group>
                  <Button
                    disabled={isSubmitting}
                    type="submit"
                    className="w-100 mb-3 btn btn-primary"
                  >
                    {'Войти'}
                  </Button>
                </Form>
              </div>
              <div className="card-footer p-4">
                <div className="text-center">
                  <span>{'Нет аккаунта? '}</span>
                  <Link to={routes.registrationPage()}>{'Регистрация'}</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="Toastify" />
    </>
  );
};

export default LoginPage;
