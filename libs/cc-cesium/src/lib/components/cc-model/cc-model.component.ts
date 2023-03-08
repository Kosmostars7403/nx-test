import {Component, Input, OnInit} from '@angular/core';
import {CesiumEntity} from "../../abstract/entity.abstract";
import {CesiumService} from "../../services/cesium.service";
import * as Cesium from "cesium";

@Component({
  selector: 'cc-model',
  template: ''
})
export class CcModelComponent extends CesiumEntity implements OnInit  {
  @Input() modelOptions: any

  constructor(cesiumService: CesiumService) {
    super(cesiumService)
  }

  override ngOnInit() {
    super.ngOnInit();
    this.entity.model = new Cesium.ModelGraphics(this.modelOptions)
  }
}
