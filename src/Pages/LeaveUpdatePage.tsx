import React from 'react'
import LeaveUpdate from '../Components/LeavePageComponent/LeaveUpdate';
import LayoutComponent from '../Components/Fixed/LayoutComponent';

function LeaveUpdatePage() {
    const handleUpdateSubmit = (formData: any) => {
        // Handle form submission (e.g., send the data to the server)
        console.log('Form updated with data:', formData);
        // axios.put("https://leaveapplication14.azurewebsites.net/api/employee/UpdateAppliedLeave1")
      };
      return (
        <>
         <LayoutComponent>
          <LeaveUpdate onSubmit={handleUpdateSubmit} />
         </LayoutComponent>
        </>
      )
}

export default LeaveUpdatePage