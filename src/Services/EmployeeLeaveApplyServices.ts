import { API_URL } from "../APIConfig";
import { LeaveFormData } from "../Model/LeaveFormData";import axios from "axios";

//UpdateAppliedLeaveAsync/18
// const API_URL = 'https://leaveapplication14.azurewebsites.net/api/employee/';
// const API_URL = "http://localhost:5024/api/appliedLeave/";
//https://leaveapplication14.azurewebsites.net/api/appliedLeave/CreateAppliedLeaveAsync

export async function GetApplyLeaveById(appliedLeaveTypeId: number): Promise<{ data: LeaveFormData }> {

    try {
      const response = await axios.get<{data:LeaveFormData}>(`${API_URL}appliedLeave/GetAppliedLeaveByIdAsync/${appliedLeaveTypeId}`);
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch leave data: ' + (error as Error).message);
    }
  }

  export async function createLeaveApply(leaveForm: LeaveFormData): Promise<any> {
    try {
      const response = await axios.post(`${API_URL}appliedLeave/CreateAppliedLeaveAsync`, leaveForm);
      console.log(response.data);
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch leave data: ' + (error as Error).message);
    }
  }
  export async function updateLeaveApply(id: number, leaveForm: LeaveFormData): Promise<any> {
    try {
      const response = await axios.put(`${API_URL}appliedLeave/UpdateAppliedLeaveAsync/${id}`, leaveForm);
      return response.data;
    } catch (error) {
      throw new Error('Failed to update leave data: ' + (error as Error).message);
    }
  }
  export async function GetAppliedLeavesAsync(): Promise<any> {
    try {
      const response = await axios.get(`${API_URL}appliedLeave/GetAppliedLeavesAsync`);
      return response.data;
    } catch (error) {
      throw new Error('Failed to update leave data: ' + (error as Error).message);
    }
  }
  export async function GetAppliedLeavesByEmpIdAsync(): Promise<any> {
    try {
      const empID = localStorage.getItem("EmployeeID")
      const response = await axios.get(`${API_URL}appliedLeave/GetAppliedLeavesByEmpIdAsync/${empID}`);
      return response.data;
    } catch (error) {
      throw new Error('Failed to update leave data: ' + (error as Error).message);
    }
  }
  export async function updateLeaveStatus(id: number, leaveForm: LeaveFormData): Promise<any> {
    try {
      const response = await axios.put(`${API_URL}UpdateAppliedLeaveAsync/${id}`, leaveForm);
      return response.data;
    } catch (error) {
      throw new Error('Failed to update leave data: ' + (error as Error).message);
    }
  }

  export async function UpdateIsRejectedAsync(appliedLeaveTypeId: number, isRejected: boolean): Promise<any> {
    try {
      const response = await axios.get(`${API_URL}AppliedLeave/UpdateIsRejectedAsync/${appliedLeaveTypeId}/${isRejected}`);
      return response.data;
    } catch (error) {
      throw new Error('Failed to update leave data: ' + (error as Error).message);
    }
  }
  
  export async function UpdateIsApprovedAsync(appliedLeaveTypeId: number, isApproved: boolean): Promise<any> {
    try {
     
      const response = await axios.get(`${API_URL}AppliedLeave/UpdateIsApprovedAsync/${appliedLeaveTypeId}/${isApproved}`);
      return response.data;
    } catch (error) {
      throw new Error('Failed to update leave data: ' + (error as Error).message);
    }
  }

  export async function UpdateIsApprovedCancelAsync(appliedLeaveTypeId: number, isApproved: boolean): Promise<any> {
    try {
      const response = await axios.put(`${API_URL}AppliedLeave/UpdateIsApprovedCancelAsync/${appliedLeaveTypeId}/${isApproved}`);
      return response.data;
    } catch (error) {
      throw new Error('Failed to update leave data: ' + (error as Error).message);
    }
  }