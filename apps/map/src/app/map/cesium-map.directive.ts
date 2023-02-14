import {Directive, ElementRef} from '@angular/core';
import {Viewer} from 'cesium';

@Directive({
  selector: '[nxTestCesiumMap]',
  standalone: true
})
export class CesiumMapDirective {
  viewer: Viewer;

  constructor(private elementRef: ElementRef) {
    this.viewer = new Viewer(this.elementRef.nativeElement);
  }

}
