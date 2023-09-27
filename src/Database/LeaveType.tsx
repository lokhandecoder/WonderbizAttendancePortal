import { EmployeeLeave } from "../Model/EmployeeLeave";
export interface LeaveType {
  leaveTypeId: number;
  leaveTypeName: string;
}

export function GetLeaveType(): LeaveType[] {
  const leaveType: LeaveType[] = [
    {
      leaveTypeId: 1,
      leaveTypeName: "Vacation",
    },
    {
      leaveTypeId: 2,
      leaveTypeName: "Sick Leave",
    },
    { leaveTypeId: 3, leaveTypeName: "Personal Leave" },
    { leaveTypeId: 4, leaveTypeName: "Maternity/Paternity Leave" },
  ];

  return leaveType;
}

export function GetEmployeeLeave(): EmployeeLeave[] {
  const EmployeeleaveType: EmployeeLeave[] = [
    {
      leaveTypeId: 1,
      employeeId: 1,
      balanceLeave: 13,
    },
    {
      leaveTypeId: 2,
      employeeId: 1,
      balanceLeave: 10,
    },

    { leaveTypeId: 3, employeeId: 1, balanceLeave: 10 },
  ];

  return EmployeeleaveType;
}
