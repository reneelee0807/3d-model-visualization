import { Injectable } from '@angular/core';
import { SceneService } from './scene.service';

@Injectable({
  providedIn: 'root',
})
export class MeshService {
  constructor(private sceneService: SceneService) {}

  public toggleMeshByStatus(meshName: string, isVisible: boolean) {
    const mesh = this.sceneService.scene.getObjectByName(meshName);
    if (mesh) {
      mesh.visible = isVisible;
    }
  }
}
