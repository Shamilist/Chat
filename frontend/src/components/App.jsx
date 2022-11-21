import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet,
} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Header from './Header.jsx';
import LoginPage from './LoginPage.jsx';
import PageNotFound from './PageNotFound.jsx';
import HomePage from './HomePage.jsx';
import SignupPage from './SignupPage.jsx';

import AuthProvider from '../contexts/AuthProvider.jsx';
import { useAuth } from '../hooks/index.js';

const PrivateOutlet = ({ toHomePage } = false) => {
  const auth = useAuth();

  if (toHomePage) {
    return auth.user ? <Outlet /> : <Navigate to="/login" />;
  }
  return auth.user ? <Navigate to="/" /> : <Outlet />;
};

const App = () => (
  <AuthProvider>
    <BrowserRouter>
      <div className="d-flex flex-column h-100">
        <Header />
        <Routes>
          <Route path="/" element={<PrivateOutlet toHomePage />}>
            <Route path="" element={<HomePage />} />
          </Route>
          <Route path="/login" element={<PrivateOutlet />}>
            <Route path="" element={<LoginPage />} />
          </Route>
          <Route path="/signup" element={<PrivateOutlet />}>
            <Route path="" element={<SignupPage />} />
          </Route>
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </div>
      <ToastContainer />
    </BrowserRouter>
  </AuthProvider>
);

export default App;
