import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { useFormik } from 'formik';
import { Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { useTranslation } from 'react-i18next';

import { useAuth } from '../hooks/index.js';
import routes from '../routes.js';
import image from '../assets/avatar.jpg';

const LoginPage = () => {
  const [err, setError] = useState(false);

  const auth = useAuth();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const inputEl = useRef(null);

  useEffect(() => { inputEl.current.focus(); }, []);

  const validationSchema = yup.object().shape({
    username: yup
      .string()
      .trim()
      .required(t('login.required')),
    password: yup
      .string()
      .trim()
      .required(t('login.required')),
  });

  const formik = useFormik(
    {
      initialValues: {
        username: '',
        password: '',
      },
      validationSchema,
      onSubmit: async ({ username, password }) => {
        setError(false);

        try {
          const response = await axios.post(routes.loginPath(), { username, password });
          const { data } = response;
          auth.logIn(data);
          navigate('/');
        } catch (error) {
          console.log(error);
          if (error.isAxiosError) {
            if (error.response.status === 401) {
              setError(true);
              inputEl.current.select();
            } else {
              (t('errors.network'));
            }
          } else {
            (t('errors.unknown'));
            throw err;
          }
        }
      },
    },
  );

  return (
    <div className="container-fluid h-100 mt-5">
      <div className="row justify-content-center align-content-center h-100">
        <div className="col-12 col-md-8 col-xxl-6">
          <div className="card shadow-sm">
            <div className="card-body row p-5">
              <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
                <img
                  src={image}
                  className="rounded-circle"
                  alt={t('login.header')}
                />
              </div>
              <Form onSubmit={formik.handleSubmit} className="col-12 col-md-6 mt-3 mt-mb-0">
                <h1 className="text-center mb-4">{t('login.header')}</h1>
                <Form.Group className="form-floating mb-3">
                  <Form.Control
                    onChange={formik.handleChange}
                    value={formik.values.username}
                    name="username"
                    id="username"
                    autoComplete="username"
                    isInvalid={err}
                    required
                    ref={inputEl}
                    placeholder={t('login.username')}
                  />
                  <Form.Label htmlFor="username">{t('login.username')}</Form.Label>
                </Form.Group>
                <Form.Group className="form-floating mb-4">
                  <Form.Control
                    onChange={formik.handleChange}
                    value={formik.values.password}
                    id="password"
                    isInvalid={err}
                    name="password"
                    autoComplete="current-password"
                    type="password"
                    required
                    placeholder={t('login.password')}
                  />
                  <Form.Label htmlFor="password">{t('login.password')}</Form.Label>
                  <Form.Control.Feedback type="invalid">
                    {t('login.authFailed')}
                  </Form.Control.Feedback>
                </Form.Group>
                <Button type="submit" variant="outline-primary" className="w-100 mb-3">{t('login.submit')}</Button>
              </Form>
            </div>
            <div className="card-footer p-4">
              <div className="text-center">
                <span>{t('login.newToChat')}</span>
                {' '}
                <a href="/signup">{t('login.signup')}</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
