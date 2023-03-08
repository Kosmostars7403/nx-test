import * as Cesium from "cesium";

export class ViewerFactory {

  createViewer(mapContainer: HTMLElement, options?: any) {
    let viewer = null;
    if (options) {
      viewer = new Cesium.Viewer(mapContainer, {
        contextOptions: {
          webgl: {preserveDrawingBuffer: true}
        },
        ...options
      });
    } else {
      viewer = new Cesium.Viewer(mapContainer,
        {
          contextOptions: {
            webgl: {preserveDrawingBuffer: true}
          },
        });
    }

    return viewer;
  }
}
