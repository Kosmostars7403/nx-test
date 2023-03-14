import {Cartesian3} from "cesium";

export interface Areas {
  center: Cartesian3,
  radiuses: {
    videoRadius: number,
    remoteControlRadius: number,
    effectiveRadius: number,
    maxRadius: number
  }
}
