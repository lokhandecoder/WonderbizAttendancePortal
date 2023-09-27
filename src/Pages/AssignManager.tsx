import React from 'react'
import LayoutComponent from "../Components/Fixed/LayoutComponent";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import AssignManage from '../Components/AssignManager/AssignManage';

function AssignManager() {
  return (
    <>
      <LayoutComponent>
        <Card sx={{ minWidth: 275, mt: 3, boxShadow: 5 }}>
          <h1 style={{ marginLeft: "1%" }}>Assign Manager</h1>
          <CardContent>
            <AssignManage />
          </CardContent>
        </Card>
      </LayoutComponent>
    </>
  )
}

export default AssignManager