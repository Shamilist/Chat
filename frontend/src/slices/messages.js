/* eslint-disable no-param-reassign */

import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';

import { actions as channelsActions, fetchData } from './channels.js';

const messagesAdapter = createEntityAdapter();
const initialState = messagesAdapter.getInitialState();

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    addMessage: messagesAdapter.addOne,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.fulfilled, (state, action) => {
        const { messages } = action.payload;
        messagesAdapter.addMany(state, messages);
      })
      .addCase(channelsActions.removeChannel, (state, action) => {
        const { id } = action.payload;
        const ids = Object.values(state.entities)
          .filter((message) => message.channelId === id)
          .map((message) => message.id);
        messagesAdapter.removeMany(state, ids);
      });
  },
});

export const { actions } = messagesSlice;
export default messagesSlice.reducer;
export const selectors = messagesAdapter.getSelectors((state) => state.messages);
