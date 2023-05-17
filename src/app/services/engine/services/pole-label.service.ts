import { Injectable } from '@angular/core';
import { SceneService } from './scene.service';
import * as THREE from 'three';
import * as TWEEN from '@tweenjs/tween.js';
import { LabelTextureService } from './label-texture.service';
import { HoverLabelPostions, LabelPostion } from '../type/position';
import { MouseoverLabelService } from './mouseover-label.service';

const PoleLabelsGroupSuffix = '-poleLabelGroup';

@Injectable({
  providedIn: 'root',
})
export class PoleLabelService {
  constructor(
    private sceneService: SceneService,
    private labelTextureService: LabelTextureService,
    private mouseoverLabelService: MouseoverLabelService
  ) {}

  public toggleOnPoleLabels(slug: string, labelPoints: LabelPostion[]) {
    const group = this.getPoleLabelGroup(slug);
    this.initiateSiteLocationLabels(labelPoints, group);
    group.children.forEach((label: THREE.Object3D) => {
      new TWEEN.Tween((<any>label.children[0]).material)
        .to({ opacity: 1 }, 0)
        .start();
      new TWEEN.Tween(label.children[0].position).to({ y: 550 }, 0).start();
    });
    this.sceneService.scene.add(group);
  }

  private getPoleLabelGroup(slug: string): THREE.Group {
    const group = new THREE.Group();
    group.name = this.getLabelsGroupName(slug);
    return group;
  }

  private getLabelsGroupName(slug: string) {
    return `${slug}${PoleLabelsGroupSuffix}`;
  }

  private initiateSiteLocationLabels = (
    locations: LabelPostion[],
    target: THREE.Group,
    poleColor: string = 'white'
  ) => {
    locations.forEach((location) => {
      const texture = this.labelTextureService.getLabelTexture(location.name);

      const base = this.getBaseForLabel(poleColor, location);

      const sprite = this.labelTextureService.getLabelSprite(texture);
      sprite.position.set(0, 0, 0);

      base.add(sprite);
      target.add(base);
    });
  };

  private getBaseForLabel(poleColor: string, location: LabelPostion) {
    const geometry = new THREE.BoxGeometry(20, 950, 20);
    const material = new THREE.MeshBasicMaterial({
      color: poleColor,
    });
    const base = new THREE.Mesh(geometry, material);
    const [x, y, z] = location.position;
    base.position.set(x, y, z);
    return base;
  }

  public toggleOffPoleLabels(slug: string) {
    const groupName = this.getLabelsGroupName(slug);
    const group = this.sceneService.scene.getObjectByName(groupName);
    if (group) {
      this.sceneService.scene.remove(group);
    }
  }

  public toggleOnPolesWithHoverLabel(
    canvas: HTMLCanvasElement,
    slug: string,
    hoverPoints: HoverLabelPostions,
    baseColor: string
  ) {
    const group = this.getPoleLabelGroup(slug);
    this.initiateHoverLocationLabels(canvas, group, hoverPoints, baseColor);
    this.sceneService.scene.add(group);
  }

  private initiateHoverLocationLabels(
    canvas: HTMLCanvasElement,
    intersectableGroup: THREE.Group,
    hoverPoints: HoverLabelPostions,
    baseColor: string
  ): void {
    hoverPoints.points.forEach((location) => {
      const base = this.getBaseForLabel(baseColor, location);
      base.userData = location;
      intersectableGroup.add(base);
      canvas.addEventListener(
        'mousemove',
        this.mouseoverLabelService.addMouseoverEventListenerOnLocationLabel(
          intersectableGroup,
          baseColor,
          hoverPoints.hoverColor
        ),
        true
      );
    });
  }
}
