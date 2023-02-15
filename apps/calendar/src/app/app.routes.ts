import { Route } from '@angular/router';
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
    ]
  },
];
