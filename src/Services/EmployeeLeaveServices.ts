import axios from 'axios';
import { LeaveType } from '../Database/LeaveType';
import { EmployeeLeave } from '../Model/EmployeeLeave';
import { API_URL } from '../APIConfig';

//https://leaveapplication14.azurewebsites.net/api/LeaveType/GetAllLeaveTypes
// const API_URL = 'https://leaveapplication14.azurewebsites.net/api/LeaveType'; // Replace with your API endpoint

export async function GetEmployeeLeaveByEmployeeId(): Promise<{ data: EmployeeLeave[]}> {
  try {
  //  const response = await axios.get<LeaveType[]>(`${API_URL}/GetAllLeaveTypes`);
  const ID = localStorage.getItem("EmployeeID");
  // alert(ID);
  const response = await axios.get<{ data: EmployeeLeave[] }>(`${API_URL}EmployeeLeave/GetEmployeeLeaveByEmployeeId/${ID}`);

  // alert(JSON.stringify(response.data));
    return response.data;
    
  } catch (error) {
    throw new Error('Failed to fetch leave types: ' + (error as Error).message);
  }
}

