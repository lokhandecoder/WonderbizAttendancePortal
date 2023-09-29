// import axios from "axios";
// import { API_URL } from "./APIConfig";
// import { handleError } from "./APIErrorHandling";

// // https://leaveapplication14.azurewebsites.net/api/employee/GetAllAppliedLeaves


// export async function GetLeaveTypeList() {
//   try {
//     const response = await axios.get(API_URL + "GetSingleAppliedLeave2");
//     return response.data;
//   } catch (error) {
//     handleError(error, "An error occurred while  CreateEmrFileAsync.");
//   }
// }
// export async function createLeaveApply(leaveform) {
//   try {
//     const response = await axios.post(
//       API_URL + `CreateAppliedLeave`,
//       leaveform
//     );
//     return response.data;
//   } catch (error) {
//     handleError(error, "An error occurred while  CreateEmrFileAsync.");
//   }
// }

// export async function GetLeaveApplyById() {
//   try {
//     const response = await axios.get(API_URL + "GetSingleAppliedLeave2");
//     return response.data;
//   } catch (error) {
//     handleError(error, "An error occurred while  CreateEmrFileAsync.");
//   }
// }

// export async function GetEmployeeLeaves() {

//   try {
//     const response = await axios.get("https://leaveapplication14.azurewebsites.net/api/Leave/GetSingeEmployeeLeave/1");
//     return response.data.data;
//   } catch (error) {
//     handleError(error, "An error occurred while  CreateEmrFileAsync.");
//   }

// }

// export async function UpdateLeaveApply(updatedata, id) {
//   try {
//     const response = await axios.put(
//       API_URL + `UpdateAppliedLeave` + id,
//       updatedata
//     );
//     return response.data;
//   } catch (error) {
//     handleError(error, "An error occurred while  CreateEmrFileAsync.");
//   }
// }
