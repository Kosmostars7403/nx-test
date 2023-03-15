import {Component, Input} from '@angular/core';
import { CommonModule } from '@angular/common';
import {FlightReport} from '../../data-access/interfaces/flight.model';
import {CcCesiumModule} from "@cc-cesium";
import {BehaviorSubject, of} from "rxjs";
import * as Cesium from "cesium";

@Component({
  selector: 'nx-test-calendar-flights',
  standalone: true,
  imports: [CommonModule, CcCesiumModule],
  templateUrl: './calendar-flights.component.html',
  styleUrls: ['./calendar-flights.component.scss'],
})
export class CalendarFlightsComponent {
  @Input() flightReports: FlightReport[] = []
  showFlight = false
  createFlight = false

  drawingMode: 'LineString' | 'Polygon' = 'Polygon'

  drawMode$ = new BehaviorSubject<boolean>(false);

  viewerOptions = {
    requestRenderMode: true,
    baseLayerPicker: false,
    shouldAnimate: true,
    selectionIndicator: false,
    terrainProvider: Cesium.createWorldTerrain(),
  }

  droneAreas$ = of({
    center: Cesium.Cartesian3.fromDegrees(32.35300, 54.744846666667,),
    radiuses: {
      videoRadius: 5000,
      remoteControlRadius: 15000,
      effectiveRadius: 25000,
      maxRadius: 52000
    }
  })

  onPlanReady(geoJson: any) {
    console.log(geoJson)
  }

}
