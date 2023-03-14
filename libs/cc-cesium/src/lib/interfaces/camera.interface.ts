import * as Cesium from "cesium";
import {RectangularPyramidSensorVolume, SensorFieldOfView} from "./sensor-volumes.interface";

export interface CameraOptions extends SensorFieldOfView {
  modelOptions?: Cesium.ModelGraphics.ConstructorOptions
  position?: Cesium.Cartesian3
  orientation: Cesium.Quaternion
  matrixSize: string
  aspectRatio: "4/3" | "16/9"
  focalLength: number
  videoUrl: string
}

export interface CameraEntity extends Cesium.Entity {
  sensor: RectangularPyramidSensorVolume
}

export interface ICameraComponent {
  entity: CameraEntity
}
