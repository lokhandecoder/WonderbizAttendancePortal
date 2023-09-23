export interface Employee {
  employeeId: string;
  firstName: string;
  lastName: string;
  gender: string;
  designationId: number;
  designationName: string;
  isActive : Boolean;
}
export function GetEmployes(): Employee[] {
  const employees: Employee[] = [
    {
      employeeId: "101",
      firstName: "John",
      lastName: "Doe",
      gender: "Male",
      designationId: 1,
      designationName: "string",
      isActive: true,
    },
    {
      employeeId: "101",
      firstName: "John",
      lastName: "Doe",
      gender: "Male",
      designationId: 1,
      designationName: "string",
      isActive: true,
    },
  ];

  return employees;
}
