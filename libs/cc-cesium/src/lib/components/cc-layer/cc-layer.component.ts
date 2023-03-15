import {ChangeDetectionStrategy, Component, HostListener, Input, OnDestroy, OnInit} from '@angular/core';
import {CesiumService} from "../../services/cesium.service";
import {LayerService} from "../../services/layer.service";
import {BehaviorSubject} from "rxjs";

@Component({
  selector: 'cc-layer',
  template:'<ng-content></ng-content>',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [LayerService]
})
export class CcLayerComponent implements OnInit, OnDestroy {
  @Input() name?: string

  private _show$ = new BehaviorSubject<boolean>(true)

  @Input()
  set show(val: boolean) {
    this._show$.next(val)
  }

  constructor(
    cesiumService: CesiumService,
    private layerService: LayerService
  ) {
  }

  @HostListener('window:keyup.arrowLeft')
  onTest() {
    const ec = this.layerService.getEntityCollection()
    if (ec) {
      for (const entity of ec.values) {
        entity.show = !entity.show
      }
    }
  }

  async ngOnInit() {
    this.layerService.createDataSource(this.name)
    await this.layerService.registerDataSourceInViewer()

    this._show$.subscribe(isShown => {
      const ec = this.layerService.getEntityCollection()
      if (ec) {
        for (const entity of ec.values) {
          entity.show = isShown
        }
      }
    })
  }

  ngOnDestroy() {
    this.layerService.destroyDataSource()
  }

}
