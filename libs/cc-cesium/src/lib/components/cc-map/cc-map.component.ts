import {Component, ElementRef, Inject, OnInit, Optional, Renderer2} from '@angular/core';
import * as Cesium from "cesium";
import {CESIUM_API_KEY} from "@shared";

@Component({
  selector: 'cc-map',
  template: '<ng-content></ng-content>',
  styles: [
    `
      .cc-map-container {
        width: 100%;
        height: 100%;
      }
    `
  ]
})
export class CcMapComponent implements OnInit {
  private mapContainer!: HTMLElement

  viewer!: Cesium.Viewer

  constructor(
    private r2: Renderer2,
    private elementRef: ElementRef,
    @Optional() @Inject(CESIUM_API_KEY) private apiKey: string,
  ) {
  }

  ngOnInit(): void {
    this.createContainer()
    this.initMap()
  }

  private createContainer() {
    this.mapContainer = this.r2.createElement('div')
    this.r2.addClass(this.mapContainer, 'cc-map-container')
    this.r2.appendChild(this.elementRef.nativeElement, this.mapContainer)
  }

  private initMap() {
    Cesium.Ion.defaultAccessToken = this.apiKey

    this.viewer = new Cesium.Viewer(this.mapContainer, {
      requestRenderMode: true,
      baseLayerPicker: false,
      // terrainProvider: Cesium.createWorldTerrain(),
      // imageryProvider: new OpenStreetMapImageryProvider({
      //   url: buildModuleUrl(`http://127.0.0.1:8080`)
      // }),
    });
    this.viewer.scene.globe.depthTestAgainstTerrain = true;
  }
}
