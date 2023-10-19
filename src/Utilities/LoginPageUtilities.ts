import { useState } from "react";
import Axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../APIConfig";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";


interface FormData {
  email: string;
  password: string;
}
export const LoginPageUtilities = () => {
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const Navigate = useNavigate();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    let updatedFieldErrors = { ...fieldErrors };

    if (name === "email" && value.trim() !== "") {
      updatedFieldErrors = { ...updatedFieldErrors, email: "" };
    }

    if (name === "password" && value.trim() !== "") {
      updatedFieldErrors = { ...updatedFieldErrors, password: "" };
    }

    setFieldErrors(updatedFieldErrors);
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const isValidEmail = (email: string) => {
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
          if (response.data.status === 200) {
            localStorage.setItem("EmployeeID", response.data.data.employeeId);
            Navigate("/");
            toast.success("Login successful!");
          }
          toast.error("Login failed. Please try again.");
        })
        .catch((error) => {
          console.error("Error submitting:", error);
          toast.error("Login failed. Please try again.");
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


  return {
    handleInputChange,
    handleSubmit,
    fieldErrors,
    formData,
  };
};
