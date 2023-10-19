import React, { useState, useEffect } from "react";
import Axios from "axios";
import { useParams } from "react-router-dom"; // Import useParams to get the ID from the route params
import { API_URL } from "../APIConfig";
import useCustomSnackbar from "../Components/CustomComponent/useCustomSnackbar";

export const UpdatePasswordUtilities = () => {
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
    formData,
    fieldErrors,
    snackbar,
  };
};
