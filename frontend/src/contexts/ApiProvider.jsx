/* eslint-disable react/jsx-no-constructed-context-values */

import React from 'react';

import { ApiContext } from './index.js';

const ApiProvider = ({ api, children }) => {
  const {
    addNewMessage,
    addNewChannel,
    renameChannel,
    removeChannel,
  } = api;

  return (
    <ApiContext.Provider value={{
      addNewMessage,
      addNewChannel,
      renameChannel,
      removeChannel,
    }}
    >
      {children}
    </ApiContext.Provider>
  );
};

export default ApiProvider;
