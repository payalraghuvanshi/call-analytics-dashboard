export interface ChartData {
  name: string;
  value: number;
}

export interface CallMetrics {
  totalCalls: number;
  successfulCalls: number;
  failedCalls: number;
  averageDuration: number;
}

export interface HourlyData {
  hour: string;
  calls: number;
  duration: number;
}

export interface UserData {
  email: string;
  hourlyData?: HourlyData[];
  updatedAt?: string;
}

export interface CallDurationData {
  range: string;
  count: number;
}