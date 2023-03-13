import * as Cesium from "cesium";
import {EventEmitter} from "@angular/core";

export interface ICesiumEntity {
  entity: Cesium.Entity
  set entityOptions(opts: any)
  added: EventEmitter<void>
  zoomTo(): void
}
