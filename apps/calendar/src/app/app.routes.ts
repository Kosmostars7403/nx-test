import { Route } from '@angular/router';
import {CalendarPageComponent} from './pages/calendar-page/calendar-page.component';

export const appRoutes: Route[] = [
  {
    path: '',
    component: CalendarPageComponent,
    pathMatch: 'full'
  }
];
