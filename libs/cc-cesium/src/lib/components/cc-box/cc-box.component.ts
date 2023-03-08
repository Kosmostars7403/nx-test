import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import * as Cesium from "cesium";
import {CesiumEntity} from "../../abstract/entity.abstract";
import {CesiumService} from "../../services/cesium.service";

@Component({
  selector: 'cc-box',
  template: '',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CcBoxComponent extends CesiumEntity implements OnInit {
  @Input() graphicsOptions: any

  constructor(cesiumService: CesiumService) {
    super(cesiumService)
  }

  override ngOnInit() {
    super.ngOnInit();
    this.entity.box = new Cesium.BoxGraphics(this.graphicsOptions)
  }

}
