import {Directive, ElementRef, NgZone} from '@angular/core';
import {createWorldTerrain, Viewer} from 'cesium';

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
        selectionIndicator: false
      });
    })
  }
}
