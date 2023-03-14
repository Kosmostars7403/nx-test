import {ElementRef, Injectable, Renderer2, RendererFactory2} from "@angular/core";
import * as Cesium from "cesium";
import { CesiumService } from "../../services/cesium.service";

@Injectable()
export class CameraProjectionService {
  private projectionPolygonHierarchy?: Cesium.PolygonHierarchy

  videoUrl?: string
  videoElement?: HTMLVideoElement
  videoPolygon?: Cesium.Entity
  videoSynchronizer?: Cesium.VideoSynchronizer

  r2: Renderer2

  constructor(
    private cesiumService: CesiumService,
    private elRef: ElementRef,
    rendererFactory: RendererFactory2
  ) {
    this.r2 = rendererFactory.createRenderer(null, null);
  }

  setProjectionPolygonHierarchy(ph: Cesium.PolygonHierarchy) {
    this.projectionPolygonHierarchy = ph
  }

  getProjectionPolygonHierarchy() {
    return this.projectionPolygonHierarchy
  }

  setVideoUrl(url: string) {
    this.videoUrl = url
  }

  createVideoElement(url: string | undefined | null) {
    if (!url) return

    const videoEl = this.r2.createElement('video')
    this.r2.appendChild(this.elRef.nativeElement, videoEl)
    this.r2.setProperty(videoEl, 'src', url);
    this.r2.setProperty(videoEl, 'autoplay', true);
    this.r2.setProperty(videoEl, 'muted', true);
    this.r2.setProperty(videoEl, 'loop', true);
    this.r2.setProperty(videoEl, 'controls', true);
    this.r2.setStyle(videoEl, 'display', 'none')
    this.videoElement = videoEl

    return videoEl
  }

  hideVideo() {
    this.r2.removeChild(this.elRef.nativeElement, this.videoElement)
    if (this.videoPolygon) this.cesiumService.getViewer().entities.remove(this.videoPolygon)
    this.videoSynchronizer?.destroy()

    this.videoElement = undefined
    this.videoPolygon = undefined
  }

  showVideo() {
    if (this.videoPolygon) return

    if (!this.projectionPolygonHierarchy) {
      throw Error('You must calculate projection polygon by camera view first!')
    }

    const viewer = this.cesiumService.getViewer()

    this.videoPolygon = viewer.entities.add({
      polygon: {
        hierarchy: this.projectionPolygonHierarchy,
        material: this.createVideoElement(this.videoUrl)
      },
    })

    this.videoSynchronizer = new Cesium.VideoSynchronizer({
      clock: viewer.clock,
      element: this.videoElement
    });
  }

  toggleVideo() {
    if (this.videoPolygon) {
      this.hideVideo()
      return
    }

    this.showVideo()
  }

}
