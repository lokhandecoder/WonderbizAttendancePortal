import { Navigate } from "react-router-dom";
import { ReactNode, useEffect } from "react";

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  useEffect(() => {
    // Check if the user is authenticated based on localStorage
    const isUserAuthenticated = localStorage.getItem("EmployeeID") !== null;

    if (!isUserAuthenticated) {
      // Redirect to login if the user is not authenticated

      window.location.href = "/login";
      
    }
  }, []);

  // Render the children if the user is authenticated
  return <>{children}</>;
};

export default ProtectedRoute;
