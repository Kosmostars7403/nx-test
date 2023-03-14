import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnDestroy, OnInit, Output} from "@angular/core";
import {
  CallbackProperty,
  Cartesian3,
  Cartographic,
  Color,
  ColorMaterialProperty,
  defined,
  EllipsoidGeodesic,
  Entity,
  HeightReference,
  JulianDate,
  PolygonHierarchy,
  ScreenSpaceEventHandler,
  ScreenSpaceEventType,
  Viewer
} from "cesium";
import {CesiumService} from "../services/cesium.service";
import {Observable, of} from "rxjs";
import {GeoJsonPreparer} from "../utils/geojson-preparer";
import {Areas} from "../interfaces/drone-areas.interface"
import * as Cesium from "cesium";

const AREA_COLORS = [
  Color.BLUE.withAlpha(0.3),
  Color.GREEN.withAlpha(0.3),
  Color.YELLOW.withAlpha(0.3),
  Color.RED.withAlpha(0.3),
]

@Component({
  selector: 'cc-flight-plan-draw',
  template: '',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CCDrawComponent implements OnInit, OnDestroy{
  viewer!: Viewer

  @Input()
  drawingMode: 'LineString' | 'Polygon' = 'Polygon'

  @Input()
  droneAvailableAreas$: Observable<Areas | null> = of(null)

  @Output() planReady = new EventEmitter<any>()

  activeShapePoints: Cartesian3[] = [];
  activeShape: Entity | undefined;
  floatingPoint: Entity | undefined;

  shapesDataSource!: Cesium.DataSource
  areasDataSource!: Cesium.DataSource

  constructor(
    private cesiumService: CesiumService
  ) {}

  async ngOnInit() {
    this.viewer = this.cesiumService.getViewer()
    await this.createDataSources()

    this.droneAvailableAreas$.subscribe(areas => {
      if (!areas) return
      this.createRadiuses(areas)
      this.watchDraw(areas)
    })
  }

  ngOnDestroy() {
    this.shapesDataSource.entities.removeAll()
    this.areasDataSource.entities.removeAll()
    this.viewer.dataSources.remove(this.shapesDataSource)
    this.viewer.dataSources.remove(this.areasDataSource)
  }

  private async createDataSources() {
    this.shapesDataSource = await this.viewer.dataSources.add(new Cesium.CustomDataSource(`shapesDataSource${Math.random()}`))
    this.areasDataSource = await this.viewer.dataSources.add(new Cesium.CustomDataSource(`areasDataSource${Math.random()}`))
  }

  private createRadiuses(areas: Areas) {
    const radiuses: number[] = Object.values(areas.radiuses)

    for (let i = 0; i < radiuses.length; i++) {
      this.areasDataSource.entities.add({
        position: areas.center,
        ellipse: {
          semiMinorAxis: radiuses[i],
          semiMajorAxis: radiuses[i],
          material: AREA_COLORS[i],
          heightReference: HeightReference.CLAMP_TO_GROUND
        },
      });
    }

    this.viewer.flyTo(this.areasDataSource.entities)
  }

  createPoint(worldPosition: Cartesian3) {
    return this.shapesDataSource.entities.add({
      position: worldPosition,
      point: {
        color: Color.WHITE,
        pixelSize: 5,
        heightReference: HeightReference.CLAMP_TO_GROUND,
      },
    });
  }

  drawShape(positionData: any) {
    let shape;
    if (this.drawingMode === 'LineString') {
      shape = this.shapesDataSource.entities.add({
        polyline: {
          positions: positionData,
          clampToGround: true,
          width: 3,
        },
      });
    } else if (this.drawingMode === 'Polygon') {
      shape = this.shapesDataSource.entities.add({
        polygon: {
          hierarchy: positionData,
          material: new ColorMaterialProperty(
            Color.WHITE.withAlpha(0.7)
          ),
        },
      });
    }
    return shape;
  }

  finishDrawing() {
    this.activeShapePoints.pop();
    const shape = this.drawShape(this.activeShapePoints);

    let geoJson

    if (this.drawingMode === 'Polygon') {
      const hierarchy = shape?.polygon?.hierarchy?.getValue(JulianDate.now())
      geoJson = new GeoJsonPreparer(this.drawingMode, hierarchy.positions)
        .toGeoJSon()?.normalizeIntoFeatureCollection()

    } else {
      const positions = shape?.polyline?.positions?.getValue(JulianDate.now())
      geoJson = new GeoJsonPreparer(this.drawingMode, positions)
        .toGeoJSon()?.normalizeIntoFeatureCollection()
    }

    this.planReady.emit(geoJson)

    if (this.floatingPoint) this.shapesDataSource.entities.remove(this.floatingPoint);
    if (this.activeShape) this.shapesDataSource.entities.remove(this.activeShape);
    this.floatingPoint = undefined;
    this.activeShape = undefined;
    this.activeShapePoints = [];
  }

  checkPosition(clickCoords: Cartesian3, areas: Areas): boolean {
    const el = new EllipsoidGeodesic(
      Cartographic.fromCartesian(areas.center),
      Cartographic.fromCartesian(clickCoords)
    )

    return el.surfaceDistance < areas.radiuses.maxRadius
  }

  private watchDraw(areas: Areas) {
    // Сходит с ума, если двойным кликом создадим и закроем форму, так что отключаем
    this.viewer.cesiumWidget.screenSpaceEventHandler.removeInputAction(
      ScreenSpaceEventType.LEFT_DOUBLE_CLICK
    );

    const handler = new ScreenSpaceEventHandler(this.viewer.canvas);

    handler.setInputAction((event: any) => {
      const earthPosition = this.viewer.scene.pickPosition(event.position);

      if (defined(earthPosition)) {
        if (!this.checkPosition(earthPosition, areas)) return
        if (this.activeShapePoints && this.activeShapePoints.length === 0) {
          this.floatingPoint = this.createPoint(earthPosition);
          this.activeShapePoints.push(earthPosition);

          const dynamicPositions = new CallbackProperty(() => {
            if (this.drawingMode === 'Polygon') {
              return new PolygonHierarchy(this.activeShapePoints);
            }
            return this.activeShapePoints;
          }, false);

          this.activeShape = this.drawShape(dynamicPositions);
        }
        this.activeShapePoints.push(earthPosition);
        this.createPoint(earthPosition);
      }
    }, ScreenSpaceEventType.LEFT_CLICK);

    handler.setInputAction((event: any) => {
      if (this.floatingPoint) {
        const newPosition = this.viewer.scene.pickPosition(event.endPosition);
        if (newPosition) {
          this.activeShapePoints.pop();
          this.activeShapePoints.push(newPosition);
        }
      }
    }, ScreenSpaceEventType.MOUSE_MOVE);

    handler.setInputAction(() => {
      this.finishDrawing();
    }, ScreenSpaceEventType.RIGHT_CLICK);
  }

}
