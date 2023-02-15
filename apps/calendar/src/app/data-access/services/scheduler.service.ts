import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {FlightReport, FlightType} from '../interfaces/flight.model';

@Injectable({providedIn: 'root'})
export class SchedulerService {


  constructor(private http: HttpClient) {
  }

  getFlightsForDay(date: string | null): Observable<FlightReport[] | null> {
    if (!date) return of(null)
    return of([
      {date: date, type: FlightType.AERIAL_PHOTOGRAPHY, isAlarmFlight: false},
      {date: date, type: FlightType.POINTS, isAlarmFlight: true},
      {date: date, type: FlightType.AERIAL_PHOTOGRAPHY, isAlarmFlight: false},
    ])
  }
}
