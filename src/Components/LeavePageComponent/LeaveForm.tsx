import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import axios from "axios";
import {
  GetEmployeeLeave,
  GetLeaveType,
  LeaveType,
} from "../../Database/LeaveType";
import dayjs, { Dayjs } from "dayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import LeaveApplyUtilities from "../../Utilities/LeaveApplyUtilities";
import utc from "dayjs/plugin/utc"; // Import the UTC plugin for Dayjs
import { LeaveFormData } from "../../Model/LeaveFormData";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
// import {MuiAlert} from '@mui/material';
import { DateValidationError } from "@mui/x-date-pickers/models";
import { useParams } from "react-router-dom"; // Import useParams to get the ID from the route params
import { GetLeaveData } from "../../Database/LeaveData";
import { getLeaveTypes } from "../../Services/LeaveType";
import { GetEmployeeLeaveByEmployeeId } from "../../Services/EmployeeLeaveServices";
import { EmployeeLeave } from "../../Model/EmployeeLeave";
import { GetApplyLeaveById } from "../../Services/EmployeeLeaveApplyServices";

dayjs.extend(utc); // Extend Dayjs with UTC plugin
interface LeaveFormProps {
  onSubmit: (formData: LeaveFormData) => void;
}

const employee = GetEmployeeLeave();
console.log(employee);

const LeaveForm: React.FC<LeaveFormProps> = ({ onSubmit }) => {
  const { id } = useParams();
  const appliedLeaveTypeId = id ? parseInt(id, 10) : 0;
  const today = dayjs();
  const todayDate = today.toDate();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarDateValid, setsnackbarDateValid] = useState(false);
  const [snackbarLeavetype, setsnackLeavetype] = useState(false);
  const [submitMessageOpen, setsubmitMessageOpen] = useState(false);
  const [difference, setdifference] = useState(0);
  const [balanceLeave, setBalanceLeave] = useState(0);
  const [applyLeaveDefaultValue, setApplyLeaveDefaultValue] = useState(1); // Default value for Apply Leave dropdown
  const [applyLeaveReadOnly, setApplyLeaveReadOnly] = useState(false); // Readonly state for Apply Leave dropdown


  const handleLeaveType = () => {
    setsnackLeavetype(false);
  };
  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };
  const handleCloseDateValid = () => {
    setsnackbarDateValid(false);
  };
  const handleCloseSubmitMessage = () => {
    setsubmitMessageOpen(false);
  };

  const [formData, setFormData] = useState<LeaveFormData>({
    appliedLeaveTypeId: appliedLeaveTypeId,
    leaveTypeId: 0,
    leaveType: null,
    startDate: todayDate,
    endDate: todayDate,
    leaveReason: "",
    balanceLeave: 0,
    applyLeaveDay: 0,
    remaingLeave: 0,
    leaveStatusId: 2,
  });
  const isWeekend = (date: Dayjs) => {
    const day = date.day();

    return day === 0 || day === 6;
  };

  const [leaveTypes, setLeaveTypes] = useState<LeaveType[]>([]);
  const [employeeLeaves, setemployeeLeaves] = useState<EmployeeLeave[]>([]);

  const {
    handleSelectChange,
    handleInputChange,
    handleDateChange,
    handleClear,
    Test,
    handleSubmit,
  } = LeaveApplyUtilities(
    formData,
    setFormData,
    todayDate,
    onSubmit,
    setSnackbarOpen,
    setsubmitMessageOpen,
    setsnackbarDateValid,
    setsnackLeavetype,
    difference,
    setdifference,
    balanceLeave,
    setBalanceLeave,

    employeeLeaves,
    setemployeeLeaves
  );

  useEffect(() => {
    Test();
  }, [formData.leaveTypeId, formData.endDate, formData.startDate]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [leaveTypesData, employeeLeaveData] = await Promise.all([
          getLeaveTypes(),
          GetEmployeeLeaveByEmployeeId(),
        ]);
        const leaveTypes = leaveTypesData.data;
        setLeaveTypes(leaveTypes);
        const employeeLeave = employeeLeaveData.data;
        setemployeeLeaves(employeeLeave);
        if (formData.appliedLeaveTypeId > 0) {
          const applyLeaveId = formData.appliedLeaveTypeId; // Replace with the actual apply leave ID
          const applyLeaveData = await GetApplyLeaveById(applyLeaveId);
          const applyLeaveTemp = applyLeaveData.data;
          setFormData({
            appliedLeaveTypeId: applyLeaveTemp.appliedLeaveTypeId,
            leaveTypeId: applyLeaveTemp.leaveTypeId,
            leaveType: applyLeaveTemp.leaveType,
            startDate: applyLeaveTemp.startDate,
            endDate: applyLeaveTemp.endDate,
            leaveReason: applyLeaveTemp.leaveReason,
            applyLeaveDay: applyLeaveTemp.applyLeaveDay,
            remaingLeave: applyLeaveTemp.remaingLeave,
            balanceLeave: applyLeaveTemp.balanceLeave,
            leaveStatusId: applyLeaveTemp.leaveStatusId,
          });
        }
      } catch (error) {
        console.error("Failed to fetch data: ", (error as Error).message);
      }
    };

    fetchData();
  }, []);
  // useEffect(() => {
  //   // Calculate the difference in days between start date and end date
  //   const dateDifference = formData.endDate.diff(formData.startDate, 'day');

  //   // If difference is greater than 1 day, set default value to "Full Day" and make it readonly
  //   if (dateDifference > 1) {
  //     setApplyLeaveDefaultValue(1); // Full Day
  //     setApplyLeaveReadOnly(true);
  //   } else {
  //     // If difference is 1 day or less, set default value to "None" and allow changes
  //     setApplyLeaveDefaultValue(0); // None
  //     setApplyLeaveReadOnly(false);
  //   }
  // }, [formData.startDate, formData.endDate]);

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Card sx={{ minWidth: 275, mt: 5, boxShadow: 5 }}>
          <h1 style={{ marginLeft: "1%" }}>Apply for Leave</h1>
          <CardContent>
            <Box sx={{ width: "100%" }}>
              <Grid
                container
                rowSpacing={1}
                columnSpacing={{ xs: 1, sm: 2, md: 3 }}
              >
                <Grid item xs={12} sm={4} md={3} lg={2}>
                  <FormControl fullWidth sx={{ mt: 1 }}>
                    <InputLabel id="leaveType">Leave Type</InputLabel>
                    <Select
                      labelId="leaveType"
                      id="demo-simple-select"
                      value={formData.leaveTypeId}
                      label="Leave Type"
                      name="leaveTypeId"
                      onChange={handleSelectChange}
                    >
                      <MenuItem value={0}>None</MenuItem>
                      {leaveTypes.map((type, index) => (
                        <MenuItem key={index} value={type.leaveTypeId}>
                          {type.leaveTypeName}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={4} md={3} lg={2}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={["DatePicker"]}>
                      <FormControl fullWidth>
                        <DatePicker
                          label="Start Date"
                          shouldDisableDate={isWeekend}
                          value={
                            formData.startDate
                              ? dayjs.utc(formData.startDate)
                              : today
                          }
                          onChange={(date) => {
                            if (date) {
                              handleDateChange("startDate", date.toDate());
                            }
                          }}
                        />
                      </FormControl>
                    </DemoContainer>
                  </LocalizationProvider>
                </Grid>
                <Grid item xs={12} sm={4} md={3} lg={2}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={["DatePicker"]}>
                      <FormControl fullWidth>
                        <DatePicker
                          label="End Date"
                          shouldDisableDate={isWeekend}
                          value={
                            formData.endDate
                              ? dayjs.utc(formData.endDate)
                              : today
                          }
                          onChange={(date) => {
                            if (date) {
                              handleDateChange("endDate", date.toDate());
                            }
                          }}
                        />
                      </FormControl>
                    </DemoContainer>
                  </LocalizationProvider>
                </Grid>
                {/* <Grid item xs={12} sm={4} md={3} lg={2}>
                  <FormControl fullWidth sx={{ mt: 1 }}>
                    <InputLabel id="applyLeaveDay">Apply Leave</InputLabel>
                    <Select
                      labelId="applyLeaveDay"
                      id="applyLeaveDay"
                      value={formData.applyLeaveDay}
                      label="Apply Leave"
                      name="applyLeaveDay"
                      onChange={(event) => {
                        const value = parseFloat(event.target.value as string);
                        const newApplyLeaveDay = value;

                        // Calculate the change in balanceLeave based on the selected applyLeaveDay
                        const balanceLeaveChange = value === 0.5 ? -0.5 : -1;

                        setFormData({
                          ...formData,
                          applyLeaveDay: newApplyLeaveDay,
                          balanceLeave: balanceLeave + balanceLeaveChange,
                        });
                      }}
                    >
                      <MenuItem value={0.5}>Half Day</MenuItem>
                      <MenuItem value={1}>Full Day</MenuItem>
                    </Select>
                  </FormControl>
                </Grid> */}

                {/* <Grid item xs={12} sm={4} md={3} lg={2}>
                  <FormControl fullWidth sx={{ mt: 1 }}>
                    <InputLabel id="DayType">Apply Leave</InputLabel>
                    <Select
                      labelId="DayType"
                      id="DayType"
                      value={formData.applyLeaveDay}
                      label="DayType"
                      name="DayType"
                      onChange={(event) => {
                        const value = parseFloat(event.target.value as string);
                        const balanceLeaveChange = value === 0.5 ? -0.5 : -1;
                        setFormData({
                          ...formData,
                          applyLeaveDay:value,
                          remaingLeave: formData.remaingLeave - balanceLeaveChange, // Use the defined remaingLeave variable here
                        });
                      }}
                      defaultValue={applyLeaveDefaultValue} // Set default value
          readOnly={applyLeaveReadOnly} // Set readonly state
                    >
                      <MenuItem value={0.5}>Half Day</MenuItem>
                      <MenuItem value={1}>Full Day</MenuItem>
                    </Select>
                  </FormControl>
                </Grid> */}
                <Grid item xs={12} sm={4} md={3} lg={2}>
                  <TextField
                    sx={{ mt: 1 }}
                    id="BalancedLeaves"
                    name="Balanced Leaves"
                    label="Balanced Leaves"
                    aria-readonly
                    value={formData.balanceLeave}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} sm={4} md={3} lg={2}>
                  <TextField
                    sx={{ mt: 1 }}
                    id="AppliedLeaves"
                    name="AppliedLeaves"
                    label="Applied Leaves"
                    aria-readonly
                    error={formData.applyLeaveDay > formData.balanceLeave}
                    value={formData.applyLeaveDay}
                    fullWidth
                  />
                  {formData.balanceLeave < formData.applyLeaveDay ? (
                    <span style={{ color: "red" }}>
                      You dont have sufficient leaves
                    </span>
                  ) : (
                    <span></span>
                  )}
                </Grid>
                <Grid item xs={12} sm={4} md={3} lg={2}>
                  <TextField
                    sx={{ mt: 1 }}
                    id="RemainingLeaves"
                    name="Remaining Leaves"
                    label="Remaining Leaves"
                    aria-readonly
                    value={formData.remaingLeave}
                    fullWidth
                  />
                </Grid>
              </Grid>
            </Box>
            <TextField
              sx={{ mt: 1 }}
              id="leaveReason"
              name="leaveReason"
              label="leaveReason"
              multiline
              rows={4}
              value={formData.leaveReason}
              onChange={handleInputChange}
              fullWidth
            />
          </CardContent>
          <CardActions style={{ justifyContent: 'right' }}>
            <Button
              type="submit"
              size="large"
              variant="contained"
              color="primary"
            >
              Apply
            </Button>
            <Button
              size="large"
              variant="contained"
              color="secondary"
              onClick={handleClear}
            >
              Clear
            </Button>
          </CardActions>
        </Card>
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={6000} // Adjust the duration as needed
          onClose={handleCloseSnackbar}
        >
          <Alert
            elevation={6}
            variant="filled"
            severity="error"
            onClose={handleCloseSnackbar}
          >
            You do not have sufficient leaves.
          </Alert>
        </Snackbar>
        <Snackbar
          open={submitMessageOpen}
          autoHideDuration={6000} // Adjust the duration as needed
          onClose={handleCloseSubmitMessage}
        >
          <Alert
            elevation={6}
            variant="filled"
            severity="success"
            onClose={handleCloseSubmitMessage}
          >
            Leave Applied Successfully
          </Alert>
        </Snackbar>
        <Snackbar
          open={snackbarDateValid}
          autoHideDuration={6000} // Adjust the duration as needed
          onClose={handleCloseDateValid}
        >
          <Alert
            elevation={6}
            variant="filled"
            severity="error"
            onClose={handleCloseDateValid}
          >
            Date is Invalid
          </Alert>
        </Snackbar>
        <Snackbar
          open={snackbarLeavetype}
          autoHideDuration={6000} // Adjust the duration as needed
          onClose={handleLeaveType}
        >
          <Alert
            elevation={6}
            variant="filled"
            severity="error"
            onClose={handleLeaveType}
          >
            Select Leave Type
          </Alert>
        </Snackbar>
      </form>
    </>
  );
};

export default LeaveForm;
