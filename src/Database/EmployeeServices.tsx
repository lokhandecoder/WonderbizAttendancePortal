export interface Employee {
  employeeId: string;
  firstName: string;
  lastName: string;
  gender: string;
  jobTitle: string;
  designationId: number;
  designation: {
    designationName: string;
    designationCode: string;
    isActive: Boolean;
  };
  isActive : Boolean;
}
export function GetEmployes(): Employee[] {
  const employees: Employee[] = [
    // {
    //   employeeId: "101",
    //   firstName: "John",
    //   lastName: "Doe",
    //   gender: "",
    //   designationId: 1,
    //   designation: {
    //     designationName: "Manager",
    //     designationCode: "MGR",
    //     isActive: true,
    //   },
    //   isActive: true,
    // },
    // {
    //   employeeId: "101",
    //   firstName: "John",
    //   lastName: "Doe",
    //   gender: "",
    //   designationId: 1,
    //   designation: {
    //     designationName: "Manager",
    //     designationCode: "MGR",
    //     isActive: true,
    //   },
    //   isActive: true,
    // },
  ];

  return employees;
}
