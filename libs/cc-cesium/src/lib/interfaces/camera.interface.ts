import * as Cesium from "cesium";
import {SensorFieldOfView} from "./sensor-volumes.interface";

export interface CameraOptions extends SensorFieldOfView {
  modelOptions?: Cesium.ModelGraphics.ConstructorOptions
  position?: Cesium.Cartesian3
  orientation: Cesium.Quaternion
}
