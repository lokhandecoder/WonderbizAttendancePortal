import React, { useState, ChangeEvent } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
// import InputLabel from "@mui/material/InputLabel";
// import MenuItem from "@mui/material/MenuItem";
// import FormControl from "@mui/material/FormControl";
// import { Select as MuiSelect, SelectProps, selectClasses } from '@mui/base/Select';  // Rename the import
// import Select from "@mui/material/Select";
import { GetEmployees } from "../../Database/EmployeeServices";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Chip,
  SelectChangeEvent,
} from "@mui/material";

const employee = GetEmployees();
console.log(employee);

function AssignManage() {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  const handleChange = (event: SelectChangeEvent<string | string[]>) => {
    setSelectedOptions(event.target.value as string[]);
  };
  console.log(selectedOptions)

  return (
    <>
      <form>
        <Card sx={{ minWidth: 275 }}>
          <CardContent>
            <Box sx={{ width: "100%" }}>
              <Grid
                container
                rowSpacing={1}
                columnSpacing={{ xs: 1, sm: 2, md: 3 }}
              >
                <Grid item xs={3}>
                  <FormControl fullWidth sx={{ mt: 1 }}>
                    <InputLabel id="EmployeeName">Employee Name</InputLabel>
                    <Select
                      labelId="EmployeeName"
                      id="demo-simple-select"
                      //   value={formData.leaveType}
                      label="EmployeeName"
                      name="EmployeeName"
                      //   onChange={handleSelectChange}
                    >
                      <MenuItem value={0}>None</MenuItem>
                      {employee.map((type, index) => (
                        <MenuItem key={index} value={type.employeeId}>
                          {type.firstName}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={3}>
                  <FormControl fullWidth sx={{ mt: 1 }}>
                    <InputLabel id="Managers">Managers</InputLabel>
                    <Select
                      labelId="Managers"
                      id="demo-simple-select"
                      value={selectedOptions}
                      multiple
                      label="Managers"
                      name="Managers"
                      onChange={handleChange}
                    //   renderValue={(selected) => (
                    //     <div>
                    //       {selected.map((value) => (
                    //         <Chip key={value} label={value} />
                    //       ))}
                    //     </div>
                    //   )}
                    >
                      <MenuItem value={0}>None</MenuItem>
                      {employee.map((type, index) => (
                        <MenuItem key={index} value={type.employeeId}>
                          {type.firstName + " " + type.lastName}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            </Box>
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
          </CardActions>
        </Card>
      </form>
    </>
  );
}

export default AssignManage;
