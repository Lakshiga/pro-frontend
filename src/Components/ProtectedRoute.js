import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ isAuthenticated, isVerified, role, children }) => {
  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  // Redirect to not-verified page if the user is an organizer and not verified
  if (role === 'organizer' && !isVerified) {
    return <Navigate to="/not-verified" />;
  }

  // If authenticated and verified (or not an organizer), render the children components
  return children;
};

export default ProtectedRoute;
