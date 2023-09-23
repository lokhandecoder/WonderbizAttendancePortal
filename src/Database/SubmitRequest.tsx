import dayjs from "dayjs";

const today = dayjs();
const todayDate = today.toDate();
export interface SubmitRequest {
  leaveType: number;
  startDate: Date | null;
  endDate: Date | null;
  leaveReason: string;
  difference: number;
  balanceLeave: number;
}

export function GetSubmitRequest(): SubmitRequest[] {
  const SubmitReq: SubmitRequest[] = [
    {
      leaveType: 1,
      startDate: todayDate,
      endDate: todayDate,
      leaveReason: "i am sick",
      difference: 2,
      balanceLeave: 10,
    },
    {
      leaveType: 2,
      startDate: todayDate,
      endDate: todayDate,
      leaveReason: "i have some urgent work",
      difference: 1,
      balanceLeave: 8,
    },
    {
      leaveType: 3,
      startDate: todayDate,
      endDate: todayDate,
      leaveReason: "leave for paternity",
      difference: 15,
      balanceLeave: 6,
    },
  ];

  return SubmitReq;
}
