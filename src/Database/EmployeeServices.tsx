export interface Employee {
  employeeId: string;
  firstName: string;
  lastName: string;
  gender: string;
  designationId: number;
  designationName: string;
  isActive : Boolean;
  Manager: Boolean;
}
export function GetEmployees(): Employee[] {
  const employees: Employee[] = [
    {
      employeeId: "101",
      firstName: "John",
      lastName: "Cena",
      gender: "Male",
      designationId: 1,
      designationName: "string",
      isActive: true,
      Manager : false,
    },
    {
      employeeId: "102",
      firstName: "randy",
      lastName: "Orton",
      gender: "Male",
      designationId: 1,
      designationName: "string",
      isActive: true,
      Manager : false,
    },
    {
      employeeId: "103",
      firstName: "randy",
      lastName: "Orton",
      gender: "Male",
      designationId: 1,
      designationName: "string",
      isActive: true,
      Manager: true,

    }
  ];

  return employees;
}
