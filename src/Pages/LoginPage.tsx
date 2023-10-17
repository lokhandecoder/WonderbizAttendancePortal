import * as React from "react";
import { useState, useEffect } from "react";
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
import { API_URL } from "../APIConfig";
import { useNavigate } from "react-router-dom";
import useCustomSnackbar from "../Components/CustomComponent/useCustomSnackbar";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
interface FormData {
  email: string;
  password: string;
  // Add other properties as needed for your form
}

function Copyright(props: any) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Wonderbiz
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function LoginPage() {
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [submitMessage, setSubmitMessage] = useState<string | null>(null);
  const Navigate = useNavigate();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    let updatedFieldErrors = { ...fieldErrors };
  
    // Clear the error for the email and password fields when the user starts typing
    if (name === 'email' && value.trim() !== '') {
      updatedFieldErrors = { ...updatedFieldErrors, email: '' };
    }
  
    if (name === 'password' && value.trim() !== '') {
      updatedFieldErrors = { ...updatedFieldErrors, password: '' };
    }
  
    setFieldErrors(updatedFieldErrors);
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };
  
  
  // Function to check if the email is valid
  const isValidEmail = (email: string) => {
    // Implement your email validation logic here
    // For simplicity, let's assume a basic email format validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const isFormValid = IsFormValid(formData);
    if (isFormValid) {
      console.log(formData);
      Axios.post(`${API_URL}employee/EmployeeLoginAsync`, formData)
        .then((response) => {
          console.log("Successfully submitted:", response.data);
          setSubmitMessage(response.data.message);
          if (response.data.status === 200) {
            localStorage.setItem("EmployeeID", response.data.data.employeeId);
            Navigate("/");
          }
        })
        .catch((error) => {
          console.error("Error submitting:", error);
          setSubmitMessage("Login failed. Please try again.");
        });
    }
  };

  function IsFormValid(formDataObject: FormData): boolean {
    const { email, password } = formDataObject;
    let valid = true;
    const errors: Record<string, string> = {};

    if (email.trim() === "") {
      errors.email = "Email is required";
      valid = false;
    }

    if (password.trim() === "") {
      errors.password = "Password is required";
      valid = false;
    }

    setFieldErrors(errors);
    return valid;
  }

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
          {/* <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          </Avatar> */}
          <Avatar
            src={avatarImage}
            sx={{ m: 1, bgcolor: "secondary.main", width: 200, height: 200 }}
          />

          <Typography component="h1" variant="h5">
            Welcome to Wonderbiz HRSM
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
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              error={!!fieldErrors.email}
              value={formData.email}
              onChange={handleInputChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              error={!!fieldErrors.password}
              value={formData.password}
              onChange={handleInputChange}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            {submitMessage && (
              <Typography
                variant="body1"
                color={
                  submitMessage.includes("successful") ? "success" : "error"
                }
                align="center"
              >
                {submitMessage}
              </Typography>
            )}
            <Grid container>
              <Grid item xs>
                <Link href="/forgotpassword" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              {/* <Grid item>
                <Link href="/signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid> */}
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}
