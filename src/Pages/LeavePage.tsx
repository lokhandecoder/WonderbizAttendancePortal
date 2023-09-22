import React from 'react'
import SideNav from "../Components/Fixed/SideNav";
import LayoutComponent from '../Components/Fixed/LayoutComponent';
import LeaveForm from '../Components/LeavePageComponent/LeaveForm';


function LeavePage() {
  const handleSubmit = (formData: any) => {
    // Handle form submission (e.g., send the data to the server)
    console.log('Form submitted with data:', formData);
  };
  return (
    <>
     <LayoutComponent>
      <LeaveForm onSubmit={handleSubmit} />
     </LayoutComponent>
    </>
  )
}

export default LeavePage