import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { GetLeaveHistory } from "../../Database/LeaveHIstory";
import { GetLeaveType } from "../../Database/LeaveType";
// import { GetAllAppliedLeaves } from "../../Services/LeaveApplyServices";
import { API_URL } from "../../Services/APIConfig";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface Row {
  appliedLeaveTypeId: number;
  leaveTypeId: number; // Assuming row has a leaveTypeId property
  startDate?: string; // Assuming startDate is an optional string
  endDate?: string; // Assuming endDate is an optional string
  leaveReason: string;
  difference: string; // Assuming difference is a string
  // ... other properties you might have
}
const LeaveType = GetLeaveType();
function StatusTable() {
  const [data, setData] = useState<Row[]>([]); // Specify the type for data
  const navigate = useNavigate();

  const handleEdit = (appliedLeaveTypeId: number) => {
    console.log("Edit button clicked for index:", appliedLeaveTypeId);
    navigate("/edit/" + appliedLeaveTypeId);
  };

  useEffect(() => {
    axios
      .get(API_URL + "GetAllAppliedLeaves")
      .then((res) => setData(res.data.data))
      .catch((e) => console.log(e));
  }, []);

  return (
    <TableContainer>
      <Table sx={{ minWidth: 700 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Leave Type</TableCell>
            <TableCell>Start Date</TableCell>
            <TableCell>End Date</TableCell>
            <TableCell>Reason for Leave</TableCell>
            <TableCell>Total Days</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row: Row, key) => (
            <TableRow key={key}>
              <TableCell>
                {LeaveType.find((type) => type.leaveTypeId === row.leaveTypeId)
                  ?.leaveTypeName || ""}
              </TableCell>
              <TableCell>
                {row.startDate
                  ? new Date(row.startDate).toISOString()
                  : "No date available"}
              </TableCell>
              <TableCell>
                {row.endDate
                  ? new Date(row.endDate).toISOString()
                  : "No date available"}
              </TableCell>
              <TableCell>{row.leaveReason}</TableCell>
              <TableCell>{row.difference}</TableCell>
              <TableCell>
                <Button
                  color="primary"
                  variant="contained"
                  onClick={() => handleEdit(row.appliedLeaveTypeId)}
                >
                  Edit
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        {/* <TableBody>
          {data.map((row, key) => (
            <TableRow key={key}>
              <TableCell>
                {LeaveType.find((type) => type.leaveTypeId === row.leaveTypeId)
                  ?.leaveTypeName || ""}
              </TableCell>
              <TableCell>
                {row.startDate
                  ? row.startDate.toISOString()
                  : "No date available"}
              </TableCell>
              <TableCell>
                {row.endDate ? row.endDate.toISOString() : "No date available"}
              </TableCell>
              <TableCell>{row.leaveReason}</TableCell>
              <TableCell>{row.difference}</TableCell>
              <TableCell>
              <Button
                    color="primary"
                    variant="contained"
                    onClick={() => handleEdit()}
                  >
                    Edit
                  </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody> */}
      </Table>
    </TableContainer>
  );
}

export default StatusTable;
