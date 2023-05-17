import { Injectable } from '@angular/core';
import * as THREE from 'three';
import { CameraControlService } from './camera-control.service';
import { CameraService } from './camera.service';
import { RendererService } from './renderer.service';
import { SceneService } from './scene.service';

@Injectable({ providedIn: 'root' })
export class RaycasterService {
  private raycaster = new THREE.Raycaster();

  constructor(
    private cameraControlService: CameraControlService,
    private rendererService: RendererService,
    private cameraService: CameraService,
    private sceneService: SceneService
  ) {}

  public findIntersects(
    objects: THREE.Object3D[],
    event: MouseEvent | WheelEvent
  ): THREE.Intersection[] {
    const pointer = new THREE.Vector2();
    const rect =
      this.rendererService.renderer.domElement.getBoundingClientRect();
    pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    pointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

    this.raycaster.setFromCamera(pointer, this.cameraService.camera);
    return this.raycaster.intersectObjects(objects, true);
  }

  public getDistanceFromTerrains(event: MouseEvent | WheelEvent): number {
    const terrains = this.sceneService.scene.children.filter((child) =>
      child.name.startsWith('terrain-')
    );
    const intersects = this.findIntersects(terrains, event);
    if (intersects.length) {
      const position = this.cameraControlService.cameraControl.getPosition(
        intersects[0].point
      );
      return position.y;
    }
    return 0;
  }
}
