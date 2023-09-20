import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import DashBoardPage from '../Pages/DashBoardPage'
import LeavePage from '../Pages/LeavePage'
import StatusPage from '../Pages/StatusPage'

function RoutingPgae() {
  return (
    <>
    <BrowserRouter>
    <Routes>
        <Route path='/' element={<DashBoardPage />}></Route>
        <Route path='/leave' element={<LeavePage />}></Route>
        <Route path='/status' element={<StatusPage />}></Route>
        <Route></Route>
        <Route></Route>
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default RoutingPgae