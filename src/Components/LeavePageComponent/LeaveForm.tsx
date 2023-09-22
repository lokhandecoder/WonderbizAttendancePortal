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

// const today = dayjs();
// console.log(today);

interface LeaveFormProps {
  onSubmit: (formData: LeaveFormData) => void;
}
const LeaveType = GetLeaveType();
const employee = GetEmployeeLeave();
console.log(employee)
// console.log(LeaveType)
interface LeaveFormData {
  type: number;
  startDate: string;
  endDate: string;
  reason: string;
  difference: number;
  availableDays: number;
}

const LeaveForm: React.FC<LeaveFormProps> = ({ onSubmit }) => {
  const [dateValue, setDateValue] = useState("");
  const [availDays,setavailDays] = useState(0);


  const [formData, setFormData] = useState<LeaveFormData>({
    type: 1,
    startDate: dateValue,
    endDate: "",
    reason: "",
    difference: 0,
    availableDays: availDays,

  });

  const handleInputChange = (event: any) => {
    
    const type = event.target.name == "type";
    if(type){
        const gettype = event.target.value;
        employee.forEach(function(value,i){
            if(gettype === value.leaveTypeId){
                const available = value.balanceLeave;

                console.log(available);
                setavailDays(available);
                // setFormData({ ...formData, availableDays: available });


            }

        } )
        // LeaveType.forEach(function (value, i ){
        //     if(values == i){
        //         const available = employee[values].leaveCount;
        //         console.log(available);
        //         
        //         console.log(formData);
        //     }
        // })
     

    }
    const diff = calculateDateDifferenceInDays();
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSubmit(formData);
    console.log(formData);
  };
//   useEffect(() => {
//     calculateDateDifferenceInDays();
//   }, [handleInputChange]);
//   useEffect(() => {
//     const currentDate = new Date();
//     const formattedDate = currentDate.toISOString().substr(0, 10); // Format to "YYYY-MM-DD"
//     const year = formattedDate.substring(0, 4);
//     const mon = formattedDate.substring(5, 7);
//     const day = formattedDate.substring(8, 10);
//     const today = day + "-" + mon + "-" + year;
//     setDateValue(today);
//   }, []);

  const calculateDateDifferenceInDays = () => {
    const startDateObj = new Date(formData.startDate);
    const endDateObj = new Date(formData.endDate);

    if (!isNaN(startDateObj.getTime()) && !isNaN(endDateObj.getTime())) {
      const differenceInMilliseconds =
        endDateObj.getTime() - startDateObj.getTime();
      const differenceInDays = Math.floor(
        differenceInMilliseconds / (1000 * 3600 * 24)
      );
    //   console.log(differenceInDays);
      return differenceInDays;
    }
    //  else {
    //   setFormData({ ...formData, difference: 0 });
    // }
  };
  const handleClear = () => {
    setFormData({
      type: 0,
      startDate: "",
      endDate: "",
      reason: "",
      difference: 0,
      availableDays: 0,
    });
  };

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
                  <FormControl fullWidth sx={{ mt: 2 }}>
                    <InputLabel id="demo-simple-select-label">Type</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={formData.type}
                      label="Type"
                      name="type"
                      onChange={handleInputChange}
                    >
                      <MenuItem value={1}>
                        {LeaveType[0].leaveTypeName}
                      </MenuItem>
                      <MenuItem  value={2}>
                      {LeaveType[1].leaveTypeName}
                      </MenuItem>
                      <MenuItem  value={3}>
                      {LeaveType[2].leaveTypeName}
                      </MenuItem>
                    </Select>
                    {formData?.availableDays !== 0 && (
                      <span>Available days: {formData?.availableDays}</span>
                    )}
                    
                  </FormControl>
                </Grid>

                {/* <Grid item xs={6}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={["DatePicker"]}>
                      <DatePicker
                        defaultValue={today}
                        views={["year", "month", "day"]}
                      />
                      <DatePicker
                        defaultValue={today}
                        disableFuture
                        views={["year", "month", "day"]}
                        // name="startDate"
                        label="Start Date"
                        // type="date"
                        value={formData.startDate}
                        onChange={handleInputChange}
                        // InputLabelProps={{ shrink: true }}
                        // fullWidth
                        // margin="normal"
                      />
                    </DemoContainer>
                  </LocalizationProvider>
                </Grid> */}
                <Grid item xs={3}>
                  <TextField
                    id="startDate"
                    name="startDate"
                    label="Start Date"
                    type="date"
                    value={formData.startDate}
                    onChange={handleInputChange}
                    InputLabelProps={{ shrink: true }}
                    fullWidth
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={3}>
                  <TextField
                    id="endDate"
                    name="endDate"
                    label="End Date"
                    type="date"
                    value={formData.endDate}
                    onChange={handleInputChange}
                    InputLabelProps={{ shrink: true }}
                    fullWidth
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={2}>
                  <Typography
                    sx={{ fontSize: 24 }}
                    color="text.secondary"
                    gutterBottom
                  >
                    {/* <p>Total Days :  */}
                    {formData?.difference !== 0 && (
                      <p>Total days: {formData?.difference}</p>
                    )}
                    {/* </p> */}
                  </Typography>
                </Grid>
              </Grid>
            </Box>
            <TextField
              id="reason"
              name="reason"
              label="Reason"
              multiline
              rows={4}
              value={formData.reason}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
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
