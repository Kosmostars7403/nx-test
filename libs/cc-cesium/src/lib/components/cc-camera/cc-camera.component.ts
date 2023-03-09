import {Component, Input} from '@angular/core';
import {CameraOptions} from "../../interfaces/camera.interface";
import * as Cesium from "cesium";

const OFFSET_LON = 0.0009
const OFFSET_HEIGHT = 35


@Component({
  selector: 'cc-camera',
  template: `
    <ng-container *ngIf="entityOptions">
      <cc-model
        [entityOptions]="entityOptions"
      ></cc-model>
      <cc-field-of-view
        [options]="entityOptions"
      ></cc-field-of-view>
    </ng-container>
  `,
})
export class CcCameraComponent {

  entityOptions: CameraOptions | null = null

  @Input()
  set options(options: CameraOptions | null) {
    if (!options) return
    this.entityOptions = this.processOptions(options)
  }

  private processOptions(options: CameraOptions): CameraOptions {
    if (!('modelOptions' in options)) {
      Object.assign(options, {uri: '/assets/security_camera.glb', scale: 0.35})
    }

    const position = Cesium.Cartesian3.fromDegrees(options.lon - OFFSET_LON, options.lat, options.height - OFFSET_HEIGHT)
    const heading = Cesium.Math.toRadians(options.heading - 90);
    const pitch = Cesium.Math.toRadians(options.pitch);
    const roll = Cesium.Math.toRadians(0);
    const orientation = Cesium.Transforms.headingPitchRollQuaternion(
      position,
      new Cesium.HeadingPitchRoll(heading, pitch, roll)
    );

    options.position = position
    options.orientation = orientation

    return options
  }

}
