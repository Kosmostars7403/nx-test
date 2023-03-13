import * as Cesium from "cesium";
import {RectangularPyramidSensorVolume, SensorFieldOfView} from "./sensor-volumes.interface";

export interface CameraOptions extends SensorFieldOfView {
  modelOptions?: Cesium.ModelGraphics.ConstructorOptions
  position?: Cesium.Cartesian3
  orientation: Cesium.Quaternion
  matrixSize: string
  aspectRatio: "4/3" | "16/9"
  focalLength: number
}


export interface CameraEntity extends Cesium.Entity {
  sensor: RectangularPyramidSensorVolume
}
