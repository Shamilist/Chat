/* eslint-disable import/prefer-default-export */

import { selectors as channelsSelectors } from './channels.js';
import { selectors as messagesSelectors } from './messages.js';

export const getAllChannels = (state) => channelsSelectors.selectAll(state);
export const getCurrentChannelId = (state) => state.channels.getCurrentChannelId;
export const getCurrentChannel = (state) => {
  const currentChanelId = getCurrentChannelId(state);
  return channelsSelectors.selectById(state, currentChanelId);
};
export const isDataFetching = (state) => state.channels.fetching;

export const getAllMessages = (state) => messagesSelectors.selectAll(state);
