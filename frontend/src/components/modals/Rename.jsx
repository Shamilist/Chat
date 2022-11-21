import React, { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Modal, Form, Button } from 'react-bootstrap';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { useChat } from '../../hooks/index.js';
import { getItemId, getAllChannels } from '../../slices/selectors.js';
import { actions as modalsActions } from '../../slices/modals.js';

const Rename = () => {
  const dispatch = useDispatch();
  const inputEl = useRef();
  const chat = useChat();
  const { t } = useTranslation();
  const allChannels = useSelector(getAllChannels);
  const itemId = useSelector(getItemId);
  const renamedChannel = allChannels.find((channel) => channel.id === itemId);

  useEffect(() => {
    inputEl.current.select();
  }, []);

  const validationSchema = yup.object().shape({
    name: yup
      .string()
      .trim()
      .min(3, t('modalRename.channelConstraints'))
      .max(20, t('modalRename.channelConstraints'))
      .notOneOf(allChannels.map((channel) => channel.name), t('modalRename.unique'))
      .required(t('modalRename.required')),
  });

  const formik = useFormik({
    initialValues: {
      name: renamedChannel.name,
    },
    validationSchema,
    onSubmit: (values) => {
      toast.success(t('modalRename.success'));
      chat.renameChannel({ id: itemId, name: values.name });
      dispatch(modalsActions.hideModal());
    },
  });

  return (
    <Modal show centered>
      <Modal.Header closeButton onHide={() => dispatch(modalsActions.hideModal())}>
        <Modal.Title>{t('modalRename.renameChannel')}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Control
            className="mb-2"
            onChange={formik.handleChange}
            ref={inputEl}
            id="name"
            name="name"
            value={formik.values.name}
            isInvalid={formik.errors.name && formik.touched.name}
          />
          <Form.Label className="visually-hidden" htmlFor="name">{t('modalRename.name')}</Form.Label>
          <Form.Control.Feedback type="invalid">
            {formik.errors.name}
          </Form.Control.Feedback>
          <div className="d-flex justify-content-end">
            <Button
              className="me-2"
              variant="secondary"
              onClick={() => dispatch(modalsActions.hideModal())}
            >
              {t('modalRename.cancel')}
            </Button>
            <Button type="submit" variant="primary">{t('modalRename.send')}</Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default Rename;
