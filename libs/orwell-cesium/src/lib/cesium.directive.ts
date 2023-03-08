import {Directive, ElementRef, NgZone} from '@angular/core';
import {buildModuleUrl, createWorldTerrain, OpenStreetMapImageryProvider, Viewer} from 'cesium';

@Directive({
  selector: '[nxTestCesium]',
  standalone: true
})
export class CesiumDirective {
  viewer!: Viewer;

  constructor(private elementRef: ElementRef, private ngZone: NgZone) {
    this.ngZone.runOutsideAngular(() => {
      this.viewer = new Viewer(this.elementRef.nativeElement, {
        terrainProvider: createWorldTerrain(),
        requestRenderMode: true,
        selectionIndicator: false,
        imageryProvider: new OpenStreetMapImageryProvider({
          url: buildModuleUrl('http://localhost:8000/')
          // url: buildModuleUrl('http://localhost:8080/tile/')
        }),
        // // imageryProvider: new TileMapServiceImageryProvider({
        // //   url: buildModuleUrl('http://127.0.0.1:8000/')
        // // }),
      });
    })
  }
}
