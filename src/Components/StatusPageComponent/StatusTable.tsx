import React, { useState, useEffect } from "react";
import { ChangeEvent } from "react";
import Button from "@mui/material/Button";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { LeaveType } from "../../Database/LeaveType";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { getLeaveStatus, getLeaveTypes } from "../../Services/LeaveType";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { LeaveStatus } from "../../Model/LeaveStatus";
import { API_URL } from "../../APIConfig";
import { GetAppliedLeavesAsync } from "../../Services/EmployeeLeaveApplyServices";

interface Row {
  appliedLeaveTypeId?: number;
  leaveTypeId: number;
  leaveType: null;
  startDate: Date | null;
  endDate: Date | null;
  leaveReason: string;
  balanceLeave: number;
  applyLeaveDay: number;
  remaingLeave: number;
  leaveStatusId: number;
}

function StatusTable() {
  const [data, setData] = useState<Row[]>([]); // Specify the type for data
  const navigate = useNavigate();
  const [leaveTypes, setLeaveTypes] = useState<LeaveType[]>([]);
  const [leaveStatus, setLeaveStatus] = useState<LeaveStatus[]>([]);
  const [selectedLeaveStatusId, setSelectedLeaveStatusId] = useState<number>(0);

  const handleEdit = (appliedLeaveTypeId: number | undefined) => {
    const editUrl = appliedLeaveTypeId
      ? `/leave/${appliedLeaveTypeId}`
      : "/leave";
    navigate(editUrl);
  };
  const handleUpdate = (appliedLeaveTypeId: number | undefined) => {
    console.log(
      "applied id = ",
      appliedLeaveTypeId,
      "value",
      selectedLeaveStatusId
    );
  };
  const handleSelectStatusChange = (
    event: SelectChangeEvent<number>,
    appliedLeaveTypeId: number | undefined
  ) => {
    const value =
      typeof event.target.value === "string"
        ? parseInt(event.target.value, 10)
        : event.target.value;

    setData((prevData) =>
      prevData.map((row) => {
        if (row.appliedLeaveTypeId === appliedLeaveTypeId) {
          return { ...row, leaveStatusId: value };
        }
        return row;
      })
    );

    // Update selectedLeaveStatusId
    setSelectedLeaveStatusId(value);
  };
  useEffect(() => {
    const FetchList = async () => {
      try {
        const employeeId = 3; // Replace with the actual employee ID
        const fetchData = await GetAppliedLeavesAsync();
        const fetched = fetchData.data;
        if (Array.isArray(fetched)) {
          setData(fetched);
        } else {
          console.error("Invalid leave types data.");
        }
      } catch (error) {
        console.error("Error fetching leave types:", (error as Error).message);
      }
    };
    // axios
    //   .get(`${API_URL}appliedLeave/GetAppliedLeavesAsync`)
    //   .then((res) => {setData(res.data.data);console.log("new data", res.data.data)})
    //   .catch((e) => console.log(e));

    const fetchLeaveTypes = async () => {
      try {
        const fetchedLeaveTypes = await getLeaveTypes();
        const leaveTypesData = fetchedLeaveTypes.data;
        if (Array.isArray(leaveTypesData)) {
          setLeaveTypes(leaveTypesData);
        } else {
          console.error("Invalid leave types data.");
        }
      } catch (error) {
        console.error("Error fetching leave types:", (error as Error).message);
      }
    };
    FetchList();
    fetchLeaveTypes();
  }, []);
  function formatDate(date: Date) {
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Months are zero-based
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  }
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [LeaveStatus] = await Promise.all([getLeaveStatus()]);
        const leavestatuss = LeaveStatus.data;
        setLeaveStatus(leavestatuss);
      } catch (error) {
        console.error("Failed to fetch data: ", (error as Error).message);
      }
    };

    fetchData();
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
            <TableCell>Status</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data && data !== null
            ? data.map((row: Row, key) => (
                <TableRow key={key}>
                  <TableCell>
                    {leaveTypes.find(
                      (type) => type.leaveTypeId === row.leaveTypeId
                    )?.leaveTypeName || ""}
                  </TableCell>
                  <TableCell>
                    {row.startDate
                      ? formatDate(new Date(row.startDate))
                      : "No date available"}
                  </TableCell>
                  <TableCell>
                    {row.endDate
                      ? formatDate(new Date(row.endDate))
                      : "No date available"}
                  </TableCell>
                  {/* <TableCell>
                    {row.startDate
                      ? new Date(row.startDate).toISOString()
                      : "No date available"}
                  </TableCell>
                  <TableCell>
                    {row.endDate
                      ? new Date(row.endDate).toISOString()
                      : "No date available"}
                  </TableCell> */}
                  <TableCell>{row.leaveReason}</TableCell>
                  <TableCell>{row.balanceLeave}</TableCell>
                  <TableCell>{row.applyLeaveDay}</TableCell>
                  <TableCell>{row.remaingLeave}</TableCell>
                  <TableCell>
                    <Select
                      labelId="leaveType"
                      id="demo-simple-select"
                      value={row.leaveStatusId}
                      label="Leave Type"
                      name="leaveTypeId"
                      onChange={(event) =>
                        handleSelectStatusChange(event, row.appliedLeaveTypeId)
                      }
                    >
                      {/* <MenuItem value={0}>None</MenuItem> */}
                      {leaveStatus.map((type, index) => (
                        <MenuItem key={index} value={type.leaveStatusId}>
                          {type.leaveStatusName}
                        </MenuItem>
                      ))}
                    </Select>
                  </TableCell>
                  <TableCell>
                    <Button
                      color="primary"
                      variant="contained"
                      onClick={() => handleEdit(row.appliedLeaveTypeId)}
                    >
                      Edit
                    </Button>
                    <Button
                      sx={{ m: 1 }}
                      color="secondary"
                      variant="contained"
                      onClick={() => handleUpdate(row.appliedLeaveTypeId)}
                    >
                      Update
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            : "No data available"}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default StatusTable;
