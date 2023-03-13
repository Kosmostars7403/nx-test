import {Component, Input, ViewChild} from '@angular/core';
import {CameraEntity, CameraOptions, ICameraComponent} from "../../interfaces/camera.interface";
import * as Cesium from "cesium";
import {MATRIX_LIST} from "./matrix-list";
import {CcModelComponent} from "../cc-model/cc-model.component";
import {SensorFieldOfView} from "../../interfaces/sensor-volumes.interface";
import {FieldOfViewComponent} from "../field-of-view/field-of-view.component";

const OFFSET_LON = 0.0009
const OFFSET_HEIGHT = 35


@Component({
  selector: 'cc-camera',
  template: `
    <cc-field-of-view
      [options]="fovOptions"
    ></cc-field-of-view>
  `,
  exportAs: 'entity'
})
export class CcCameraComponent extends CcModelComponent {
  @ViewChild(FieldOfViewComponent)
  set fovComp(comp: FieldOfViewComponent) {
    if (comp) {
      (this.entity as CameraEntity)['sensor'] = comp.sensor
    }
  }
  fovOptions!: SensorFieldOfView

  @Input()
  set options(options: CameraOptions | null) {
    if (!options) return
    this.entityOptions = this.processOptions(options)
    this.fovOptions = options
  }

  private processOptions(options: CameraOptions): CameraOptions {
    if (!('modelOptions' in options)) {
      Object.assign(options, {uri: '/assets/security_camera.glb', scale: 0.35})
    }

    Object.assign(options, this.positionModel(options))
    Object.assign(options, this.calculateFOV(options))

    return options
  }

  private positionModel(options: CameraOptions) {
    const position = Cesium.Cartesian3.fromDegrees(options.lon - OFFSET_LON, options.lat, options.height - OFFSET_HEIGHT)
    const heading = Cesium.Math.toRadians(options.heading-90);
    const pitch = Cesium.Math.toRadians(options.pitch);
    const roll = Cesium.Math.toRadians(options.roll);
    const orientation = Cesium.Transforms.headingPitchRollQuaternion(
      position,
      new Cesium.HeadingPitchRoll(heading, pitch, roll)
    );

    return {position, orientation}
  }

  calculateFOV(options: CameraOptions) {
    const {width, height} = MATRIX_LIST[options.aspectRatio][options.matrixSize]

    const calFOV = (size: number) => Cesium.Math.toDegrees(2 * Math.atan(size / (2 * options.focalLength)))
    const xAngle = calFOV(Number(width))
    const yAngle = calFOV(Number(height))

    return {xAngle, yAngle}
  }

  showFPV() {
    this.cesiumService.getViewer().camera.flyTo({
      destination: Cesium.Cartesian3.fromDegrees(this.fovOptions.lon, this.fovOptions.lat, this.fovOptions.height),
      orientation: {
        heading: Cesium.Math.toRadians(this.fovOptions.heading),
        pitch: Cesium.Math.toRadians(this.fovOptions.pitch),
        roll: Cesium.Math.toRadians(this.fovOptions.roll)
      }
    })

    this.cesiumService.getViewer().camera.frustum = new Cesium.PerspectiveFrustum({
      fov : Cesium.Math.toRadians(this.fovOptions.xAngle ?? 0),
      aspectRatio: this.fovOptions.aspectRatio == '16/9' ? 16/9 : 4/3,
    });

    console.log(this.cesiumService.getViewer().camera.frustum)
    console.log(this.cesiumService.getViewer().camera)


  }
}

