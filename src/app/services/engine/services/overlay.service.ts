import { Injectable } from '@angular/core';
import { SceneService } from './scene.service';


import * as THREE from 'three';
import { OverlayMesh } from '../type/overlay-mesh';

@Injectable({
  providedIn: 'root',
})
export class OverlayService {
  constructor(private sceneService: SceneService) {}

  public showAllOverlaysAndUpdateMaterial(overlaysNames: OverlayMesh[]) {
    overlaysNames.forEach((overlay) =>
      this.showSingleOverlayAndUpdateMaterial(overlay)
    );
  }

  public showSingleOverlayAndUpdateMaterial(overlay: OverlayMesh) {
    this.sceneService.scene.traverse((object: any) => {
      if (object.name === overlay.name) {
        object.visible = true;
        if (overlay.opacity || overlay.color) {
          this.setOverlayMaterial(object, overlay);
        }
      }
    });
  }

  public showAllOverlays(overlaysNames: OverlayMesh[]) {
    overlaysNames.forEach((overlay) => this.showSingleOverlay(overlay));
  }

  public showSingleOverlay(overlay: OverlayMesh) {
    this.sceneService.scene.traverse((object: any) => {
      if (object.name === overlay.name) {
        object.visible = true;
      }
    });
  }

  public updateOverlaysMaterialByName(overlaysNames: OverlayMesh[]) {
    overlaysNames.forEach((overlay) => {
      const object = this.sceneService.scene.getObjectByName(overlay.name);
      this.setOverlayMaterial(object, overlay);
    });
  }

  private setOverlayMaterial(object: any, overlay: OverlayMesh) {
    if (object?.material) {
      this.setOverlay(object, overlay.opacity, overlay.color);
    } else {
      object?.children.forEach((child: any) => {
        this.setOverlay(child, overlay.opacity, overlay.color);
        if (child.children) {
          this.setChildrenOverlay(child, overlay);
        }
      });
    }
  }

  setChildrenOverlay(object: any, overlay: any) {
    object.children.forEach((child: any) => {
      this.setOverlay(child, overlay.opacity, overlay.color);
    });
  }

  private setOverlay(object: any, opacity?: number, color?: string) {
    if (object.material) {
      object.userData.originalMaterial = object.material.clone();
      const newMaterial = object.material.clone();
      newMaterial.opacity = opacity || 1;
      newMaterial.transparent = opacity ? true : false;
      if (color) {
        newMaterial.color.set(new THREE.Color(color));
        newMaterial.emissive.set(new THREE.Color(color));
      }
      object.material = newMaterial;
      object.material.needsUpdate = true;
    }
  }

  public resetOverlaysMaterialByName(overlaysNames: OverlayMesh[]) {
    if (overlaysNames?.length) {
      overlaysNames.forEach((overlay) => {
        const object = this.sceneService.scene.getObjectByName(overlay.name);
        this.resetOverlayAndChildrenMaterial(object);
      });
    }
  }

  private resetOverlay(object: any) {
    if (object.material && object.userData.originalMaterial) {
      object.material = object?.userData?.originalMaterial;
      object.material.needsUpdate = true;
    }
  }

  private resetOverlayAndChildrenMaterial(overlayObject: any) {
    if (overlayObject.material) {
      this.resetOverlay(overlayObject);
    } else {
      overlayObject.traverse((child: any) => {
        this.resetOverlay(child);
      });
    }
  }

  public hideOverlays(overlaysNames: OverlayMesh[]) {
    overlaysNames.forEach((overlay) => this.hideOverlay(overlay));
  }

  public hideOverlay(overlay: OverlayMesh) {
    const overlayObject: any = this.sceneService.scene.getObjectByName(
      overlay.name
    );
    overlayObject.visible = false;
    if (overlay.opacity || overlay.color) {
      this.resetOverlayAndChildrenMaterial(overlayObject);
    }
  }
}
