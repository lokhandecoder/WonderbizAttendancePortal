import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { GetLeaveHistory } from "../../Database/LeaveHIstory";
import { GetLeaveType, LeaveType } from "../../Database/LeaveType";
// import { GetAllAppliedLeaves } from "../../Services/LeaveApplyServices";
import { API_URL } from "../../Services/APIConfig";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { getLeaveTypes } from "../../Services/LeaveType";

interface Row {
  appliedLeaveTypeId : number;
    leaveTypeId: number;
    leaveType: null;
    startDate: Date | null;
    endDate: Date | null;
    leaveReason: string;
    balanceLeave: number;
    applyLeaveDay : number,
    remaingLeave:number,
}

function StatusTable() {
  const [data, setData] = useState<Row[]>([]); // Specify the type for data
  const navigate = useNavigate();
  const [leaveTypes, setLeaveTypes] = useState<LeaveType[]>([]);

  const handleEdit = (appliedLeaveTypeId: number | undefined) => {
   const editUrl = appliedLeaveTypeId ? `/leave/${appliedLeaveTypeId}` : '/leave';
    navigate(editUrl);
  };
  console.log("table",data);

  useEffect(() => {
    axios
      .get("https://leaveapplication14.azurewebsites.net/api/appliedLeave/GetAppliedLeavesAsync")
      .then((res) => setData(res.data.data))
      .catch((e) => console.log(e));

      const fetchLeaveTypes = async () => {
        try {
          const fetchedLeaveTypes = await getLeaveTypes();
       //   const { data, status } = fetchedLeaveTypes;
          const leaveTypesData = fetchedLeaveTypes.data;
          console.log("fetchedLeaveTypes",fetchedLeaveTypes)
          if (Array.isArray(leaveTypesData)) {
            setLeaveTypes(leaveTypesData);
            console.log('Leave Types:', leaveTypesData);
          } else {
            console.error('Invalid leave types data.');
          }
        } catch (error) {
          console.error('Error fetching leave types:', (error as Error).message);
        }
      };
      fetchLeaveTypes();

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
            <TableCell>Balance Leaves</TableCell>
            <TableCell>Applied Days</TableCell>
            <TableCell>Remaining Leaves</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          { data && data !== null ? ( data.map((row: Row, key) => (
            <TableRow key={key}>
              <TableCell>
                {leaveTypes.find((type) => type.leaveTypeId === row.leaveTypeId)
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
              <TableCell>{row.balanceLeave}</TableCell>
              <TableCell>{row.applyLeaveDay}</TableCell>
              <TableCell>{row.remaingLeave}</TableCell>
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
          ))): (
            'No data available'
          )}
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
