import {Component, OnInit} from '@angular/core';
import * as Cesium from "cesium";
import {Cartesian3} from "cesium";
import {FormGroup, UntypedFormBuilder} from "@angular/forms";
import {startWith} from "rxjs";

@Component({
  selector: 'nx-test-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
})
export class MainPageComponent {
  boxEntityOptions = {
    name: 'Warehouse',
    position: Cesium.Cartesian3.fromDegrees(32.35300, 54.744846666667, 100)
  }

  boxGraphicsOptions = {
    dimensions: new Cartesian3(400.0, 300.0, 200.0),
    material: Cesium.Color.GRAY,
    outline: true
  }

  cameraEntityOptions = {
    name: 'Camera',
    position: Cesium.Cartesian3.fromDegrees(32.3560, 54.7448, 170),
  }

  cameraModelOptions = {uri: '/assets/security_camera.glb', scale: 0.35}

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
    twist: [0],
    clock: [90],
    cone: [45],
    xAngle: [92.6],
    yAngle: [60.9],
    lon: [32.357],
    lat: [54.7448],
    height: [212],
  })

  sensorOptions$ = this.form.valueChanges.pipe(
    startWith(this.form.value)
  )

  constructor(private fb: UntypedFormBuilder) {
  }

}
