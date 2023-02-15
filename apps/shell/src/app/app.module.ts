import {HttpClientModule} from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import {NgxsModule} from '@ngxs/store';
// import { loadRemoteModule } from '@angular-architects/module-federation';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
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
        path: 'map',
        loadChildren: async () => {
          try {
            const m = await import('mapMf/routes');
            return m.appRoutes;
          } catch (err) {
            console.warn('Cannot load module "Map"', err);
          }
        },
      },

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

    ]),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
