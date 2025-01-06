import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { UserContext } from '../context/userContext';

const ProtectedRoute = ({ children }) => {
  const { currentUser } = useContext(UserContext);

  if (!currentUser) {
    // Redirect to the login page if the user is not authenticated
    // alert("Login/Create account to access page")
    return <Navigate to="/login" replace />;
    
  }
  

  // Render the protected component if the user is authenticated
  return children;
};

export default ProtectedRoute;
