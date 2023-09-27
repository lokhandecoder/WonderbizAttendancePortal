import { SelectChangeEvent } from "@mui/material/Select";
import { EmployeeLeave } from "../Model/EmployeeLeave";
import { GetEmployeeLeave } from "../Database/LeaveType";
import { LeaveFormData } from "../Model/LeaveFormData";
import { GetLeaveHistory } from "../Database/LeaveHIstory";
import { Console } from "console";
import axios from "axios";
const LeaveApplyUtilities = (
  formData: any,
  setFormData: React.Dispatch<any>,
  todayDate: any,
  onSubmit: any,
  setSnackbarOpen: any,
  setsubmitMessageOpen: any,
  setsnackbarDateValid: any,
  setsnackLeavetype: any,
  difference: any,
  setdifference: any,
  balanceLeave: any,
  setBalanceLeave: any,
) => {
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // IsValidDate();
    if (balanceLeave < difference) {
      console.log("Error: You do not have sufficient leaves.");
      setSnackbarOpen(true);
    } else if (!IsValidDate()) {
      setsnackbarDateValid(true);
      console.log("Error : Endate should be greater than start end");
    } else if (formData.leaveTypeId < 0) {
      setsnackLeavetype(true);
      console.log("Select tthe type");
    } else {
      onSubmit(formData);
      axios.post("https://leaveapplication14.azurewebsites.net/api/employee/CreateAppliedLeave",formData).then((res) => console.log("Send", res)).catch((e) => console.log("BAd",e));
      setsubmitMessageOpen(true);
    }
    // const list = GetLeaveHistory();
    // list.push(formData);
  };

  const IsValidDate = () => {
    if (formData.endDate >= formData.startDate) {
      console.log("valid");
      return true;
    } else {
      console.log("invalid");
      return false;
    }
  };

  const handleSelectChange = (event: SelectChangeEvent<string | number>) => {
    const value =
      typeof event.target.value === "string"
        ? parseInt(event.target.value, 10)
        : event.target.value;
    setFormData({
      ...formData,
      leaveTypeId: value as number,
    });
    // Test();
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleDateChange = (name: string, date: Date | null) => {
    setFormData({
      ...formData,
      [name]: date,
    });
    // differenceCehcker();

    // Test()
  };

  const handleClear = () => {
    setFormData({
      leaveTypeId: 0,
      startDate: todayDate,
      endDate: todayDate,
      leaveReason: "",
    });
    setdifference(0)
  };

  const GetBalanceLeaveByLeaveTypeId = (
    employeeLeaves: EmployeeLeave[],
    leaveTypeId: number
  ): number | null => {
    const employeeLeave = employeeLeaves.find(
      (leave) => leave.leaveTypeId === leaveTypeId
    );
    return employeeLeave ? employeeLeave.balanceLeave : null;
  };
  const differenceChecker = () => {
    const date1 = new Date(formData.startDate);
    const date2 = new Date(formData.endDate);
    const differenceInMilliseconds = Math.abs(
      date2.getTime() - date1.getTime()
    );
    let differenceInDays = Math.ceil(
      differenceInMilliseconds / (1000 * 3600 * 24)
    );
    const startDate = date1.getDay(); // 0 for Sunday, 1 for Monday, ..., 6 for Saturday
    const endDate = date2.getDay();
    const weekends = Math.floor((differenceInDays + startDate) / 7) * 2;
    differenceInDays -= weekends;
    const finaldays = differenceInDays + 1;
    if (startDate === 6) differenceInDays--;
    if (startDate === 0) differenceInDays--;
    if (endDate === 6) differenceInDays--;
    if (differenceInDays < 0) differenceInDays = 0;
    if (formData.startDate > formData.endDate) {
      return 0;
    } else {
      setdifference(finaldays)
      // setFormData((prevFormData: LeaveFormData) => ({
      //   ...prevFormData,
      //   difference: finaldays,
      // }));
      console.log("Difference in days (excluding weekends):", finaldays);
      return finaldays;
    }
  };

  const Test = () => {
    if (formData.leaveTypeId > 0) {
      const balanceLeave = GetBalanceLeaveByLeaveTypeId(
        GetEmployeeLeave(),
        formData.leaveTypeId
      );
      setFormData((prevFormData: LeaveFormData) => ({
        ...prevFormData,
        balanceLeave: balanceLeave,
      }));
      differenceChecker();
    } else {
      setFormData((prevFormData: LeaveFormData) => ({
        ...prevFormData,
        difference: 0,
        balanceLeave: 0,
      }));
    }
  };

  return {
    handleSelectChange,
    handleInputChange,
    handleDateChange,
    GetBalanceLeaveByLeaveTypeId,
    handleClear,
    handleSubmit,
    Test,
    differenceChecker,
  };
};
export default LeaveApplyUtilities;
