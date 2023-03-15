import {HttpClientModule} from '@angular/common/http';
import {importProvidersFrom} from '@angular/core';
import {Route} from '@angular/router';
import {NgxsModule} from '@ngxs/store';
import {CalendarState} from './data-access/stores/calendar-store/calendar.state';
import {CalendarPageComponent} from './pages/calendar-page/calendar-page.component';
import {CESIUM_API_KEY} from "@shared";

export const appRoutes: Route[] = [
  {
    path: '',
    component: CalendarPageComponent,
    pathMatch: 'full',
    providers: [
      importProvidersFrom(HttpClientModule, NgxsModule.forFeature([CalendarState])),
      {
        provide: CESIUM_API_KEY,
        useValue: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIzZWE4NmU3Mi03MjRhLTQ5NmMtYjYyNi1lOTNlOWFjNWYxNDgiLCJpZCI6MTIzMjM0LCJpYXQiOjE2NzUzNTQ3NjZ9.ksXDKOB00GPQSNZvWLZAhM85oHsTyrcHQblm0VAvI-g'
      },
    ],
  },
];
