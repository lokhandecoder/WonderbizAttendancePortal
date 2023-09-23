import React from 'react'
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { GetSubmitRequest } from '../../Database/SubmitRequest';

const rows = GetSubmitRequest();
function StatusTable() {
  return (
    <TableContainer >
    <Table sx={{ minWidth: 700 }} aria-label="simple table">
      <TableHead>
        <TableRow>
          <TableCell>Leave Type</TableCell>
          <TableCell>Start Date</TableCell>
          <TableCell>End Date</TableCell>
          <TableCell>Reason for Leave</TableCell>
          <TableCell>Total Days</TableCell>
          <TableCell>balanceLeave</TableCell>
          <TableCell>Action</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {rows.map((row, key) => (
          <TableRow key={key}>
            <TableCell>{row.leaveType}</TableCell>
            <TableCell>{}</TableCell>
            <TableCell>{}</TableCell>
            <TableCell>{row.leaveReason}</TableCell>
            <TableCell>{row.difference}</TableCell>
            <TableCell>{row.balanceLeave}</TableCell>
            <TableCell>
              <Button color ="primary" variant="contained">Cancel</Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
  )
}

export default StatusTable