export interface EmployeeModel {
    employeeId: number,
      firstName: string;
      lastName: string;
      dateOfBirth: string | null;
      dateOfJoining: string | null;
      emailAddress: string;
      mobileNo: string;
      genderId: number;
      designationId: number;
      isActive: boolean;
    }