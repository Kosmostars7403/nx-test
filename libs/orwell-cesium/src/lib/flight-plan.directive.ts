import {Directive, Input, OnInit, Self} from '@angular/core';
import {
  CallbackProperty,
  Cartesian2,
  Cartesian3, Cartographic,
  CircleGeometry,
  Color,
  ColorGeometryInstanceAttribute,
  ColorMaterialProperty,
  defined, EllipsoidGeodesic,
  Entity,
  GeometryInstance,
  HeightReference,
  JulianDate,
  PerInstanceColorAppearance,
  PolygonHierarchy,
  Primitive,
  ScreenSpaceEventHandler,
  ScreenSpaceEventType,
  Viewer
} from 'cesium';
import {Observable, of} from 'rxjs';
import { CesiumDirective } from './cesium.directive';
import {GeoJsonPreparer} from './geojson-preparer';

const AREA_COLORS = [
  Color.BLUE.withAlpha(0.3),
  Color.GREEN.withAlpha(0.3),
  Color.YELLOW.withAlpha(0.3),
  Color.RED.withAlpha(0.3),
]

interface Areas {
  center: Cartesian3,
  radiuses: {
    videoRadius: number,
    remoteControlRadius: number,
    effectiveRadius: number,
    maxRadius: number
  }
}

@Directive({
  selector: '[nxTestFlightPlan]',
  standalone: true
})
export class FlightPlanDirective implements OnInit {
  viewer!: Viewer

  drawingMode: 'LineString' | 'Polygon' = 'LineString'

  activeShapePoints: Cartesian3[] = [];
  activeShape: Entity | undefined;
  floatingPoint: Entity | undefined;

  @Input()
  droneAvailableAreas$: Observable<Areas> = of({
    center: Cartesian3.fromDegrees(-75.59777, 40.03883),
    radiuses: {
      videoRadius: 5000,
      remoteControlRadius: 15000,
      effectiveRadius: 25000,
      maxRadius: 52000
    }
  })

  constructor(@Self() {viewer}: CesiumDirective) {
    this.viewer = viewer
  }

  ngOnInit() {
    this.droneAvailableAreas$.subscribe(areas => {
      this.createRadiuses(areas)
      this.watchDraw(areas)
    })

  }

  private createRadiuses(areas: Areas) {
    const radiuses: number[] = Object.values(areas.radiuses)

    for (let i = 0; i < radiuses.length; i++) {
      this.viewer.entities.add({
        position: areas.center,
        ellipse: {
          semiMinorAxis: radiuses[i],
          semiMajorAxis: radiuses[i],
          material: AREA_COLORS[i],
          height: 300
        },
      });
    }

    this.viewer.flyTo(this.viewer.entities)
  }

  createPoint(worldPosition: Cartesian3) {
    return this.viewer.entities.add({
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
      shape = this.viewer.entities.add({
        polyline: {
          positions: positionData,
          clampToGround: true,
          width: 3,
        },
      });
    } else if (this.drawingMode === 'Polygon') {
      shape = this.viewer.entities.add({
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
    if (this.drawingMode === 'Polygon') {
      const hierarchy = shape?.polygon?.hierarchy?.getValue(JulianDate.now())
      const geoJson = new GeoJsonPreparer(this.drawingMode, hierarchy.positions)
        .toGeoJSon()?.normalizeIntoFeatureCollection()
      console.log(geoJson)
    } else {
      const positions = shape?.polyline?.positions?.getValue(JulianDate.now())
      const geoJson = new GeoJsonPreparer(this.drawingMode, positions)
        .toGeoJSon()?.normalizeIntoFeatureCollection()
      console.log(geoJson)
    }

    if (this.floatingPoint) this.viewer.entities.remove(this.floatingPoint);
    if (this.activeShape) this.viewer.entities.remove(this.activeShape);
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

    // ScreenSpaceEventHandler - слушает инпут юзера на переданном объекте. Передаем канвас самим окном Cesium
    const handler = new ScreenSpaceEventHandler(this.viewer.canvas);

    handler.setInputAction((event: any) => {
      // получаем координаты на канвасе, который "поверх" окна карты и транспонируем их на мировые координаты
      const earthPosition = this.viewer.scene.pickPosition(event.position);

      if (defined(earthPosition)) {
        if (!this.checkPosition(earthPosition, areas)) return
        if (this.activeShapePoints.length === 0) {
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

    handler.setInputAction((event: any) => {
      this.finishDrawing();
    }, ScreenSpaceEventType.RIGHT_CLICK);
  }

}
