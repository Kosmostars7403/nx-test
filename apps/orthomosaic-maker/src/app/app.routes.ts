import {HttpClientModule} from '@angular/common/http';
import {importProvidersFrom} from '@angular/core';
import { Route } from '@angular/router';
import {NgxsModule} from '@ngxs/store';
import {OrthomosaicMakerComponent} from './pages/orthomosaic-maker/orthomosaic-maker.component';

export const appRoutes: Route[] = [
  {
    path: '',
    component: OrthomosaicMakerComponent,
    pathMatch: 'full',
    providers: [
      importProvidersFrom(HttpClientModule, NgxsModule.forFeature([]))
    ]
  }
];
