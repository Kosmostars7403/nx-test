import {Directive, ElementRef, NgZone} from '@angular/core';
import {Viewer} from 'cesium';

@Directive({
  selector: '[nxTestCesiumMap]',
  standalone: true
})
export class CesiumMapDirective {
  viewer!: Viewer;

  constructor(private elementRef: ElementRef, private ngZone: NgZone) {
    this.ngZone.runOutsideAngular(() => {
      this.viewer = new Viewer(this.elementRef.nativeElement);
    })
  }

}
