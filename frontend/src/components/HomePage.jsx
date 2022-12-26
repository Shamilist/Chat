import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Row, Spinner } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

import { toast } from 'react-toastify';
import axios from 'axios';
import { actions as channelsActions } from '../slices/channels.js';
import { actions as messagesActions } from '../slices/messages.js';
import routes from '../routes.js';
import Channels from './Channels.jsx';
import Messages from './Messages.jsx';
import { getModalType } from '../slices/selectors.js';
import getModal from './modals/index.js';
import { useAuth } from '../hooks/index.js';

const HomePage = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [loaded, setLoaded] = useState(false);
  const modal = useSelector(getModalType);

  const { logOut, getAuthHeader } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(routes.dataPath(), { headers: getAuthHeader() });
        const result = await response.data;
        console.log('result', result);
        const { channels, messages, currentChannelId } = result;
        dispatch(channelsActions.addChannels(channels));
        dispatch(channelsActions.setCurrentChannelId(currentChannelId));
        dispatch(messagesActions.addMessages(messages));
        setLoaded(true);
      } catch (error) {
        if (error.response.status === 401) {
          toast.error(t('errors.authorization'));
          logOut();
        } else {
          toast.error(t('errors.unknown'));
        }
      }
    };
    fetchData();
  }, [dispatch, getAuthHeader, logOut, t]);

  const modalRender = (type) => {
    if (!type) {
      return null;
    }
    const Modal = getModal(type);
    return <Modal />;
  };

  const result = () => (!loaded ? (
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
      {modalRender(modal)}
    </Container>
  ));

  return (
    <>
      { result() }
    </>
  );
};

export default HomePage;
