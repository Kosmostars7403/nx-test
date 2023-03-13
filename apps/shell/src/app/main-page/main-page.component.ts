import {ChangeDetectionStrategy, Component} from '@angular/core';
import * as Cesium from "cesium";
import {Cartesian3, Entity} from "cesium";
import {UntypedFormBuilder} from "@angular/forms";
import {Observable, scan, startWith, Subject} from "rxjs";
import {CameraEntity, CameraOptions, CcMapComponent} from '@cc-cesium';
import {CcCameraComponent} from "../../../../../libs/cc-cesium/src/lib/components/cc-camera/cc-camera.component";

@Component({
  selector: 'nx-test-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainPageComponent {
  camerasSubject$ = new Subject<CameraOptions>()

  cameras$ = this.camerasSubject$.pipe(
    scan((acc: CameraOptions[], camera: CameraOptions) => {
      acc.push(camera)
      return acc
    }, [] as CameraOptions[])
  )

  boxEntityOptions = {
    name: 'Warehouse',
    id: 1,
    position: Cesium.Cartesian3.fromDegrees(32.35300, 54.744846666667, 100),
    dimensions: new Cartesian3(400.0, 300.0, 200.0),
    material: Cesium.Color.GRAY,
    outline: true
  }

  viewerOptions = {
    requestRenderMode: true,
    baseLayerPicker: false,
    shouldAnimate: true,
    selectionIndicator: false
    // terrainProvider: Cesium.createWorldTerrain(),
    // imageryProvider: new OpenStreetMapImageryProvider({
    //   url: buildModuleUrl(`http://127.0.0.1:8080`)
    // }),
  }

  form = this.fb.group({
    pitch: [-45],
    heading: [90],
    roll: [0],
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

  onSelectEntity(entity: Entity) {
    console.log(entity)
  }

  constructor(private fb: UntypedFormBuilder) {
  }

  toggleFOV(cameraComp: CcCameraComponent) {
    (cameraComp.entity as CameraEntity).sensor.toggle()
  }

  showFPV(cameraComp: CcCameraComponent) {
    cameraComp.showFPV()
  }

  resetFPV(map: CcMapComponent) {
    // map.viewer.camera.frustum = new Cesium.PerspectiveFrustum()
    const cam = map.viewer.camera

  }

  test(map: CcMapComponent) {
    const videoEl = document.querySelector('#myVideo')
    const viewer = map.viewer
    const cam = map.viewer.camera

    const posUL = cam.pickEllipsoid(new Cesium.Cartesian2(0, 0), Cesium.Ellipsoid.WGS84);
    const posLR = cam.pickEllipsoid(new Cesium.Cartesian2(viewer.canvas.width, viewer.canvas.height), Cesium.Ellipsoid.WGS84);
    const posLL = cam.pickEllipsoid(new Cesium.Cartesian2(0, viewer.canvas.height), Cesium.Ellipsoid.WGS84);
    const posUR = cam.pickEllipsoid(new Cesium.Cartesian2(viewer.canvas.width, 0), Cesium.Ellipsoid.WGS84);


    const polygon = viewer.entities.add({
      polygon: {
        hierarchy: new Cesium.PolygonHierarchy([
          //@ts-ignore
          posUL, posUR, posLR, posLL,
        ]),
          //@ts-ignore
        material: videoEl
      },
    })
    console.log(polygon)
    new Cesium.VideoSynchronizer({
           clock : viewer.clock,
          //@ts-ignore
           element : videoEl
     });

  }
}
