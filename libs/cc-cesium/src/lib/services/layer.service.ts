import {Injectable} from "@angular/core";
import {CesiumService} from "./cesium.service";
import * as Cesium from "cesium";

@Injectable()
export class LayerService {
  id: number
  dataSource?: Cesium.DataSource

  constructor(private cesiumService: CesiumService) {
    this.id = Math.random()
  }

  add(entity: Cesium.Entity) {
    this.getEntityCollection()?.add(entity)
  }

  getEntityCollection(): Cesium.EntityCollection | undefined {
    return this.dataSource?.entities
  }

  createDataSource(name: string | undefined) {
    this.dataSource = new Cesium.CustomDataSource(`${name ?? ''}${Math.random()}`)
  }

  async registerDataSourceInViewer() {
    if (this.dataSource) {
      await this.cesiumService.getViewer().dataSources.add(this.dataSource)
    }
  }

  destroyDataSource() {
    if (this.dataSource) {
      this.dataSource.entities.removeAll()
      this.cesiumService.getViewer().dataSources.remove(this.dataSource)
    }
  }

}
