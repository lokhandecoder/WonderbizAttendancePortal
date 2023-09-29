export interface CommonResponse <T>{
  status: number;
  message: string;
  data: T[];
  additionalParameters: null | any; // Modify this based on the actual type
  }