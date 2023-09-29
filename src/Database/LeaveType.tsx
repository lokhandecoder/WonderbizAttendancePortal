import { EmployeeLeave } from "../Model/EmployeeLeave";
import axios, { AxiosError } from 'axios';
// import { GetEmployeeLeaves, GetLeaveApplyById, GetLeaveTypeList } from "../Services/LeaveApplyServices";
// import { Employeee } from "../Services/Employee";

export interface LeaveType {
  leaveTypeId: number;
  leaveTypeName: string;
}

export function GetLeaveType(): LeaveType[] {
  // console.log(GetLeaveTypeList());

  const leaveType: LeaveType[] = [
    // {
    //   leaveTypeId: 1,
    //   leaveTypeName: "Vacation",
    // },
    // {
    //   leaveTypeId: 2,
    //   leaveTypeName: "Sick Leave",
    // },
    // { leaveTypeId: 3, leaveTypeName: "Personal Leave" },
    // { leaveTypeId: 4, leaveTypeName: "Maternity Leave" },
    // { leaveTypeId: 5, leaveTypeName: "Paternity Leave" },
  ];

  return leaveType;
}

export function GetEmployeeLeave(): EmployeeLeave[] {
  const EmployeeleaveType: EmployeeLeave[] = [
    // {
    //   leaveTypeId: 1,
    //   employeeId: 1,
    //   balanceLeave: 13,
    // },
    // {
    //   leaveTypeId: 2,
    //   employeeId: 1,
    //   balanceLeave: 10,
    // },

    // { leaveTypeId: 3, employeeId: 1, balanceLeave: 10 },
  ];
  // Employeee()

  // const data = GetEmployeeLeaves().then((res) => console.log(res));
  // console.log("Enable data", data);


  return EmployeeleaveType;
}
