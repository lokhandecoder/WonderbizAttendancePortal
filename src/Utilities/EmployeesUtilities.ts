import { useState, useEffect } from "react";
import { EmployeeModel } from "../Model/EmployeeModel";
import { DesignationModel } from "../Model/DesignationModel";
import { GenderModel } from "../Model/GenderModel";
import dayjs, { Dayjs } from "dayjs";
import { GetEmployeeByIdAsync, GetEmployeesAsync, createEmployee, updateEmployee } from "../Services/EmployeeServices";
import useCustomSnackbar from "../Components/CustomComponent/useCustomSnackbar";
import { useNavigate } from "react-router-dom";
import { GetGendersAsync } from "../Services/GenderServices";
import { GetDesignationsAsync } from "../Services/DesignationServices";
export const EmployeesUtilities = (employeeId: number) => {
  const navigate = useNavigate();
  const today = dayjs();
  const todayDate = today.toDate();
  const snackbar = useCustomSnackbar();

//   const [employeeData, setEmployeeData] = useState<EmployeeModel>({
//     employeeId: employeeId,
//     firstName: "test",
//     lastName: "test",
//     dateOfBirth: dayjs(todayDate).format("MM-DD-YYYY"),
//     dateOfJoining: dayjs(todayDate).format("MM-DD-YYYY"),
//     emailAddress: "test@test.com",
//     mobileNo: "test",
//     genderId: 1,
//     designationId: 1,
//     isActive: false,
//   });



const [employeeData, setEmployeeData] = useState<EmployeeModel[]>([]);
const [designations, setDesignations] = useState<DesignationModel[]>([]);
const [genders, setGenders] = useState<GenderModel[]>([]);

// const navigate = useNavigate();
const onEdit = (employeeId: number) => {
  navigate(`/employee/${employeeId}`);
};
 useEffect(() => {
    // Fetch designation and gender data when the component mounts
    const fetchData = async () => {
      try {
        const [designationResult, genderResult] = await Promise.allSettled([
          GetDesignationsAsync(),
          GetGendersAsync(),
        ]);
  
        setDesignations(designationResult.status === 'fulfilled' ? designationResult.value.data : []);
        setGenders(genderResult.status === 'fulfilled' ? genderResult.value.data : []);
     
    
        const employeeResult = await GetEmployeesAsync( );

        setEmployeeData(employeeResult.data);
       
      } catch (error) {
        // Handle the error (e.g., display an error message to the user)
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);



  return {
    employeeData,
    onEdit
    
  };
};
