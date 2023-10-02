import React, { useState } from "react";
import ProfileImage from "./ProfileImage";
import Grid from "@mui/material/Grid";
import CardContent from "@mui/material/CardContent";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import UpcomingTable from "../HomePageComponents/UpcomingTable";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Collapse from "@mui/material/Collapse"; // Import Collapse from Material-UI



function UpcomingHolidays() {
  interface Holiday {
    date: string;
    holiday: string;
  }

  const holidays: Holiday[] = [
    {
      date: "2023-10-02",
      holiday: "Gandhi Jayanti",
    },
    {
      date: "2023-10-19",
      holiday: "Diwali (Deepavali)",
    },
    {
      date: "2023-12-25",
      holiday: "Christmas",
    },
    {
      date: "2024-01-01",
      holiday: "New Year's Day",
    },
    {
      date: "2024-01-26",
      holiday: "Republic Day",
    },
    {
      date: "2024-03-18",
      holiday: "Holi",
    },
    {
      date: "2024-04-05",
      holiday: "Good Friday",
    },
    {
      date: "2024-04-14",
      holiday: "Baisakhi (Vaisakhi)",
    },
    {
      date: "2024-05-01",
      holiday: "Labour Day (May Day)",
    },
    {
      date: "2024-04-23",
      holiday: "Eid ul-Fitr",
    },
    {
      date: "2024-08-15",
      holiday: "Independence Day",
    },
    {
      date: "2024-09-02",
      holiday: "Ganesh Chaturthi",
    },
  ];

  const [isTableOpen, setIsTableOpen] = useState(false);

  const toggleTable = () => {
    setIsTableOpen(!isTableOpen);
  };

  return (
    <Card sx={{ p: 1, boxShadow: 4, mt: 5 }}>
      <Typography variant="h5" sx={{ textAlign: "center" }}>
        Upcoming Holidays
      </Typography>
      <CardContent>
        <Typography
          variant="body1"
          onClick={toggleTable}
          sx={{
            cursor: "pointer",
            textAlign: "center",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {isTableOpen ? (
            <>
              <KeyboardArrowUpIcon />
              Hide Holidays
            </>
          ) : (
            <>
              <KeyboardArrowDownIcon />
              Show Holidays
            </>
          )}
        </Typography>
        <Collapse in={isTableOpen}>
          <UpcomingTable holidays={holidays} />
        </Collapse>
      </CardContent>
    </Card>
  );
}

export default UpcomingHolidays;
