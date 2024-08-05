import React from "react";
import { Navigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase";

const ProtectedRoute = ({ component: Component }) => {
  const [user] = useAuthState(auth);

  return user ? <Component /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
