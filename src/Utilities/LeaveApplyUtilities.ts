import { SelectChangeEvent } from "@mui/material/Select";
import { EmployeeLeave } from "../Model/EmployeeLeave";
import { GetEmployeeLeave } from "../Database/LeaveType";
import { LeaveFormData } from "../Model/LeaveFormData";
const LeaveApplyUtilities = (
  formData: any,
  setFormData: React.Dispatch<any>
) => {
  const handleSelectChange = (event: SelectChangeEvent<string | number>) => {
    const value =
      typeof event.target.value === "string"
        ? parseInt(event.target.value, 10)
        : event.target.value;
    setFormData({
      ...formData,
      leaveType: value as number, // Ensure it's treated as a number
    });
    // console.log(formData);
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



    // Test()
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
  const differenceCehcker = () => {
    const date1 = new Date(formData.startDate);
    const date2 = new Date(formData.endDate);
    const differenceInMilliseconds = Math.abs(
      date2.getTime() - date1.getTime()
    );
    const differenceInDays = differenceInMilliseconds / (1000 * 3600 * 24);
    const diff = Math.round(differenceInDays) + 1;
    console.log(diff);
    if (formData.startDate > formData.endDate) {
      return 0;
    } else {
      return diff;
      // setFormData((prevFormData: LeaveFormData) => ({
      //   ...prevFormData,
      //   difference: diff,
      // }));
    }
  };
  differenceCehcker();






  const Test = () => {
    const balanceLeave = GetBalanceLeaveByLeaveTypeId(
      GetEmployeeLeave(),
      formData.leaveType
    );
    setFormData((prevFormData: LeaveFormData) => ({
      ...prevFormData,
      balanceLeave: balanceLeave,
    }));
    // differenceCehcker();

    // const difference2 =   differenceCehcker();
    



    console.log(formData);
  };

  return {
    handleSelectChange,
    handleInputChange,
    handleDateChange,
    GetBalanceLeaveByLeaveTypeId,
  };
};
export default LeaveApplyUtilities;
