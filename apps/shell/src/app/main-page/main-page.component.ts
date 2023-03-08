import {Component} from '@angular/core';
import * as Cesium from "cesium";
import {Cartesian3} from "cesium";

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
    position: Cesium.Cartesian3.fromDegrees(32.3560, 54.7448, 180),
  }

  cameraModelOptions = {uri: '/assets/surveillance_camera.glb', scale: 0.001}

  viewerOptions = {
    requestRenderMode: true,
    baseLayerPicker: false,
    // terrainProvider: Cesium.createWorldTerrain(),
    // imageryProvider: new OpenStreetMapImageryProvider({
    //   url: buildModuleUrl(`http://127.0.0.1:8080`)
    // }),
  }
}
