import React, { useState } from "react";
import Button from "@mui/material/Button";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { GetLeaveHistory } from "../../Database/LeaveHIstory";
import { GetLeaveType } from "../../Database/LeaveType";


const rows = GetLeaveHistory();
const LeaveType = GetLeaveType();
function StatusTable() {
  const [data, SetData] = useState(rows);


  const handleEdit = () => {

  }


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
          {data.map((row, key) => (
            <TableRow key={key}>
              <TableCell>
                {LeaveType.find((type) => type.leaveTypeId === row.leaveType)
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
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default StatusTable;
