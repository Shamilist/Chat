import React, { useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useAuth } from '../hooks/index.js';
import HomePage from './HomePage.jsx';
import { getChannelsFetchingError } from '../slices/selectors.js';

const HomePageLoader = () => {
  const errorState = useSelector(getChannelsFetchingError);
  const { logOut } = useAuth();

  const redirectToLogin = useCallback(() => {
    logOut();
  }, [logOut]);

  useEffect(() => {
    if (errorState !== null) {
      redirectToLogin();
    }
  }, [errorState, redirectToLogin]);

  return (
    <HomePage />
  );
};

export default HomePageLoader;
