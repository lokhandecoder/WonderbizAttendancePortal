import React from "react";
import Box from "@mui/system/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/system/Unstable_Grid";
import styled from "@mui/system/styled";
import Cards from "./Cards";
import { GetEmployeeLeave } from "../../Database/LeaveType";

function LeavesCard() {
  const myArray = [
    {
      type: "Sick leave",
      days: 13,
    },
    {
      type: "Casual Leave",
      days: 13,
    },
    {
      type: "Maternity/Paternity Leave",
      days: 20,
    },
  ];
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        {myArray.map((value, key) => (
          <Grid xs={4} key={key}>
            <Card sx={{ minWidth: 275, boxShadow: 4 }}>
              <CardContent>
                <Typography
                  sx={{ fontSize: 24 }}
                  color="text.secondary"
                  gutterBottom
                >
                  {value.type}
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                  Total Leaves: 13
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                  Remaining Leaves : 10
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default LeavesCard;
