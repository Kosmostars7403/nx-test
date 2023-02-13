import { Route } from '@angular/router';
import { CatalogComponent } from './catalog/catalog.component';

export const appRoutes: Route[] = [
  {
    path: 'list',
    component: CatalogComponent,
    pathMatch: 'full',
  },
];
