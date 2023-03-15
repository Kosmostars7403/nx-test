import * as Cesium from "cesium";
import {Directive, EventEmitter, inject, Input, OnDestroy, Output} from "@angular/core";
import {CesiumService} from "../services/cesium.service";
import {GraphicsTypes} from "../interfaces/graphics-types";
import {ICesiumEntity} from "../interfaces/cesium-entity.interface";
import {LayerService} from "../services/layer.service";


@Directive()
export class CesiumEntity implements ICesiumEntity, OnDestroy {
  private _options!: any

  entity!: Cesium.Entity

  layerService: LayerService | null

  @Input()
  set entityOptions(opts: any) {
    this._options = opts
    this.update(opts)
    this.updateCCProperties(opts)
  }

  @Output() added = new EventEmitter<void>()

  constructor(
    protected cesiumService: CesiumService,
    private graphicsTypeName: GraphicsTypes,
  ) {
    this.layerService = inject(LayerService, {
      optional: true
    })
  }

  addOnMap() {
    const entityCollection: Cesium.EntityCollection = this.layerService?.getEntityCollection()
      ? (this.layerService.getEntityCollection() as Cesium.EntityCollection)
      : this.cesiumService.getViewer().entities

    this.entity = entityCollection.add({
      id: this._options.id ?? Math.random(),
      name: this._options.name ?? undefined,
      position: this._options.position ?? undefined,
      description: this._options.description ?? undefined,
      orientation: this._options.orientation ?? undefined,
      viewFrom: this._options.viewFrom ?? undefined,
      [this.graphicsTypeName]: this._options,
    })

    Object.defineProperty(this.entity, 'ccComp', {
      value: this
    })
    this.added.emit()
  }

  update(options: any) {
    if (!this.entity) {
      this.addOnMap()
      return
    }

    if (
      this.entity.position instanceof Cesium.CallbackProperty &&
      this.entity.position.isConstant
    ) {
        this.entity.position = options.position;
    }

    this.entity.position = options.position !== undefined ? options.position : undefined;
    this.entity.name = options.name !== undefined ? options.name : this.entity.name;
    this.entity.description = options.description !== undefined ? options.description : this.entity.description;
    this.entity.orientation = options.orientation !== undefined ? options.orientation : this.entity.orientation;
    this.entity.viewFrom = options.viewFrom !== undefined ? options.viewFrom : this.entity.viewFrom;
    this.entity.availability = options.availability !== undefined ? options.availability : options.availability;

    Object.assign((this.entity as any)[this.graphicsTypeName], options);
  }

  zoomTo() {
    this.cesiumService.getViewer().zoomTo(this.entity)
  }

  updateCCProperties(options: any) {
    if (this.entity) {
      //@ts-ignore
      this.entity['ccProperties'] = options
    }
  }

  ngOnDestroy() {
    this.cesiumService.getViewer()?.entities.remove(this.entity);
  }

}
