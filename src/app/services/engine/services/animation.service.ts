import { Injectable, NgZone } from "@angular/core";
import { CameraControlService } from "./camera-control.service";
import { CameraService } from "./camera.service";
import { RendererService } from "./renderer.service";
import { SceneService } from "./scene.service";
import * as TWEEN from "@tweenjs/tween.js";
import { CSSLabelRendererService } from "./css-label-renderer.service";
import { RotationService } from "./rotation.service";

@Injectable({
  providedIn: "root",
})
export class AnimationService {
  public frameId: number;

  constructor(
    private ngZone: NgZone,
    private cameraControlService: CameraControlService,
    private rendererService: RendererService,
    private cameraService: CameraService,
    private sceneService: SceneService,
    private cSSLabelRendererService: CSSLabelRendererService,
    private rotationService: RotationService
  ) {}

  public animate(clock: THREE.Clock): void {
    this.ngZone.runOutsideAngular(() => {
      if (document.readyState !== "loading") {
        this.render(clock);
      } else {
        window.addEventListener("DOMContentLoaded", () => {
          this.render(clock);
        });
      }

      window.addEventListener("resize", () => {
        this.resize();
      });
    });
  }

  public render(clock: THREE.Clock): void {
    const delta = clock.getDelta();
    this.cameraControlService.cameraControl.update(delta);
    this.frameId = requestAnimationFrame(() => {
      this.render(clock);
      TWEEN.update();
    });
    this.cameraService.camera.getWorldDirection(this.rotationService.direction);
    this.rendererService.renderer.render(
      this.sceneService.scene,
      this.cameraService.camera
    );
    this.cSSLabelRendererService.CSSLabelRenderer.render(
      this.sceneService.scene,
      this.cameraService.camera
    );
  }

  public resize(): void {
    const width = window.innerWidth;
    const height = window.innerHeight;

    this.cameraService.camera.aspect = width / height;
    this.cameraService.camera.updateProjectionMatrix();
    this.rendererService.renderer.setSize(width, height);
    this.cSSLabelRendererService.CSSLabelRenderer.setSize(width, height);
  }
}
