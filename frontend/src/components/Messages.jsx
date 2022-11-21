import React, { useRef, useEffect } from 'react';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Form, InputGroup, Button } from 'react-bootstrap';
import { ArrowRightSquare } from 'react-bootstrap-icons';
import leoProfanity from 'leo-profanity';
import { useAuth, useChat } from '../hooks/index.js';
import { getCurrentChannelId, getCurrentChannel, getAllMessages } from '../slices/selectors.js';
import Message from './Message.jsx';

const Messages = () => {
  const inputEl = useRef();
  const lastMessagEl = useRef();
  const auth = useAuth();
  const chat = useChat();
  const { t } = useTranslation();
  const currentChannelId = useSelector(getCurrentChannelId);
  const currentChannel = useSelector(getCurrentChannel);

  const currentMessages = useSelector(getAllMessages)
    .filter((m) => m.channelId === currentChannelId);

  useEffect(() => {
    inputEl.current.focus();
  });

  useEffect(() => {
    lastMessagEl.current.scrollIntoView({
      behavior: 'smooth',
    });
  }, [currentMessages]);

  const validationSchema = yup.object().shape({
    body: yup
      .string()
      .trim()
      .required(),
  });

  const formik = useFormik(
    {
      initialValues: {
        body: '',
      },
      validationSchema,
      onSubmit: (values) => {
        const { body } = values;
        const filteredBody = leoProfanity.clean(body);
        const channelId = currentChannelId;
        const { username } = auth.user;
        const data = {
          body: filteredBody,
          channelId,
          username,
        };
        chat.addNewMessage(data);
        formik.resetForm();
      },
    },
  );

  const renderMessages = () => {
    currentMessages.map((message) => (
      <Message key={message.id} content={message} />
    ));
  };

  return (
    <div className="col p-0 h-100">
      <div className="d-flex flex-column h-100">
        <div className="bg-light mb-4 p-3 shadow-sm small">
          <p className="m-0">
            <b>{`# ${currentChannel?.name}`}</b>
          </p>
          <span className="text-muted">
            {t('messages.counter.key', { count: currentMessages.length })}
          </span>
        </div>
        <div id="messages-box" className="chat-messages overflow-auto px-5">
          {renderMessages()}
          <span ref={lastMessagEl} />
        </div>
        <div className="mt-auto px-5 py-3">
          <Form className="py-1 border rounded-2" onSubmit={formik.handleSubmit}>
            <InputGroup>
              <Form.Control
                className="border-0 p-0 ps-2"
                name="body"
                aria-label={t('messages.new')}
                placeholder={t('messages.input')}
                onChange={formik.handleChange}
                value={formik.values.body}
                ref={inputEl}
                disabled={formik.isSubmitting}
              />
              <Button
                className="btn-group-vertical"
                type="submit"
                variant="link"
                disabled={formik.errors.body || !formik.values.body}
              >
                <ArrowRightSquare />
                <span className="visually-hidden">{t('messages.send')}</span>
              </Button>
            </InputGroup>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Messages;
