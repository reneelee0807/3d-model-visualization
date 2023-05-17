import { Injectable } from '@angular/core';
import * as THREE from 'three';
import { LabelHeightByZoomLevel } from '../models/label-height-zoom-break-point';
import { LabelTextureService } from './label-texture.service';
import { RaycasterService } from './raycaster.service';
import { SceneService } from './scene.service';

@Injectable({ providedIn: 'root' })
export class MarkerLabelService {
  private selectedMarker: THREE.Sprite;

  constructor(
    private raycasterServie: RaycasterService,
    private sceneService: SceneService,
    private labelTextureService: LabelTextureService
  ) {}

  public get markerLabelSuffix(): string {
    return '-marker-label';
  }

  public getLabelSprite(marker: THREE.Sprite, event: MouseEvent): THREE.Sprite {
    this.selectedMarker = marker;
    const texture = this.labelTextureService.getLabelTexture(
      marker.userData.name
    );
    const sprite = this.labelTextureService.getLabelSprite(texture);
    const markerPosition = marker.position;

    const extraYPostion = this.getExtraYPositionForLabel(event);

    sprite.position.set(
      markerPosition.x,
      markerPosition.y + extraYPostion,
      markerPosition.z
    );
    sprite.name = `${marker.userData.name}${this.markerLabelSuffix}`;
    this.selectedMarker = marker;
    this.selectedMarker.add(sprite);
    this.sceneService.scene.add(sprite);

    return sprite;
  }

  public scaleSprite(sprite: THREE.Object3D, camera: THREE.Camera) {
    const scaleVector = new THREE.Vector3();
    const scaleFactor = 2;
    const scale =
      scaleVector.subVectors(sprite.position, camera.position).length() /
      scaleFactor;
    sprite.scale.set(0.5, 0.5 / 2, scale);
  }

  public removeLabel() {
    const markerLabels = this.sceneService.scene.children.find((child) =>
      child.name.endsWith(this.markerLabelSuffix)
    );
    if (markerLabels) {
      this.sceneService.scene.remove(markerLabels);
    }
  }

  private getExtraYPositionForLabel(event: MouseEvent | WheelEvent): number {
    if (this.selectedMarker) {
      const distance = this.raycasterServie.getDistanceFromTerrains(event);

      const heights = LabelHeightByZoomLevel.filter(
        (combination) => combination.zoomLevel >= distance
      ).map((combination) => combination.height);

      return Math.min(...heights);
    }
    return 0;
  }
}
