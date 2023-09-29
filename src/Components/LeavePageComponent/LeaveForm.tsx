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
import { GetEmployeeLeave, GetLeaveType, LeaveType } from "../../Database/LeaveType";
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
import { API_URL } from "../../Services/APIConfig";
import { getLeaveTypes } from "../../Services/LeaveType";
import { GetEmployeeLeaveByEmployeeId } from "../../Services/EmployeeLeaveServices";
import { EmployeeLeave } from "../../Model/EmployeeLeave";
import { GetApplyLeaveById } from "../../Services/EmployeeLeaveApplyServices";


// import {  GetEmpolyeeDetails, GetLeaveApplyById } from "../../Services/LeaveApplyServices";
dayjs.extend(utc); // Extend Dayjs with UTC plugin
interface LeaveFormProps {
  onSubmit: (formData: LeaveFormData) => void;
}
//const LeaveType = GetLeaveType();
//const LeaveType = [];
const employee = GetEmployeeLeave();
console.log(employee);

const LeaveForm: React.FC<LeaveFormProps> = ({ onSubmit }) => {

  const { id } = useParams();
  const appliedLeaveTypeId = id?  parseInt(id, 10) : 0; // Use logical OR to set a default of 0
 
  //alert(appliedLeaveTypeId);

  // const { id } = useParams(); // Get the ID from the route params
  const today = dayjs();
  const todayDate = today.toDate();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarDateValid, setsnackbarDateValid] = useState(false);
  const [snackbarLeavetype, setsnackLeavetype] = useState(false);
  const [submitMessageOpen, setsubmitMessageOpen] = useState(false);
  const [difference, setdifference] = useState(0);
  const [balanceLeave, setBalanceLeave] = useState(0);
  // const [error, setError] = React.useState<DateValidationError | null>(null);

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

  const [formData, setFormData] = useState<LeaveFormData>(
    {
      appliedLeaveTypeId : appliedLeaveTypeId ,
    leaveTypeId: 0,
    leaveType: null,
    startDate: todayDate,
    endDate: todayDate,
    leaveReason: "",
    balanceLeave : 0,
    applyLeaveDay : 0,
    remaingLeave:0,
    leaveStatusId: 2,

  }
  );
  const isWeekend = (date: Dayjs) => {
    const day = date.day();

    return day === 0 || day === 6;
  };

  const [leaveTypes, setLeaveTypes] = useState<LeaveType[]>([]);
  const [employeeLeaves,setemployeeLeaves ] = useState<EmployeeLeave[]>([]);

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

    employeeLeaves,setemployeeLeaves

  );

  useEffect(() => { 

    Test();
  }, [formData.leaveTypeId, formData.endDate, formData.startDate]);


  // useEffect(() => {
  //   const fetchLeaveTypes = async () => {
  //     try {
  //       const fetchedLeaveTypes = await getLeaveTypes();
  //    //   const { data, status } = fetchedLeaveTypes;
  //       const leaveTypesData = fetchedLeaveTypes.data;
  //       console.log("fetchedLeaveTypes",fetchedLeaveTypes)
  //       if (Array.isArray(leaveTypesData)) {
  //         setLeaveTypes(leaveTypesData);
  //         console.log('Leave Types:', leaveTypesData);
  //       } else {
  //         console.error('Invalid leave types data.');
  //       }
  //     } catch (error) {
  //       console.error('Error fetching leave types:', (error as Error).message);
  //     }
  //   };

  //   const fetchAvailableLeaveByEmplpyeeId = async () => {
  //     try {
  //       const fetchAvailableLeaveByEmplpyeeId = await GetEmployeeLeaveByEmployeeId();
  //       const FetchLeave = fetchAvailableLeaveByEmplpyeeId.data;
  //       console.log("fetchedAvailabeLeaves",fetchAvailableLeaveByEmplpyeeId);
  //       if (Array.isArray(FetchLeave)) {
  //         setemployeeLeaves(FetchLeave);
  //         console.log('Available Types:', FetchLeave);
  //       } else {
  //         console.error('Invalid Avaialabe Employee Leaves.');
  //       }
  //     }catch (error) {
  //       console.error('Error fetching leave types:', (error as Error).message);
  //     }
  //   }
  
  //    fetchAvailableLeaveByEmplpyeeId();
  //   // GetEmployeeLeaveByEmployeeId()
  //   fetchLeaveTypes();
  // }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [leaveTypesData, employeeLeaveData] = await Promise.all([
          getLeaveTypes(),
          GetEmployeeLeaveByEmployeeId()
        ]);

     

        const leaveTypes = leaveTypesData.data;
        setLeaveTypes(leaveTypes);


        const employeeLeave = employeeLeaveData.data;
        setemployeeLeaves(employeeLeave);

        if (formData.appliedLeaveTypeId > 0) {

          const applyLeaveId = formData.appliedLeaveTypeId; // Replace with the actual apply leave ID
          const applyLeaveData = await GetApplyLeaveById(applyLeaveId);
  
          
          const applyLeaveTemp = applyLeaveData.data;
  
          console.log(applyLeaveTemp);
         // Use values from applyLeaveTemp to set initial state of formData
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
        console.error('Failed to fetch data: ',(error as Error).message);
      }
    };

    fetchData();
  }, []);



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
                <Grid item xs={12} sm= {4} md={3} lg={2}>
                  <FormControl fullWidth sx={{ mt: 1 }}>
                    <InputLabel id="leaveType">leaveType</InputLabel>
                    <Select
                      labelId="leaveType"
                      id="demo-simple-select"
                      value={formData.leaveTypeId}
                      label="leaveType"
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
                <Grid item xs={12} sm= {4} md={3} lg={2}>
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
                <Grid item xs={12} sm= {4} md={3} lg={2}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={["DatePicker"]}>
                      <FormControl fullWidth>
                        <DatePicker
                          //  onError={(newError) => setError(newError)}
                          //  slotProps={{
                          //    textField: {
                          //      helperText: errorMessage,
                          //    },
                          //  }}

                          //  minDate={dayjs.utc(formData.startDate)}
                          //  maxDate={dayjs.utc(formData.endDate)}
                          label="End Date"
                          shouldDisableDate={isWeekend}
                          // minDate={today}
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
                <Grid item xs={12} sm= {4} md={3} lg={2}>
                  <TextField
                    sx={{ mt: 1 }}
                    id="BalancedLeaves"
                    name="Balanced Leaves"
                    label="Balanced Leaves"
                    aria-readonly
                    // error={formData.balanceLeave < formData.difference}
                    value={formData.balanceLeave}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} sm= {4} md={3} lg={2}>
                  <TextField
                    sx={{ mt: 1 }}
                    id="AppliedLeaves"
                    name="AppliedLeaves"
                    label="Applied Leaves"
                    aria-readonly
                    // error={balanceLeave < difference}
                    value={formData.applyLeaveDay}
                    fullWidth
                  />
                  {formData.balanceLeave < formData.applyLeaveDay? (
                    <span style={{ color: "red" }}>
                      You dont have sufficient leaves
                    </span>
                  ) : (
                    <span></span>
                  )}
                </Grid>
                <Grid item xs={12} sm= {4} md={3} lg={2}>
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
          <CardActions>
            <Button
              type="submit"
              size="large"
              variant="contained"
              color="primary"
            >
              Submit
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
