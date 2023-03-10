import {Component, OnInit} from '@angular/core';
import * as Cesium from "cesium";
import {Cartesian3} from "cesium";
import {FormGroup, UntypedFormBuilder} from "@angular/forms";
import {Observable, startWith} from "rxjs";
import {CesiumEntity} from "../../../../../libs/cc-cesium/src/lib/abstract/entity.abstract";
import {CameraOptions} from "../../../../../libs/cc-cesium/src/lib/interfaces/camera.interface";

@Component({
  selector: 'nx-test-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
})
export class MainPageComponent {
  boxEntityOptions = {
    name: 'Warehouse',
    position: Cesium.Cartesian3.fromDegrees(32.35300, 54.744846666667, 100),
    dimensions: new Cartesian3(400.0, 300.0, 200.0),
    material: Cesium.Color.GRAY,
    outline: true
  }

  viewerOptions = {
    requestRenderMode: true,
    baseLayerPicker: false,
    shouldAnimate: true
    // terrainProvider: Cesium.createWorldTerrain(),
    // imageryProvider: new OpenStreetMapImageryProvider({
    //   url: buildModuleUrl(`http://127.0.0.1:8080`)
    // }),
  }

  form = this.fb.group({
    pitch: [0],
    heading: [90],
    roll: [45],
    // xAngle: [92.6],
    // yAngle: [60.9],
    lon: [32.357],
    lat: [54.7448],
    height: [212],
    matrixSize: ['m128'],
    aspectRatio: ['16/9'],
    focalLength: [2.8]
  })

  sensorOptions$ = this.form.valueChanges.pipe(
    startWith(this.form.value)
  )

  cameraOptions$: Observable<CameraOptions> = this.form.valueChanges.pipe(
    startWith({
      name: 'Camera1',
      ...this.form.value
    })
  )

  constructor(private fb: UntypedFormBuilder) {
  }

  test() {
    this.boxEntityOptions = {
      name: 'Warehouse',
      position: Cesium.Cartesian3.fromDegrees(32.35300, 54.744846666667, 100),
      dimensions: new Cartesian3(400.0, 300.0, 200.0),
      material: Cesium.Color.fromRandom(),
      outline: true
    }
  }

}
