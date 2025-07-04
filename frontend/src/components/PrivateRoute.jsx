// src/components/PrivateRoute.jsx

import React from 'react';
import { Navigate } from 'react-router-dom';
import { isAuthenticated } from '../utils/auth';

const PrivateRoute = ({ children }) => {
  return isAuthenticated() ? children : <Navigate to="/admin-login" />;
};

export default PrivateRoute;
