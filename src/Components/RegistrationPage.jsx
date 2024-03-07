import React, { useState } from 'react';
import { useFormik } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';
import image from '../images/image.jpg';
import routes from '../routes.js';
import cn from 'classnames';
import useAuth from '../Hooks/useAuth.jsx';

const RegistrationPage = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const {
    values, errors, touched, handleChange, handleSubmit, handleBlur, setSubmitting, isSubmitting,
  } = useFormik({
    initialValues: {
      email: '',
      password: '',
      name: '',
    },
    // eslint-disable-next-line no-shadow
    onSubmit: (values) => {
      setSubmitting(true);
      axios.post(routes.registerPath(), { email: values.email, password: values.password, name: values.name })
        .then((response) => {
          auth.logIn(response);
          navigate(routes.loginPage());
        })
        .catch((err) => {
          if (err.response.status === 422) {
            setError({
              ...errors,
            });
            setSubmitting(false);
          }
          setSubmitting(false);
        });
    },
  });

  const errorClass = cn('form-control', {
    'is-invalid': (errors.email) || (errors.password) || (errors.name) || error,
  });

  return (
    <>
      <div className="container-fluid h-100">
        <div className="row justify-content-center align-content-center h-100">
          <div className="col-12 col-md-8 col-xxl-6">
            <div className="card shadow-sm">
              <div className="card-body d-flex flex-column flex-md-row justify-content-around align-items-center p-5">
                <div>
                  <img src={image} style={{ width: '350px', height: 'auto' }} alt={'Регистрация'} />
                </div>
                <Form className="w-50" onSubmit={handleSubmit}>
                  <h1 className="text-center mb-4">{'Регистрация'}</h1>
                  <Form.Group className="form-floating mb-3">
                    <Form.Control
                      placeholder={'Email'}
                      name="email"
                      autoComplete="email"
                      required=""
                      id="email"
                      className={errorClass}
                      onChange={handleChange}
                      value={values.email}
                      onBlur={handleBlur}
                    />
                    <div className="invalid-tooltip">{errors.email}</div>
                    <Form.Label className="form-label" htmlFor="email">{'Email'}</Form.Label>
                  </Form.Group>
                  <Form.Group className="form-floating mb-3">
                    <Form.Control
                      placeholder={'Пароль'}
                      name="password"
                      aria-describedby="passwordHelpBlock"
                      required=""
                      autoComplete="new-password"
                      type="password"
                      id="password"
                      className={errorClass}
                      onChange={handleChange}
                      value={values.password}
                      onBlur={handleBlur}
                    />
                    <div className="invalid-tooltip">{errors.password}</div>
                    <Form.Label className="form-label" htmlFor="password">{'Пароль'}</Form.Label>
                  </Form.Group>
                  <Form.Group className="form-floating mb-3">
                    <Form.Control
                      placeholder={'Имя пользователя'}
                      name="name"
                      autoComplete="name"
                      required=""
                      id="name"
                      className={errorClass}
                      onChange={handleChange}
                      value={values.name}
                      onBlur={handleBlur}
                    />
                    {errors.name && <div className="invalid-tooltip">{errors.name}</div>}
                    <Form.Label className="form-label" htmlFor="name">{'Имя пользователя'}</Form.Label>
                    <Form.Control.Feedback type="invalid">{'Такой пользователь уже существует'}</Form.Control.Feedback>
                  </Form.Group>
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-100 mb-3 btn btn-primary"
                  >
                    {'Зарегистрироваться'}
                  </Button>
                </Form>
              </div>
              <div className="card-footer p-4">
                <div className="text-center">
                  <span>{'Уже есть аккаунт? '}</span>
                  <Link to={routes.loginPage()}>{'Войти под своим аккаунтом'}</Link>
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

export default RegistrationPage;
