import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet,
} from 'react-router-dom';

import LoginPage from './LoginPage.jsx';
import PageNotFound from './PageNotFound.jsx';

import AuthProvider from '../contexts/AuthProvider.jsx';
import { useAuth } from '../hooks/index.js';

const PrivateOutlet = ({ toMainPage } = false) => {
  const auth = useAuth();

  if (toMainPage) {
    return auth.user ? <Outlet /> : <Navigate to="/login" />;
  }
  return auth.user ? <Navigate to="/" /> : <Outlet />;
};

const App = () => (
  <AuthProvider>
    <BrowserRouter>
      <div className="d-flex flex-column h-100">
        <Routes>
          <Route path="/login" element={<PrivateOutlet />}>
            <Route path="" element={<LoginPage />} />
          </Route>
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </div>
    </BrowserRouter>
  </AuthProvider>
);

export default App;
