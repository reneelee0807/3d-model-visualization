import { Injectable } from "@angular/core";
import * as THREE from "three";
import { LabelTextureService } from "./label-texture.service";
import { RaycasterService } from "./raycaster.service";

@Injectable({ providedIn: "root" })
export class MouseoverLabelService {
  private selectedObject: any;

  constructor(
    private raycasterServie: RaycasterService,
    private labelTextureService: LabelTextureService
  ) {}

  public addMouseoverEventListenerOnLocationLabel =
    (intersectableGroups: THREE.Group, baseColor: string, hoverColor: string) =>
    (event: MouseEvent) => {
      if (this.selectedObject) {
        this.selectedObject.material.color.set(new THREE.Color(baseColor));
        this.selectedObject.traverse((object: any) => {
          if (object) this.selectedObject.remove(object);
        });
        this.selectedObject = null;
      }

      const intersects = this.raycasterServie.findIntersects(
        [intersectableGroups],
        event
      );

      intersects.length
        ? this.createLabelForIntersect(intersects, hoverColor)
        : this.resetCursorStyle();
    };

  private createLabelForIntersect(
    intersects: THREE.Intersection[],
    hoverColor: string
  ): void {
    const intersect = intersects.find(
      (intersect) => intersect && intersect.object
    );
    if (intersect) {
      this.createLabel(intersect, hoverColor);
    }
  }

  private createLabel(intersect: THREE.Intersection, hoverColor: string): void {
    const label = this.labelTextureService.getHTMLLabel(intersect);
    this.selectedObject = intersect.object;
    this.selectedObject.add(label);
    this.selectedObject.material.color.set(hoverColor);
  }

  private resetCursorStyle(): void {
    document.body.style.cursor = "default";
  }
}
