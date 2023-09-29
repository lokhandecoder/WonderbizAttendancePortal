// export function Employeee(){
//     const apiUrl = 'https://leaveapplication14.azurewebsites.net/api/Leave/GetSingeEmployeeLeave/1';

// fetch(apiUrl)
//   .then(response => {
//     if (!response.ok) {
//       throw new Error('Network response was not ok');
//     }
//     return response.json();
//   })
//   .then(data => {
//     // Data has been successfully fetched
//     console.log('Fetched data:', data.data);

//     // Assuming `data` is the fetched object
//     const leaveState = {
//       balanceLeaves: data.data.balanceLeaves,
//       consumedLeaves: data.data.consumedLeaves,
//       employee: data.data.employee,
//       employeeId: data.employeeId,
//       employeeLeaveId: data.data.employeeLeaveId,
//       isActive: data.data.isActive,
//       leaveCount: data.data.leaveCount,
//       leaveType: data.data.leaveType,
//       leaveTypeId: data.data.leaveTypeId
//     };

//     console.log('Mapped leave state:', leaveState);
//     return leaveState
//   })
//   .catch(error => {
//     console.error('Error fetching data:', error);
//   });
// }