import {ChangeDetectionStrategy, Component, ElementRef, Input, OnInit, Optional, Renderer2} from '@angular/core';
import * as Cesium from "cesium";
import {CesiumService} from "../../services/cesium.service";

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
  ],
  providers: [
    CesiumService
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CcMapComponent implements OnInit {
  @Input() viewerOptions: any
  private mapContainer!: HTMLElement

  viewer!: Cesium.Viewer

  constructor(
    private r2: Renderer2,
    private elementRef: ElementRef,
    private cesiumService: CesiumService
  ) {
  }

  ngOnInit(): void {
    this.createContainer()
    this.cesiumService.init(this.mapContainer, this, this.viewerOptions)
  }

  private createContainer() {
    this.mapContainer = this.r2.createElement('div')
    this.r2.addClass(this.mapContainer, 'cc-map-container')
    this.r2.appendChild(this.elementRef.nativeElement, this.mapContainer)
  }
}
