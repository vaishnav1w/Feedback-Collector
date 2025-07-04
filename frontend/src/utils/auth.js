// src/utils/auth.js

export const isAuthenticated = () => {
  const token = localStorage.getItem('adminToken');
  return !!token;
};

export const logout = () => {
  localStorage.removeItem('adminToken');
};
