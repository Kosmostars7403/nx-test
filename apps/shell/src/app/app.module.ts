import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { NgxsModule } from '@ngxs/store';

import { AppComponent } from './app.component';
import { MainPageComponent } from './main-page/main-page.component';
import {CcCesiumModule} from "@cc-cesium";
import {CESIUM_API_KEY} from "@shared";
import {ReactiveFormsModule} from "@angular/forms";

@NgModule({
  declarations: [AppComponent, MainPageComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    NgxsModule.forRoot([]),
    RouterModule.forRoot([
      // {
      //   path: 'map',
      //   loadChildren: () =>
      //     loadRemoteModule({
      //       type: 'module',
      //       remoteEntry: 'http://localhost:4201/remoteEntry.js',
      //       exposedModule: './routes',
      //     }).then((m) => m.appRoutes),
      // },

      {
        path: '',
        component: MainPageComponent
      },

      // {
      //   path: 'map',
      //   loadChildren: async () => {
      //     try {
      //       const m = await import('mapMf/routes');
      //       return m.appRoutes;
      //     } catch (err) {
      //       console.warn('Cannot load module "Map"', err);
      //     }
      //   },
      // },

      {
        path: 'calendar',
        loadChildren: async () => {
          try {
            const m = await import('calendarMf/routes');
            return m.appRoutes;
          } catch (err) {
            console.warn('Cannot load module "Calendar"', err);
          }
        },
      },

      {
        path: 'orthomosaic',
        loadChildren: async () => {
          try {
            const m = await import('orthomosaicMakerMf/routes');
            return m.appRoutes;
          } catch (err) {
            console.warn('Cannot load module "orthomosaicMaker"', err);
          }
        },
      },
    ]),
    CcCesiumModule,
    ReactiveFormsModule,
  ],
  providers: [
    {
      provide: CESIUM_API_KEY,
      useValue: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIzZWE4NmU3Mi03MjRhLTQ5NmMtYjYyNi1lOTNlOWFjNWYxNDgiLCJpZCI6MTIzMjM0LCJpYXQiOjE2NzUzNTQ3NjZ9.ksXDKOB00GPQSNZvWLZAhM85oHsTyrcHQblm0VAvI-g'
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
