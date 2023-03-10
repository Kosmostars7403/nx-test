import {Component, Input, OnInit} from '@angular/core';
import * as Cesium from "cesium";
import {CesiumService} from "../../services/cesium.service";
import {RectangularPyramidSensorVolume, SensorFieldOfView} from "../../interfaces/sensor-volumes.interface";
import '../../decl.d'

@Component({
  selector: 'cc-field-of-view',
  template: ''
})
export class FieldOfViewComponent implements OnInit {
  rectangularPyramidSensor: RectangularPyramidSensorVolume = new CesiumSensorVolumes.RectangularPyramidSensorVolume();

  _options!: SensorFieldOfView;

  @Input()
  set options(value: SensorFieldOfView ) {
    this._options = value
    this.adjustRectangularSensor()
  }

  constructor(private cesiumService: CesiumService) {
  }

  ngOnInit() {
    this.cesiumService.getViewer().scene.primitives.add(this.rectangularPyramidSensor);
  }


  getModelMatrix() {
    const location = Cesium.Cartesian3.fromDegrees(this._options.lon, this._options.lat, this._options.height)
    const modelMatrix = Cesium.Transforms.northEastDownToFixedFrame(location as Cesium.Cartesian3);
    const orientation = Cesium.Matrix3.multiply(
      Cesium.Matrix3.multiply(
        Cesium.Matrix3.fromRotationZ(Cesium.Math.toRadians(this._options.heading)),
        Cesium.Matrix3.fromRotationY(Cesium.Math.toRadians(this._options.roll)),
        new Cesium.Matrix3()
      ),
      Cesium.Matrix3.fromRotationX(Cesium.Math.toRadians(this._options.pitch)), new Cesium.Matrix3()
    );
    return Cesium.Matrix4.multiply(modelMatrix, Cesium.Matrix4.fromRotationTranslation(orientation, Cesium.Cartesian3.ZERO), new Cesium.Matrix4());
  }

  adjustRectangularSensor() {
    this.rectangularPyramidSensor.modelMatrix = this.getModelMatrix();

    if (this._options.xAngle && this._options.yAngle) {
      this.rectangularPyramidSensor.xHalfAngle = Cesium.Math.toRadians(this._options.xAngle/2);
      this.rectangularPyramidSensor.yHalfAngle = Cesium.Math.toRadians(this._options.yAngle/2);
    }

    this.rectangularPyramidSensor.intersectionColor = Cesium.Color.WHITE
    this.rectangularPyramidSensor.intersectionWidth = 1
    this.rectangularPyramidSensor.lateralSurfaceMaterial = Cesium.Material.fromType('Color');
    this.rectangularPyramidSensor.lateralSurfaceMaterial.uniforms.color = new Cesium.Color(0.0, 1.0, 1.0, 0.3);
  }
}
