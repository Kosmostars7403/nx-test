import { Action, Selector, State, StateContext } from '@ngxs/store'
import { Injectable } from '@angular/core'

import { Observable, tap } from 'rxjs'
import {FlightReport} from '../../interfaces/flight.model';
import {SchedulerService} from '../../services/scheduler.service';
import {GetFlightReports} from './calendar.actions';


export type CalendarStateModel = {
  flightReports: FlightReport[] | null
};

@State<CalendarStateModel>({
  name: 'calendarState',
  defaults: {
    flightReports: null,
  }
})
@Injectable()
export class CalendarState {

  constructor(private schedulerService: SchedulerService) {
  }

  @Selector()
  public static getFlightReports(state: CalendarStateModel): FlightReport[] | null {
    return state.flightReports
  }


  @Action(GetFlightReports)
  public getCategoriesMenu(ctx: StateContext<CalendarStateModel>, {date}: GetFlightReports): Observable<FlightReport[] | null> {
    return this.schedulerService.getFlightsForDay(date).pipe(
      tap(flightReports => {
        ctx.patchState({flightReports})
      })
    )
  }

}
