import useCustomSnackbar from "../Components/CustomComponent/useCustomSnackbar";
import React, { useState } from "react";
import Axios from "axios";
import { API_URL } from "../APIConfig";

export const ForgotPageUtilities = () => {
  const snackbar = useCustomSnackbar();
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    if ((name === "email" || name === "password") && value.trim() !== "") {
      setFieldErrors((prevErrors) => ({
        ...prevErrors,
        [name]: "",
      }));
    }
  };
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const formDataObject: { [key: string]: string } = {};

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
      return;
    }

    Axios.post(`${API_URL}passwordReset/VerifyEmailAsync`, formDataObject)
      .then((response) => {
        console.log("Email Verification Sent Successfully:", response.data);
        snackbar.showSnackbar(
          "Rest password link has been sent to your email",
          "success",
          { vertical: "top", horizontal: "center" },
          5000
        );
      })
      .catch((error) => {
        console.error("Error submitting:", error);
        snackbar.showSnackbar(
          "Failed to Change Password",
          "error",
          { vertical: "top", horizontal: "center" },
          5000
        );
      });
  };

  return {
    handleInputChange,
    handleSubmit,
    fieldErrors,
    snackbar,
  };
};
