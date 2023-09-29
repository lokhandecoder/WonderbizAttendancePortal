export interface LeaveFormData {
  
    appliedLeaveTypeId : number;
    leaveTypeId: number;
    leaveType: null;
    startDate: Date | null;
    endDate: Date | null;
    leaveReason: string;
    balanceLeave: number;
    applyLeaveDay : number,
    remaingLeave:number,
    leaveStatusId: number,
}
