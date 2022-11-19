/* eslint-disable no-param-reassign */

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  modalType: null,
  itemId: null,
};

const modalsSlice = createSlice(
  {
    name: 'modals',
    initialState,
    reducers: {
      showModal: ((state, action) => {
        state.modalType = action.payload.modalType;
        state.itemId = action.payload.itemId;
      }),
      hideModal: ((state) => {
        state.modalType = null;
        state.itemId = null;
      }),
    },
  },
);

export const { actions } = modalsSlice;

export default modalsSlice.reducer;
