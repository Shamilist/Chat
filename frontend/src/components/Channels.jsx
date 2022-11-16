import React from 'react';
import cn from 'classnames';
import {
  Col,
  Button,
  Nav,
  Dropdown,
  ButtonGroup,
} from 'react-bootstrap';

import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { PlusSquare } from 'react-bootstrap-icons';
import { getAllChannels, getCurrentChannelId, getCurrentChannelId } from '../slices/selectors.js';
import { actions as channelsActions } from '../slices/channelsSlice.js';

const Channels = () => {
const dispatch = useDispatch();
const { t } = useTranslation();
const channels = useSelector(getAllChannels);
const getCurrentChannelId = useSelector(getCurrentChannelId);

const channelsRender = () => {
    const handleCLick = (id) => {
        dispatch(channelsActions.setCurrentChannelId(id));
    }



}
}

export default Channels;
