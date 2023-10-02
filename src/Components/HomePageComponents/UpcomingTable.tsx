import React from "react";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Collapse from "@mui/material/Collapse";
import Box from "@mui/material/Box";

interface Holiday {
  date: string;
  holiday: string;
}

interface UpcomingTableProps {
  holidays: Holiday[];
}

const UpcomingTable: React.FC<UpcomingTableProps> = ({ holidays }) => {
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Holiday</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {holidays.map((holiday, index) => (
            <React.Fragment key={index}>
              <TableRow>
                <TableCell>{holiday.date}</TableCell>
                <TableCell>{holiday.holiday}</TableCell>
              </TableRow>
            </React.Fragment>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default UpcomingTable;








// import * as React from 'react';
// import Table from '@mui/material/Table';
// import TableBody from '@mui/material/TableBody';
// import TableCell from '@mui/material/TableCell';
// import TableContainer from '@mui/material/TableContainer';
// import TableHead from '@mui/material/TableHead';
// import TableRow from '@mui/material/TableRow';
// import Paper from '@mui/material/Paper';


// interface Holiday {
//     date: string;
//     holiday: string;
//   }

//   const holidays: Holiday[] = [
//     {
//       date: "2023-10-02",
//       holiday: "Gandhi Jayanti",
//     },
//     {
//       date: "2023-10-19",
//       holiday: "Diwali (Deepavali)",
//     },
//     {
//       date: "2023-12-25",
//       holiday: "Christmas",
//     },
//     {
//       date: "2024-01-01",
//       holiday: "New Year's Day",
//     },
//     {
//       date: "2024-01-26",
//       holiday: "Republic Day",
//     },
//     {
//       date: "2024-03-18",
//       holiday: "Holi",
//     },
//     {
//       date: "2024-04-05",
//       holiday: "Good Friday",
//     },
//     {
//       date: "2024-04-14",
//       holiday: "Baisakhi (Vaisakhi)",
//     },
//     {
//       date: "2024-05-01",
//       holiday: "Labour Day (May Day)",
//     },
//     {
//       date: "2024-04-23",
//       holiday: "Eid ul-Fitr",
//     },
//     {
//       date: "2024-08-15",
//       holiday: "Independence Day",
//     },
//     {
//       date: "2024-09-02",
//       holiday: "Ganesh Chaturthi",
//     },
//   ];

// export default function BasicTable() {
//   return (
//     <TableContainer component={Paper}>
//       <Table sx={{ minWidth: 300 }} aria-label="simple table">
//         <TableHead>
//           <TableRow>
//             <TableCell>Holidays</TableCell>
//             <TableCell align="right">Date</TableCell>
//           </TableRow>
//         </TableHead>
//         <TableBody>
//           {holidays.map((days,index) => (
//             <TableRow
//               key={index}
//               sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
//             >
//               <TableCell component="th" scope="row">
//                 {days.holiday}
//               </TableCell>
//               <TableCell align="right">{days.date}</TableCell>
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>
//     </TableContainer>
//   );
// }
