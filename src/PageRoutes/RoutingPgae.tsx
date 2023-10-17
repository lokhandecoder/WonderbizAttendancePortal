import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DashBoardPage from "../Pages/DashBoardPage";
import LeavePage from "../Pages/LeavePage";
import StatusPage from "../Pages/StatusPage";
import AssignManager from "../Pages/AssignManager";
import LoginPage from "../Pages/LoginPage";
import ForgotPasswordPage from "../Pages/ForgotPaswordPage";
import UpdatePassword from "../Pages/UpdatePasword";
import ProtectedRoute from "./ProtectedRoute";
import AccountingYear from "../Pages/AccountingYear";
import EmployeePage from "../Pages/EmployeePage";
import EmployeesPage from "../Pages/EmployeesPage";

function RoutingPgae() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* <Route path="/" element={<DashBoardPage />}></Route> */}
          {/* <Route path="/leave/:id?" element={<LeavePage />} /> */}
          {/* <Route path="/status" element={<StatusPage />}></Route> */}
          <Route path="/assign" element={<AssignManager />}></Route>
          <Route path="/login" element={<LoginPage />}></Route>
          <Route
            path="/forgotpassword"
            element={<ForgotPasswordPage />}
          ></Route>
          <Route
            path="/updatepassword/:id?"
            element={<UpdatePassword />}
          ></Route>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <DashBoardPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/leave/:id?"
            element={
              <ProtectedRoute>
                <LeavePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/status"
            element={
              <ProtectedRoute>
                <StatusPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/accountingyear"
            element={
              <ProtectedRoute>
                <AccountingYear />
              </ProtectedRoute>
            }
          />
        <Route
            path="/employee/:id?"
            element={
              <ProtectedRoute>
                <EmployeePage />
              </ProtectedRoute>
            }
          />
        <Route
            path="/employees"
            element={
              <ProtectedRoute>
                <EmployeesPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default RoutingPgae;
