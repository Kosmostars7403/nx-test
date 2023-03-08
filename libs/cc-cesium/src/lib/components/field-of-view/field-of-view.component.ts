import {Component, OnInit} from '@angular/core';
import * as Cesium from "cesium";
import {CesiumService} from "../../services/cesium.service";

@Component({
  selector: 'cc-field-of-view',
  template: ''
})
export class FieldOfViewComponent implements OnInit {
  //@ts-ignore
  rectangularPyramidSensor = new CesiumSensorVolumes.RectangularPyramidSensorVolume();

  twist = 18.0
  clock = 0.7999999999999999;
  cone = 5.0

  constructor(private cesiumService: CesiumService) {
  }

  ngOnInit() {
    this.addRectangularSensor()
  }

  getModelMatrix() {
    const location = Cesium.Cartesian3.fromDegrees(32.3580, 54.7448, 180)
    const modelMatrix = Cesium.Transforms.northEastDownToFixedFrame(location as Cesium.Cartesian3);
    const orientation = Cesium.Matrix3.multiply(
      Cesium.Matrix3.multiply(Cesium.Matrix3.fromRotationZ(this.clock), Cesium.Matrix3.fromRotationY(Cesium.Math.toRadians(this.cone)), new Cesium.Matrix3()),
      Cesium.Matrix3.fromRotationX(this.twist), new Cesium.Matrix3()
    );
    return Cesium.Matrix4.multiply(modelMatrix, Cesium.Matrix4.fromRotationTranslation(orientation, Cesium.Cartesian3.ZERO), new Cesium.Matrix4());
  }

  addRectangularSensor() {
    this.rectangularPyramidSensor.modelMatrix = this.getModelMatrix();
    this.rectangularPyramidSensor.radius = 10000000.0;
    this.rectangularPyramidSensor.xHalfAngle = Cesium.Math.toRadians(10.0);
    this.rectangularPyramidSensor.yHalfAngle = Cesium.Math.toRadians(20.0);

    this.rectangularPyramidSensor.lateralSurfaceMaterial = Cesium.Material.fromType('Color');
    this.rectangularPyramidSensor.lateralSurfaceMaterial.uniforms.color = new Cesium.Color(0.0, 1.0, 1.0, 0.3);
    this.cesiumService.getViewer().scene.primitives.add(this.rectangularPyramidSensor);
  }
}
