import { Directive, ElementRef } from '@angular/core';
import { Viewer } from 'cesium';

@Directive({
  selector: '[nxTestCesium]',
  standalone: true,
})
export class CesiumDirective {
  viewer: Viewer;

  constructor(private elementRef: ElementRef) {
    this.viewer = new Viewer(this.elementRef.nativeElement);
    console.log(this.viewer)
  }
}
