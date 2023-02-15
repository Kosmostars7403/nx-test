export enum FlightType {
  POINTS ='POINTS',
  AERIAL_PHOTOGRAPHY ='AERIAL_PHOTOGRAPHY'
}

export interface FlightReport {
  date: string,
  type: FlightType,
  isAlarmFlight: boolean,
}
