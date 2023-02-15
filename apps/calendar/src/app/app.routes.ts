import {HttpClientModule} from '@angular/common/http';
import {importProvidersFrom} from '@angular/core';
import { Route } from '@angular/router';
import {NgxsModule} from '@ngxs/store';
import {CalendarState} from './data-access/stores/calendar-store/calendar.state';
import {CalendarPageComponent} from './pages/calendar-page/calendar-page.component';
import '../decl.d'

export const appRoutes: Route[] = [
  {
    path: '',
    component: CalendarPageComponent,
    pathMatch: 'full',
    providers: [
      importProvidersFrom(HttpClientModule, NgxsModule.forFeature([CalendarState]))
    ]
  },
];
