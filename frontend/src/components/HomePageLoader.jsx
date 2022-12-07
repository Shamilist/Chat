import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useAuth } from '../hooks/index.js';
import HomePage from './HomePage.jsx';
import { getChannelsFetchingError } from '../slices/selectors.js';

const HomePageLoader = () => {
  const errorState = useSelector(getChannelsFetchingError);
  const { logOut } = useAuth();

  useEffect(() => {
    if (errorState !== null && errorState.name === 'TokenExpiredError') {
      logOut();
    }
  }, [errorState, logOut]);

  return (
    <HomePage />
  );
};

export default HomePageLoader;
