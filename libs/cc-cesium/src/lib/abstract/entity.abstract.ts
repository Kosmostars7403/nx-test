import * as Cesium from "cesium";
import {Directive, Input, OnInit} from "@angular/core";
import {CesiumService} from "../services/cesium.service";

@Directive()
export class CesiumEntity implements OnInit {
  @Input()
  entityOptions: any

  @Input()
  zoomTo = false

  entity!: Cesium.Entity

  constructor(protected cesiumService: CesiumService) {
  }

  ngOnInit(): void {
    const viewer = this.cesiumService.getViewer()
    this.entity = viewer.entities.add(this.entityOptions)

    if (this.zoomTo) viewer.zoomTo(this.entity)
  }

}
