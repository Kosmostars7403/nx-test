import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CcMapComponent } from './components/cc-map/cc-map.component';
import { CcBoxComponent } from './components/cc-box/cc-box.component';
import { ViewerFactory } from './factories/viewer-factory.service';
import { CcModelComponent } from './components/cc-model/cc-model.component';
import { FieldOfViewComponent } from './components/field-of-view/field-of-view.component';
import { CcCameraComponent } from './components/cc-camera/cc-camera.component';
import {CameraEntity, CameraOptions } from './interfaces/camera.interface';
import { CesiumService } from './services/cesium.service';
import {CCDrawComponent} from "./components/draw-flight-plan.component";

@NgModule({
  imports: [CommonModule],
  declarations: [
    CcMapComponent,
    CcBoxComponent,
    CcModelComponent,
    FieldOfViewComponent,
    CcCameraComponent,
    CCDrawComponent
  ],
  exports: [
    CcMapComponent,
    CcBoxComponent,
    CcModelComponent,
    FieldOfViewComponent,
    CcCameraComponent,
    CCDrawComponent
  ],
  providers: [ViewerFactory],
})
export class CcCesiumModule {}

export {
  CameraOptions,
  CcMapComponent,
  CesiumService,
  CameraEntity,
  CcCameraComponent
}
