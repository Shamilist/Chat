import React from 'react';
import { Provider as StoreProvider } from 'react-redux';
import i18next from 'i18next';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import leoProfanity from 'leo-profanity';
import { Provider as RollbarProvider, ErrorBoundary } from '@rollbar/react';
import App from './components/App.jsx';
import resources from './locales/index.js';
import store from './slices/index.js';
import ApiProvider from './contexts/ApiProvider.jsx';
import createAPI from './contexts/api.js';

const rollbarConfig = {
  accessToken: process.env.ACCESSTOKEN,
  environment: 'production',
  captureUncaught: true,
  captureUnhandledRejections: true,
};

const init = async (socket) => {
  const api = createAPI(socket);
  const i18n = i18next.createInstance();

  await i18n
    .use(initReactI18next)
    .init({
      resources,
      fallbackLng: 'ru',
    });

  leoProfanity.clearList();
  leoProfanity.add(leoProfanity.getDictionary('ru'));
  leoProfanity.add(leoProfanity.getDictionary('eng'));

  return (
    <RollbarProvider config={rollbarConfig}>
      <ErrorBoundary>
        <StoreProvider store={store}>
          <ApiProvider api={api}>
            <I18nextProvider i18n={i18n}>
              <App />
            </I18nextProvider>
          </ApiProvider>
        </StoreProvider>
      </ErrorBoundary>
    </RollbarProvider>
  );
};

export default init;
