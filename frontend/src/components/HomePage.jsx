import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Row, Spinner } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

import Channels from './Channels.jsx';
import Messages from './Messages.jsx';
import { isDataFetching } from '../slices/selectors.js';
import { fetchData } from '../slices/channels.js';

const HomePage = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const spinner = useSelector(isDataFetching);

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  const result = () => (spinner ? (
    <div className="h-100 d-flex justify-content-center align-items-center">
      <Spinner animation="border" role="status" variant="primary">
        <span className="visually-hidden">{t('loading')}</span>
      </Spinner>
    </div>
  ) : (
    <Container className="h-100 my-4 overflow-hidden rounded shadow">
      <Row className="h-100 bg-white flex-md-row">
        <Channels />
        <Messages />
      </Row>
    </Container>
  ));

  return (
    <>
      { result() }
    </>
  );
};

export default HomePage;
