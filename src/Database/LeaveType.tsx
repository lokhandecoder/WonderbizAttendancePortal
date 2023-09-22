export interface LeaveType {
  
    leaveTypeId :number;
    leaveTypeName: string;
  //leaveCount: number;
}
export interface EmployeeLeave {
  
    leaveTypeId :number;
    employeeId: number;
    balanceLeave: number;
}

export function GetLeaveType(): LeaveType[] {
  const leaveType: LeaveType[] = [
    { 
        leaveTypeId : 1,
      leaveTypeName: "Sick Leave",

    },
    {
        leaveTypeId : 2,
        leaveTypeName: "Casual Leave",
    },
    {   leaveTypeId : 3,
        leaveTypeName: "Paternity/Maternity Leave",
    },
  ];

  return leaveType;
}

export function GetEmployeeLeave(): EmployeeLeave[] {
    const EmployeeleaveType: EmployeeLeave[] = [
      { 
          leaveTypeId : 1,
          employeeId: 1,
          balanceLeave: 13,
  
      },
      {
        leaveTypeId : 2,
        employeeId: 1,
        balanceLeave: 10,
      },

       {   leaveTypeId : 3,
        employeeId: 1,
        balanceLeave: 10,
      },
    ];
  
    return EmployeeleaveType;
  }
  