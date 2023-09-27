import dayjs, { Dayjs } from "dayjs";

const today = dayjs();
const todayDate = today.toDate();
export interface LeaveData {
  id: number;
  leaveType: number;
  startDate: Date | null;
  endDate: Date | null;
  leaveReason: string;
  difference: number;
  balanceLeave: number;
}
export function GetLeaveData(): LeaveData[] {
  const leavedata: LeaveData[] = [
    {
      id: 0,
      leaveType: 1,
      startDate: todayDate,
      endDate: todayDate,
      leaveReason: "headache",
      difference: 1,
      balanceLeave: 0,
    }
  ];

  return leavedata;
}
