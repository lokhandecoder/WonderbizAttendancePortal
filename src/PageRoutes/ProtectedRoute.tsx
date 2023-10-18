import { Navigate, Route } from 'react-router-dom';
import { ReactNode, useEffect } from "react";

interface ProtectedRouteProps {
  children: ReactNode;
  allowedRoles  : any,
}

const ProtectedRoute = ({ children,allowedRoles   }: ProtectedRouteProps) => {
  const userRole = 'user'; // Replace with actual role retrieval logic

  
  useEffect(() => {
    // Check if the user is authenticated based on localStorage
    const isUserAuthenticated = localStorage.getItem("EmployeeID") !== null;

    if (!isUserAuthenticated) {
      // Redirect to login if the user is not authenticated

      window.location.href = "/login";
      
    }
    
  }, []);
  const userHasRequiredRole = () => {
    // Implement your logic to check if the user's role is allowed for this route
    // Compare user's role with the allowed roles and return true or false accordingly
    const userRole = "admin"; // Replace with actual logic to get user's role

    return allowedRoles.includes(userRole);
  };

  return userHasRequiredRole() ? <>{children}</> : <Navigate to="/login" />;

  // Render the children if the user is authenticated
  // return <>{children}</>;
};

export default ProtectedRoute;
