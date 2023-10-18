import React, { useState, useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Axios from "axios";
import avatarImage from "../Resources/Images/wonderbiz-technologies-squareLogo-1693374911041.webp";
import { useParams } from "react-router-dom"; // Import useParams to get the ID from the route params
import { API_URL } from "../APIConfig";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import useCustomSnackbar from "../Components/CustomComponent/useCustomSnackbar";


function Copyright(props: any) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="">
        Wonderbiz
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const defaultTheme = createTheme();

export default function UpdatePassword() {
  const snackbar = useCustomSnackbar();
  const { id } = useParams();
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });
  const [fieldErrors, setFieldErrors] = useState({
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    // Clear errors when input values change
    setFieldErrors({ password: "", confirmPassword: "" });
  }, [formData]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const { password, confirmPassword } = formData;

    if (!password) {
      setFieldErrors((prevErrors) => ({
        ...prevErrors,
        password: "Password is required.",
      }));
      return;
    }

    if (!confirmPassword) {
      setFieldErrors((prevErrors) => ({
        ...prevErrors,
        confirmPassword: "Please confirm your password.",
      }));
      return;
    }

    if (password !== confirmPassword) {
      setFieldErrors((prevErrors) => ({
        ...prevErrors,
        confirmPassword: "Passwords do not match.",
      }));
      return;
    }

    Axios.post(`${API_URL}employee/UpdateEmployeePassword`, {
      employeeId: id,
      password: password,
    })
      .then((response) => {
        console.log(`${API_URL}employee/UpdateEmployeeAsync`, response.data);
        snackbar.showSnackbar(
          "Password Change Successfully",
          "success",
          { vertical: "top", horizontal: "center" },
          5000
        );
        setTimeout(() => {
          window.location.href = "/login";
        }, 2000);
        // Add any additional handling or redirection logic here
      })
      .catch((error) => {
        console.error("Error submitting:", error);
        snackbar.showSnackbar(
          "Failed to Change Password",
          "error",
          { vertical: "top", horizontal: "center" },
          5000
        );
        // Add error handling logic here
      });
  };


  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar
            src={avatarImage}
            sx={{ m: 1, bgcolor: "secondary.main", width: 200, height: 200 }}
          />

          <Typography component="h1" variant="h5">
            Enter your New Password
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
             <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="new-password"
            error={!!fieldErrors.password}
            helperText={fieldErrors.password}
            onChange={handleInputChange}
            value={formData.password}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="confirmPassword"
            label="Confirm Password"
            type="password"
            id="confirmPassword"
            autoComplete="new-password"
            error={!!fieldErrors.confirmPassword}
            helperText={fieldErrors.confirmPassword}
            onChange={handleInputChange}
            value={formData.confirmPassword}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Update Password
          </Button>
            <Grid container>
              <Grid item xs>
                <Link href="/login" variant="body2">
                  Back to Sign In
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
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
      </Container>
    </ThemeProvider>
  );
}
