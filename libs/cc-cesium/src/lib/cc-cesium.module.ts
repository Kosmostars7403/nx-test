import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CcMapComponent } from './components/cc-map/cc-map.component';
import { CcBoxComponent } from './components/cc-box/cc-box.component';
import { ViewerFactory } from './factories/viewer-factory.service';
import { CcModelComponent } from './components/cc-model/cc-model.component';
import { FieldOfViewComponent } from './components/field-of-view/field-of-view.component';

@NgModule({
  imports: [CommonModule],
  declarations: [
    CcMapComponent,
    CcBoxComponent,
    CcModelComponent,
    FieldOfViewComponent,
  ],
  exports: [
    CcMapComponent,
    CcBoxComponent,
    CcModelComponent,
    FieldOfViewComponent,
  ],
  providers: [ViewerFactory],
})
export class CcCesiumModule {}
