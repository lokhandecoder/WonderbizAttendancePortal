import React, { useState } from "react";
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
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import avatarImage from "../Resources/Images/wonderbiz-technologies-squareLogo-1693374911041.webp";
import { API_URL } from "../APIConfig";
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

export default function ForgotPasswordPage() {
  const snackbar = useCustomSnackbar();
  const [submitMessage, setSubmitMessage] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    // Clear the error for the email and password fields when the user starts typing
    if ((name === 'email' || name === 'password') && value.trim() !== '') {
      setFieldErrors((prevErrors) => ({
        ...prevErrors,
        [name]: '',
      }));
    }

    // Rest of the existing logic to update form data
  };
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const formDataObject: { [key: string]: string } = {};

    // Populate the formDataObject with form data
    data.forEach((value, key) => {
      formDataObject[key] = value.toString();
    });

    console.log(formDataObject);
    const email = formDataObject.email;

    if (!email) {
      setFieldErrors((prevErrors) => ({
        ...prevErrors,
        email: "Email is required.",
      }));
      return; // Don't proceed if email is blank
    }

    // Make a POST request using Axios `${API_URL}employee/UpdateEmployeeAsync`
    Axios.post(`${API_URL}passwordReset/VerifyEmailAsync`, formDataObject)
      .then((response) => {
        console.log("Email Verification Sent Successfully:", response.data);
        snackbar.showSnackbar(
          "Rest password link has been sent to your email",
          "success",
          { vertical: "top", horizontal: "center" },
          5000
        );
        
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
          {/* <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          </Avatar> */}
          <Avatar
            src={avatarImage}
            sx={{ m: 1, bgcolor: "secondary.main", width: 200, height: 200 }}
          />

          <Typography component="h1" variant="h5">
            Reset your password
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
          onChange={handleInputChange}
          error={!!fieldErrors.email}
          helperText={fieldErrors.email}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Verify Email
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
                <Link href="/login" variant="body2">
                  Back to Sign In
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
