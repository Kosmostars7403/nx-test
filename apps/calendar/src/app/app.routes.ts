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
    children: [
      {
        path: '',
        outlet: 'map',
        loadChildren: async () => {
          try {
            const m = await import('mapMf/routes');
            return m.appRoutes;
          } catch (err) {
            console.warn('Cannot load module "Map"', err);
          }
        },
      },
    ],
    providers: [
      importProvidersFrom(NgxsModule.forFeature([CalendarState]))
    ]
  },
];
