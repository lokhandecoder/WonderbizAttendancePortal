import {
    Box,
    Button,
    Card,
    CardActionArea,
    CardActions,
    CardContent,
    FormControl,
    FormControlLabel,
    Grid,
    InputLabel,
    MenuItem,
    Select,
    TextField,
  } from "@mui/material";
  import LayoutComponent from "../Components/Fixed/LayoutComponent";
  import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
  import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
  import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
  import { DateField } from "@mui/x-date-pickers/DateField";
  import { DatePicker } from "@mui/x-date-pickers/DatePicker";
  import Checkbox from "@mui/material/Checkbox";
  import { EmployeeUtilities } from "../Utilities/EmployeeUtilities";
  import dayjs, { Dayjs } from "dayjs";
  import FormHelperText from "@mui/material/FormHelperText";
  import CircularProgress from "@mui/material/CircularProgress";
  import Snackbar from "@mui/material/Snackbar";
  import Alert from "@mui/material/Alert";
  import { useParams } from "react-router-dom"; // Import useParams to get the ID from the route params
  const EmployeePage = () => {
    const { id } = useParams();
    const employeeId = id ? parseInt(id, 10) : 0;
    
    const employeeUtilities = EmployeeUtilities(employeeId);
  
    const {
      employeeData,
      designations,
      genders,
      fieldErrors,
      snackbar,
      handleFieldChange,
      handleSubmit,
      loading,
    } = employeeUtilities;
  
    const label = { inputProps: { "aria-label": "Checkbox demo" } };
    return (
      <LayoutComponent>
        <Card sx={{ minWidth: 275, mt: 3, boxShadow: 5 }}>
          <h1 style={{ marginLeft: "1%" }}>Employee</h1>
  
          <CardContent>
            <Box component="form" noValidate autoComplete="off">
              <Grid
                container
                rowSpacing={2}
                columnSpacing={{ xs: 1, sm: 2, md: 3 }}
              >
                <Grid item xs={3} sx={{ mt : "-7px"}} >
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={["DatePicker"]}>
                      <FormControl fullWidth>
                        <DatePicker
                          label="Date of Joining"
                          value={
                            employeeData.dateOfJoining
                              ? dayjs(employeeData.dateOfJoining)
                              : null
                          }
                          onChange={(date: Dayjs | null) => {
                            const dateString = date
                              ? date.format("DD-MM-YYYY")
                              : null; // Convert Dayjs to a string or null
                            handleFieldChange("dateOfJoining", dateString || ""); // Use an empty string for null values
                          }}
                        />
                      </FormControl>
                    </DemoContainer>
                  </LocalizationProvider>
                </Grid>
                <Grid item xs={3}>
                  <TextField
                    fullWidth
                    autoComplete="off"
                    id="firstName"
                    name="firstName"
                    label="First Name"
                    value={employeeData.firstName}
                    onChange={(e) =>
                      handleFieldChange("firstName", e.target.value)
                    }
                    error={!!fieldErrors.firstName}
                    helperText={fieldErrors.firstName}
                  />
                </Grid>
                <Grid item xs={3}>
                  <TextField
                    fullWidth
                    autoComplete="off"
                    id="lastName"
                    name="lastName"
                    label="Last Name"
                    value={employeeData.lastName}
                    onChange={(e) =>
                      handleFieldChange("lastName", e.target.value)
                    }
                    error={!!fieldErrors.lastName}
                    helperText={fieldErrors.lastName}
                  />
                </Grid>
                <Grid item xs={3} sx={{ mt : "-7px"}}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={["DatePicker"]}>
                      <FormControl fullWidth>
                        <DatePicker
                          label="Date of Birth"
                          value={
                            employeeData.dateOfBirth
                              ? dayjs(employeeData.dateOfBirth)
                              : null
                          }
                          onChange={(date: Dayjs | null) => {
                            const dateString = date
                              ? date.format("DD-MM-YYYY")
                              : null; // Convert Dayjs to a string or null
                            handleFieldChange("dateOfBirth", dateString || ""); // Use an empty string for null values
                          }}
                        />
                      </FormControl>
                    </DemoContainer>
                  </LocalizationProvider>
                </Grid>
                <Grid item xs={3}>
                  <TextField
                    fullWidth
                    autoComplete="off"
                    id="emailAddress"
                    name="emailAddress"
                    label="Email Address"
                    value={employeeData.emailAddress}
                    onChange={(e) =>
                      handleFieldChange("emailAddress", e.target.value)
                    }
                    error={!!fieldErrors.emailAddress}
                    helperText={fieldErrors.emailAddress}
                  />
                </Grid>
                <Grid item xs={3}>
                  <TextField
                    fullWidth
                    autoComplete="off"
                    id="mobileNo"
                    name="mobileNo"
                    label="Mobile No"
                    value={employeeData.mobileNo}
                    onChange={(e) =>
                      handleFieldChange("mobileNo", e.target.value)
                    }
                    error={!!fieldErrors.mobileNo}
                    helperText={fieldErrors.mobileNo}
                  />
                </Grid>
                <Grid item xs={3}>
                  <FormControl fullWidth error={!!fieldErrors.genderId}>
                    <InputLabel id="demo-simple-select-label">Gender</InputLabel>
                    <Select
                      labelId="genderId"
                      id="genderId"
                      name="genderId"
                      label="Gender"
                      value={employeeData.genderId}
                      onChange={(e) =>
                        handleFieldChange("genderId", e.target.value)
                      }
                    >
                      <MenuItem value={0} key={0}>
                        Select Gender
                      </MenuItem>
                      {genders.map((gender) => (
                        <MenuItem key={gender.genderId} value={gender.genderId}>
                          {gender.genderName}
                        </MenuItem>
                      ))}
                    </Select>
                    {!!fieldErrors.genderId && (
                      <FormHelperText>{fieldErrors.genderId}</FormHelperText>
                    )}
                  </FormControl>
                </Grid>
                <Grid item xs={3}>
                  <FormControl fullWidth error={!!fieldErrors.designationId}>
                    <InputLabel id="demo-simple-select-label">
                      Designation
                    </InputLabel>
                    <Select
                      labelId="designationId"
                      id="designationId"
                      name="designationId"
                      label="Designation"
                      value={employeeData.designationId}
                      onChange={(e) =>
                        handleFieldChange("designationId", e.target.value)
                      }
                    >
                      <MenuItem value={0} key={0}>
                        Select Designation
                      </MenuItem>
                      {designations.map((designation) => (
                        <MenuItem
                          key={designation.designationId}
                          value={designation.designationId}
                        >
                          {designation.designationName}
                        </MenuItem>
                      ))}
                    </Select>
                    {!!fieldErrors.designationId && (
                      <FormHelperText>{fieldErrors.designationId}</FormHelperText>
                    )}
                  </FormControl>
                </Grid>
                <Grid item xs={3}>
                  {" "}
                  <FormControlLabel
                    required
                    control={<Checkbox />}
                    label="Is Active"
                    //checked={employeeData.isActive}
                    //onChange={(e) => handleFieldChange('isActive', e.target.checked)}
                  />
                </Grid>
              </Grid>
            </Box>
          </CardContent>
          <CardActions>
            <Button
              variant="contained"
              onClick={handleSubmit}
              disabled={loading} // Disable the button when loading
            >
              {loading ? (
                <div>
                  Please wait...
                  <CircularProgress size={24} />
                </div>
              ) : (
                "Save"
              )}
            </Button>
          </CardActions>
        </Card>
        <Snackbar
          open={snackbar.open}
          autoHideDuration={snackbar.duration}
          onClose={snackbar.handleSnackbarClose}
          anchorOrigin={snackbar.position}
        >
          <Alert
            onClose={snackbar.handleSnackbarClose}
            severity={snackbar.severity}
            sx={{ width: "100%" }}
          >
            {snackbar.message}
          </Alert>
        </Snackbar>
      </LayoutComponent>
    );
  };
  
  export default EmployeePage;
  