import { SelectChangeEvent } from "@mui/material/Select";
import { EmployeeLeave } from "../Model/EmployeeLeave";
import { GetEmployeeLeave } from "../Database/LeaveType";
import { LeaveFormData } from "../Model/LeaveFormData";
const LeaveApplyUtilities = (
  formData: any,
  setFormData: React.Dispatch<any>,
  todayDate: any,
  onSubmit: any
) => {
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSubmit(formData);
    console.log(formData);
  };

  const handleSelectChange = (event: SelectChangeEvent<string | number>) => {
    const value =
      typeof event.target.value === "string"
        ? parseInt(event.target.value, 10)
        : event.target.value;
    setFormData({
      ...formData,
      leaveType: value as number,
    });
    Test();
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
      leaveType: 0,
      startDate: todayDate,
      endDate: todayDate,
      leaveReason: "",
      difference: 0,
      balanceLeave: 0,
    });
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
    if (startDate === 6) differenceInDays--;
    if (startDate === 0) differenceInDays--;
    if (endDate === 6) differenceInDays--;
    if (differenceInDays < 0) differenceInDays = 0;
    if (formData.startDate > formData.endDate) {
      return 0;
    } else {
      setFormData((prevFormData: LeaveFormData) => ({
        ...prevFormData,
        difference: differenceInDays + 1,
      }));
      // console.log("Difference in days (excluding weekends):", differenceInDays);
      return differenceInDays;
    }
  };

  const Test = () => {
    const balanceLeave = GetBalanceLeaveByLeaveTypeId(
      GetEmployeeLeave(),
      formData.leaveType
    );
    setFormData((prevFormData: LeaveFormData) => ({
      ...prevFormData,
      balanceLeave: balanceLeave,
    }));
    console.log(formData);
  };

  return {
    handleSelectChange,
    handleInputChange,
    handleDateChange,
    GetBalanceLeaveByLeaveTypeId,
    handleClear,
    handleSubmit,
    differenceChecker,
  };
};
export default LeaveApplyUtilities;
