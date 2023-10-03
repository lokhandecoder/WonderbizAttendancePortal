import axios from 'axios';
import { LeaveType } from '../Database/LeaveType';
import { EmployeeLeave } from '../Model/EmployeeLeave';
import { API_URL } from '../APIConfig';

//https://leaveapplication14.azurewebsites.net/api/LeaveType/GetAllLeaveTypes
// const API_URL = 'https://leaveapplication14.azurewebsites.net/api/LeaveType'; // Replace with your API endpoint

export async function GetEmployeeLeaveByEmployeeId(): Promise<{ data: EmployeeLeave[]}> {
  try {
  //  const response = await axios.get<LeaveType[]>(`${API_URL}/GetAllLeaveTypes`);
  const response = await axios.get<{ data: EmployeeLeave[] }>(`${API_URL}EmployeeLeave/GetEmployeeLeaveByEmployeeId/3`);
    return response.data;
    
  } catch (error) {
    throw new Error('Failed to fetch leave types: ' + (error as Error).message);
  }
}
