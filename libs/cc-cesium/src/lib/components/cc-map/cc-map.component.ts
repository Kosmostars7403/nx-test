import {
  ChangeDetectionStrategy,
  Component,
  ElementRef, EventEmitter,
  HostListener,
  Input,
  OnInit,
  Output,
  Renderer2
} from '@angular/core';
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
  exportAs: 'map',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CcMapComponent implements OnInit {
  @Input() viewerOptions: any
  @Output() selectEntity = new EventEmitter<any>()

  selectedEntityID: string | number | null = ''

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
    this.viewer = this.cesiumService.init(this.mapContainer, this, this.viewerOptions)

    this.viewer.screenSpaceEventHandler.setInputAction((movement: any) => {
      const pickedObject = this.viewer.scene.pick(movement.position);

      if (Cesium.defined(pickedObject) && Cesium.defined(pickedObject.id)) {
        if (pickedObject.id.id === this.selectedEntityID) return

        this.selectedEntityID = pickedObject.id.id
        this.selectEntity.emit(pickedObject.id)

      } else {
        this.selectedEntityID = null
      }
    }, Cesium.ScreenSpaceEventType.LEFT_CLICK);

    this.viewer.entities.collectionChanged.addEventListener((collection, added, removed, changed) => {
      console.log(collection, added, removed, changed)
    });
  }

  private createContainer() {
    this.mapContainer = this.r2.createElement('div')
    this.r2.addClass(this.mapContainer, 'cc-map-container')
    this.r2.appendChild(this.elementRef.nativeElement, this.mapContainer)
  }
}
