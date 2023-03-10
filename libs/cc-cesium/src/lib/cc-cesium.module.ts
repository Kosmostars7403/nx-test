import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CcMapComponent } from './components/cc-map/cc-map.component';
import { CcBoxComponent } from './components/cc-box/cc-box.component';
import { ViewerFactory } from './factories/viewer-factory.service';
import { CcModelComponent } from './components/cc-model/cc-model.component';
import { FieldOfViewComponent } from './components/field-of-view/field-of-view.component';
import { CcCameraComponent } from './components/cc-camera/cc-camera.component';
import { CameraOptions } from './interfaces/camera.interface';
import { CesiumService } from './services/cesium.service';

@NgModule({
  imports: [CommonModule],
  declarations: [
    CcMapComponent,
    CcBoxComponent,
    CcModelComponent,
    FieldOfViewComponent,
    CcCameraComponent,
  ],
  exports: [
    CcMapComponent,
    CcBoxComponent,
    CcModelComponent,
    FieldOfViewComponent,
    CcCameraComponent,
  ],
  providers: [ViewerFactory],
})
export class CcCesiumModule {}

export {
  CameraOptions,
  CcMapComponent,
  CesiumService
}
