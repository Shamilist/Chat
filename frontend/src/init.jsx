import React from 'react';
import { Provider as StoreProvider } from 'react-redux';
import i18next from 'i18next';
import { I18nextProvider, initReactI18next } from 'react-i18next';

import App from './components/App.jsx';
import resources from './locales/index.js';
import store from './slices/index.js';
import ApiProvider from './contexts/ApiProvider.jsx';
import createAPI from './context/api.js';

const init = async (socket) => {
  const api = createAPI(socket);
  const i18n = i18next.createInstance();

  await i18n
    .use(initReactI18next)
    .init({
      resources,
      fallbackLng: 'ru',
    });

  return (
    <StoreProvider store={store}>
      <ApiProvider api={api}>
        <I18nextProvider i18n={i18n}>
          <App />
        </I18nextProvider>
      </ApiProvider>
    </StoreProvider>
  );
};

export default init;
