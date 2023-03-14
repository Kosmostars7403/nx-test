import {ChangeDetectionStrategy, Component} from '@angular/core';
import * as Cesium from "cesium";
import {Cartesian3, Entity, HeightReference} from "cesium";
import {UntypedFormBuilder} from "@angular/forms";
import {BehaviorSubject, Observable, of, scan, startWith, Subject} from "rxjs";
import {CameraEntity, CameraOptions, CcMapComponent} from '@cc-cesium';
import {CcCameraComponent} from "@cc-cesium";

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

  drawingMode: 'LineString' | 'Polygon' = 'Polygon'

  boxEntityOptions = {
    name: 'Warehouse',
    id: 1,
    position: Cesium.Cartesian3.fromDegrees(32.35300, 54.744846666667, 100),
    dimensions: new Cartesian3(400.0, 300.0, 200.0),
    material: Cesium.Color.GRAY,
    heightReference: HeightReference.CLAMP_TO_GROUND,
    outline: true
  }

  drawMode$ = new BehaviorSubject<boolean>(false);

  viewerOptions = {
    requestRenderMode: true,
    baseLayerPicker: false,
    shouldAnimate: true,
    selectionIndicator: false,
    terrainProvider: Cesium.createWorldTerrain(),
    // imageryProvider: new OpenStreetMapImageryProvider({
    //   url: buildModuleUrl(`http://127.0.0.1:8080`)
    // }),
  }

  form = this.fb.group({
    pitch: [-45],
    heading: [90],
    roll: [0],
    lon: [32.357],
    lat: [54.7448],
    height: [500],
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
      videoUrl: '/assets/234.mov',
      // heightReference: Cesium.HeightReference.RELATIVE_TO_GROUND,
      ...this.form.value
    })
  )

  droneAreas$ = of({
    center: Cartesian3.fromDegrees(32.35300, 54.744846666667,),
    radiuses: {
      videoRadius: 5000,
      remoteControlRadius: 15000,
      effectiveRadius: 25000,
      maxRadius: 52000
    }
  })

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

  resetFPV(cameraComp: CcCameraComponent) {
    cameraComp.toggleVideo()

  }

  test(map: CcMapComponent) {
    this.drawingMode = this.drawingMode === "LineString"
      ? 'Polygon'
      : 'LineString'
  }

  onPlanReady(geoJson: any) {
    console.log(geoJson)
  }

  letsDraw() {
    this.drawMode$.next(!this.drawMode$.value)
  }

}
