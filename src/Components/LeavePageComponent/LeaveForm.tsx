import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { GetEmployeeLeave, GetLeaveType } from "../../Database/LeaveType";
import dayjs from "dayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import LeaveApplyUtilities from "../../Utilities/LeaveApplyUtilities";
import utc from "dayjs/plugin/utc"; // Import the UTC plugin for Dayjs
import { LeaveFormData } from "../../Model/LeaveFormData";
dayjs.extend(utc); // Extend Dayjs with UTC plugin
interface LeaveFormProps {
  onSubmit: (formData: LeaveFormData) => void;
}
const LeaveType = GetLeaveType();
const employee = GetEmployeeLeave();
console.log(employee);

const LeaveForm: React.FC<LeaveFormProps> = ({ onSubmit }) => {
  const today = dayjs();
  const todayDate = today.toDate();

  const [formData, setFormData] = useState<LeaveFormData>({
    leaveType: 1,
    startDate: todayDate,
    endDate: todayDate,
    leaveReason: "",
    difference: 1,
    balanceLeave: 0,
  });

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSubmit(formData);
    console.log(formData);
  };

  const handleClear = () => {
    setFormData({
      leaveType: 0,
      startDate: todayDate,
      endDate: todayDate,
      leaveReason: "",
      difference: 0,
      balanceLeave: 0,
    });
  };
  const {
    handleSelectChange,
    handleInputChange,
    handleDateChange,
    GetBalanceLeaveByLeaveTypeId,
  } = LeaveApplyUtilities(formData, setFormData);

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Card sx={{ minWidth: 275 }}>
          <h1>Apply for Leave</h1>
          <CardContent>
            <Box sx={{ width: "100%" }}>
              <Grid
                container
                rowSpacing={1}
                columnSpacing={{ xs: 1, sm: 2, md: 3 }}
              >
                <Grid item xs={3}>
                  <FormControl fullWidth sx={{ mt: 1 }}>
                    <InputLabel id="leaveType">leaveType</InputLabel>
                    <Select
                      labelId="leaveType"
                      id="demo-simple-select"
                      value={formData.leaveType}
                      label="leaveType"
                      name="leaveType"
                      onChange={handleSelectChange}
                    >
                      {LeaveType.map((type, index) => (
                        <MenuItem key={index} value={type.leaveTypeId}>
                          {type.leaveTypeName}
                        </MenuItem>
                      ))}
                    </Select>
                    {formData?.balanceLeave !== 0 && (
                      <span>Available days: {formData?.balanceLeave}</span>
                    )}
                  </FormControl>
                </Grid>
                <Grid item xs={3}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={["DatePicker"]}>
                      <FormControl fullWidth>
                        <DatePicker
                          label="Start Date"
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
                <Grid item xs={3}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={["DatePicker"]}>
                      <FormControl fullWidth>
                        <DatePicker
                          label="End Date"
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
                <Grid item xs={2}>
                  <TextField
                    sx={{ mt: 1 }}
                    id="AvailableLeaves"
                    name="AvailableLeaves"
                    label="AvailableLeaves"
                    disabled
                    value={formData.difference}
                    // onChange={handleInputChange}
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
      </form>
    </>
  );
};

export default LeaveForm;
