interface FormData {
  startDate: string;
  endDate: string;
}
export function GetDifference(formData: FormData) {
  const startDateObj = new Date(formData.startDate);
  const endDateObj = new Date(formData.endDate);

  if (!isNaN(startDateObj.getTime()) && !isNaN(endDateObj.getTime())) {
    const differenceInMilliseconds =
      endDateObj.getTime() - startDateObj.getTime();
    const differenceInDays = Math.floor(
      differenceInMilliseconds / (1000 * 3600 * 24)
    );
    return differenceInDays;
  }

}

interface clearList {
  type: number;
  startDate: string;
  endDate: string;
  reason: string;
  difference: number;
  availableDays: number;
}
export function GetClear(): clearList[] {
  const clear: clearList[] = [
    {
      type: 0,
      startDate: "",
      endDate: "",
      reason: "",
      difference: 0,
      availableDays: 0,
    },
  ];

  return clear;
}
