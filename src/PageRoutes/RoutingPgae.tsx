import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DashBoardPage from "../Pages/DashBoardPage";
import LeavePage from "../Pages/LeavePage";
import StatusPage from "../Pages/StatusPage";
import AssignManager from "../Pages/AssignManager";

// import LeaveForm from '../Components/LeavePageComponent/LeaveForm'

function RoutingPgae() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<DashBoardPage />}></Route>
          <Route path="/leave/:id?" element={<LeavePage />} />
          <Route path="/status" element={<StatusPage />}></Route>
          <Route path="/assign" element={<AssignManager />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default RoutingPgae;