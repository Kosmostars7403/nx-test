import * as Cesium from "cesium";

export interface RectangularPyramidSensorVolume {
  modelMatrix: Cesium.Matrix4
  radius: number
  xHalfAngle: number
  yHalfAngle: number
  intersectionColor: Cesium.Color
  intersectionWidth: number
  lateralSurfaceMaterial: Cesium.Material
  show: boolean
  toggle(): void
}

export interface CesiumSensorVolumes {
  RectangularPyramidSensorVolume: RectangularPyramidSensorVolume
}

export interface SensorFieldOfView {
  pitch: number
  heading: number
  roll: number
  xAngle?: number
  yAngle?: number
  lon: number
  lat: number,
  height: number
}
