import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ role, children }) => {
  console.log(role);

  // Redirect to not-verified page if the user is an organizer and not verified
  if (role !== 'organizer') {
    return <Navigate to="/login" />;
  }

  // If authenticated and verified (or not an organizer), render the children components
  return children;
};

export default ProtectedRoute;
