export interface LeaveFormData {
  leaveType: number;
  startDate: Date | null;
  endDate: Date | null;
  leaveReason: string;
  difference: number;
  balanceLeave: number;
}
