import axios from 'axios';
import { LeaveType } from '../Database/LeaveType';

//https://leaveapplication14.azurewebsites.net/api/LeaveType/GetAllLeaveTypes
const API_URL = 'https://leaveapplication14.azurewebsites.net/api/LeaveType'; // Replace with your API endpoint

//async function getLeaveTypes(): Promise<CommonResponse<LeaveType>> {

export async function getLeaveTypes(): Promise<{ data: LeaveType[] }> {
  try {
  //  const response = await axios.get<LeaveType[]>(`${API_URL}/GetAllLeaveTypes`);
  const response = await axios.get<{ data: LeaveType[] }>(`${API_URL}/GetAllLeaveTypes`);
   console.log("Data from api",response.data.data)
    return response.data;
    
  } catch (error) {
    throw new Error('Failed to fetch leave types: ' + (error as Error).message);
  }
}