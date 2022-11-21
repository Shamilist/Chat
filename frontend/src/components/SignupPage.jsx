import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button, Form } from 'react-bootstrap';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import routes from '../routes.js';
import { useAuth } from '../hooks/index.js';
import image from '../assets/avatar_1.jpg';

const SignupPage = () => {
  const auth = useAuth();
  const inputEl = useRef();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [registrationFailed, setFailed] = useState(false);

  useEffect(() => {
    inputEl.current.focus();
  }, []);

  const validationSchema = yup.object().shape({
    username: yup
      .string()
      .trim()
      .min(3, t('signup.usernameConstraints'))
      .max(20, t('signup.usernameConstraints'))
      .required(t('signup.required')),
    password: yup
      .string()
      .trim()
      .min(6, t('signup.passMin'))
      .required(t('signup.required')),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password')], t('signup.mustMatch')),
  });

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      setFailed(false);
      try {
        const response = await axios.post(
          routes.signupPath(),
          { username: values.username, password: values.password },
        );
        auth.logIn(response.data);
        navigate('/');
      } catch (err) {
        console.log(err);
        if (err.isAxiosError) {
          if (err.response.status === 409) {
            setFailed(true);
            inputEl.current.select();
          } else {
            toast.error(t('errors.network'));
          }
        } else {
          toast.error(t('errors.unknown'));
          throw err;
        }
      }
    },
  });

  return (
    <div className="container-fluid h-100">
      <div className="row justify-content-center align-content-center h-100">
        <div className="col-12 col-md-8 col-xxl-6">
          <div className="card shadow-sm">
            <div className="card-body d-flex flex-column flex-md-row justify-content-around align-items-center p-5">
              <div>
                <img
                  className="rounded-circle"
                  src={image}
                  alt={t('signup.header')}
                />
              </div>
              <Form className="w-50" onSubmit={formik.handleSubmit}>
                <h1 className="text-center mb-4">{t('signup.header')}</h1>
                <Form.Group className="form-floating mb-3">
                  <Form.Control
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.username}
                    placeholder={t('signup.usernameConstraints')}
                    name="username"
                    id="username"
                    autoComplete="username"
                    isInvalid={
                      (formik.errors.username && formik.touched.username)
                      || registrationFailed
                    }
                    required
                    ref={inputEl}
                  />
                  <Form.Label htmlFor="username">{t('signup.username')}</Form.Label>
                  <Form.Control.Feedback type="invalid" tooltip placement="right">
                    {formik.errors.username}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="form-floating mb-3">
                  <Form.Control
                    type="password"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.password}
                    placeholder={t('signup.passMin')}
                    name="password"
                    id="password"
                    aria-describedby="passwordHelpBlock"
                    isInvalid={
                      (formik.errors.password && formik.touched.password)
                      || registrationFailed
                    }
                    required
                    autoComplete="new-password"
                  />
                  <Form.Control.Feedback type="invalid" tooltip>
                    {formik.errors.password}
                  </Form.Control.Feedback>
                  <Form.Label htmlFor="password">{t('signup.password')}</Form.Label>
                </Form.Group>
                <Form.Group className="form-floating mb-4">
                  <Form.Control
                    type="password"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.confirmPassword}
                    placeholder={t('signup.mustMatch')}
                    name="confirmPassword"
                    id="confirmPassword"
                    isInvalid={
                      (formik.errors.confirmPassword && formik.touched.confirmPassword)
                      || registrationFailed
                    }
                    required
                    autoComplete="new-password"
                  />
                  <Form.Control.Feedback type="invalid" tooltip>
                    {registrationFailed ? t('signup.alreadyExists') : formik.errors.confirmPassword}
                  </Form.Control.Feedback>
                  <Form.Label htmlFor="confirmPassword">{t('signup.confirm')}</Form.Label>
                </Form.Group>
                <Button className="w-100" type="submit" variant="outline-primary">{t('signup.submit')}</Button>
              </Form>
            </div>
            <div className="card-footer p-4">
              <div className="text-center">
                <span>{t('signup.hasAccount')}</span>
                {' '}
                <a href="/login">{t('login.header')}</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
