
import dayjs, { Dayjs } from "dayjs";

const today = dayjs();
const todayDate = today.toDate();

// const day = todayDate.getDate(); // Extract the day (1-31)
// const month = todayDate.getMonth() + 1; // Month is zero-based, so we add 1
// const year = todayDate.getFullYear(); // Extract the year
// const completeday = `${day}-${month}-${year}`;
// console.log(completeday);

export interface LeaveHistory {
  id: number;
  leaveType: number;
  startDate: Date | null;
  endDate: Date | null;
  leaveReason: string;
  difference: number;
  balanceLeave: number;
}
export function GetLeaveHistory(): LeaveHistory[] {
  const leavehistory: LeaveHistory[] = [
    {
      id: 1,
      leaveType: 1,
      startDate: todayDate,
      endDate: todayDate,
      leaveReason: "headache",
      difference: 1,
      balanceLeave: 0,
    },
    {
      id: 2,
      leaveType: 2,
      startDate: todayDate,
      endDate: todayDate,
      leaveReason: "emergency leave",
      difference: 1,
      balanceLeave: 0,
    },
  ];

  return leavehistory;
}
