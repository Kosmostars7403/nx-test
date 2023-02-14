import { Route } from '@angular/router';
import {MapPageComponent} from './map-page/map-page.component';
import {MapComponent} from './map/map.component';

export const appRoutes: Route[] = [
  {
    path: '',
    component: MapComponent,
    pathMatch: 'full',
  },
  {
    path: 'map-page',
    component: MapPageComponent,
  },
];
