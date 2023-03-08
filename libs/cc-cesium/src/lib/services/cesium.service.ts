import {Inject, Injectable, NgZone, Optional} from '@angular/core';
import {CcMapComponent} from "../components/cc-map/cc-map.component";
import * as Cesium from "cesium";
import {CESIUM_API_KEY} from "@shared";
import {ViewerFactory} from "../factories/viewer-factory.service";

/**
 *  Service that initialize cesium viewer and expose cesium viewer and scene.
 */
@Injectable()
export class CesiumService {
  private viewer!: Cesium.Viewer;
  private map!: CcMapComponent;

  constructor(
    private ngZone: NgZone,
    @Optional() @Inject(CESIUM_API_KEY) private apiKey: string,
    private viewerFactory: ViewerFactory
  ) {
  }

  init(mapContainer: HTMLElement, map: CcMapComponent, viewerOptions: any) {
    this.map = map;
    this.ngZone.runOutsideAngular(() => {
      Cesium.Ion.defaultAccessToken = this.apiKey
      this.viewer = this.viewerFactory.createViewer(mapContainer, viewerOptions);
      this.viewer.scene.globe.depthTestAgainstTerrain = true;
    });
  }

  getViewer() {
    return this.viewer;
  }

  getScene() {
    return this.viewer.scene;
  }

  getCanvas(): HTMLCanvasElement {
    return this.viewer.canvas as HTMLCanvasElement;
  }

  getMap(): CcMapComponent {
    return this.map;
  }
}
