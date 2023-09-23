import React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

interface Cards {
  myArray: string[]; // Adjust the type according to your array content
}


function Cards() {
  // console.log(myArray);
  return (
    <Card sx={{ minWidth: 275,boxShadow: 4 }}>
        <CardContent>
          <Typography
            sx={{ fontSize: 24 }}
            color="text.secondary"
            gutterBottom
          >
            Leaves
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            Total Leaves: 13
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            Remaining Leaves : 10
          </Typography>
        </CardContent>
    </Card>
  );
}

export default Cards;
