import {ChangeDetectionStrategy, Component} from '@angular/core';
import {CesiumEntity} from "../../abstract/entity.abstract";
import {CesiumService} from "../../services/cesium.service";
import {GraphicsTypes} from "../../interfaces/graphics-types";

@Component({
  selector: 'cc-model',
  template: '',
  exportAs: 'entity',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CcModelComponent extends CesiumEntity {
  constructor(cesiumService: CesiumService) {
    super(cesiumService, GraphicsTypes.MODEL)
  }
}
