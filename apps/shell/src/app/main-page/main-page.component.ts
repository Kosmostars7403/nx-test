import {ChangeDetectionStrategy, Component} from '@angular/core';
import * as Cesium from "cesium";
import {Cartesian3, Entity} from "cesium";
import {UntypedFormBuilder} from "@angular/forms";
import {Observable, scan, startWith, Subject} from "rxjs";
import {CameraEntity, CameraOptions} from '@cc-cesium';

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

  onSelectEntity(entity: Entity) {
    (entity as CameraEntity).sensor.toggle()
  }

  constructor(private fb: UntypedFormBuilder) {
  }

  test() {
    this.camerasSubject$.next(this.form.value)
  }

}
