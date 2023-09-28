import axios from 'axios';
import { API_URL } from './APIConfig';
import { handleError } from './APIErrorHandling';


// https://leaveapplication14.azurewebsites.net/api/employee/GetAllAppliedLeaves
export async function createLeaveApply(leaveform) {
    try {
      const response = await axios.post(API_URL+`CreateAppliedLeave`, leaveform);
      return response.data;
    } catch (error) {
      handleError(error, "An error occurred while  CreateEmrFileAsync.");
    }
  }

  export async function GetLeaveApplyById() {
    try {
      const response = await axios.get(API_URL+ "GetSingleAppliedLeave2");
      return response.data;
    } catch (error) {
      handleError(error, "An error occurred while  CreateEmrFileAsync.");
    }
  }
  // export async function GetAllAppliedLeaves() {

  //   axios.get(API_URL+"GetAllAppliedLeaves").then((res) =>{ return res}).catch((e) => console.log(e));
  //   // try {
  //   //   const response = await axios.get(API_URL+ "GetAllAppliedLeaves");
  //   //   return response.data;
  //   // } catch (error) {
  //   //   handleError(error, "An error occurred while  CreateEmrFileAsync.");
  //   // }
  // }
  
  export async function UpdateLeaveApply(updatedata, id) {
    try {
      const response = await axios.put(API_URL+`UpdateAppliedLeave`+ id, updatedata);
      return response.data;
    } catch (error) {
      handleError(error, "An error occurred while  CreateEmrFileAsync.");
    }
  } 