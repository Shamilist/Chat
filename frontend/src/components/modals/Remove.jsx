import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Modal, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { useChat } from '../../hooks/index.js';
import { getItemId } from '../../slices/selectors.js';
import { actions as modalsActions } from '../../slices/modals.js';
import { actions as channelsActions } from '../../slices/channels.js';

const Remove = () => {
  const dispatch = useDispatch();
  const chat = useChat();
  const { t } = useTranslation();
  const itemId = useSelector(getItemId);

  const handleRemove = (id) => {
    toast.success(t('modalRemove.success'));
    chat.removeChannel(id);
    dispatch(channelsActions.setCurrentChannelId(1));
    dispatch(modalsActions.hideModal());
  };

  return (
    <Modal show centered>
      <Modal.Header closeButton onHide={() => dispatch(modalsActions.hideModal())}>
        <Modal.Title>{t('modalRemove.removeChannel')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="lead">{t('modalRemove.confirm')}</p>
        <div className="d-flex justify-content-end">
          <Button
            className="me-2"
            variant="secondary"
            onClick={() => dispatch(modalsActions.hideModal())}
          >
            {t('modalRemove.cancel')}
          </Button>
          <Button
            type="submit"
            variant="danger"
            onClick={() => handleRemove(itemId)}
          >
            {t('modalRemove.remove')}
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default Remove;
