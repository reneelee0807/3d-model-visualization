import { Injectable } from "@angular/core";
import * as THREE from "three";
import { RaycasterService } from "./raycaster.service";
import { BsModalService } from "ngx-bootstrap/modal";
import { SceneService } from "./scene.service";
import { MarkerLabelService } from "./marker-label.service";
import { MarkerPoint } from "../type/position";
import { ContentDialogComponent } from "src/app/components/content-dialog/content-dialog.component";
import { RendererService } from "./renderer.service";

const DefaultMarkerScaleSize = {
  x: 0.023,
  y: 0.03,
  z: 1,
};

const MarkerGroupSuffix = "-markerGroup";

@Injectable({
  providedIn: "root",
})
export class MarkerService {
  private selectedMarker: THREE.Sprite | null;
  private markersWithResource: THREE.Object3D[] = [];
  private markerGroup = new THREE.Group();

  constructor(
    private raycasterServie: RaycasterService,
    private modalService: BsModalService,
    private sceneService: SceneService,
    private markerLabelService: MarkerLabelService,
    private rendererService: RendererService
  ) {}

  public listenToHoverMarkers(canvas: HTMLCanvasElement) {
    this.sceneService.scene.add(this.markerGroup);
    canvas.addEventListener(
      "mousemove",
      this.listenToMouseoverEventOnMarker(this.markerGroup),
      true
    );
  }

  public addMarkersToTerrain(
    groupSlug: string,
    markers: MarkerPoint[],
    markerIcon: string,
    markerColor: string
  ) {
    console.log("888", markers);
    const group = this.getMarkerGroup(
      groupSlug,
      markers,
      markerIcon,
      markerColor
    );
    this.markerGroup.add(group);

    // this.sceneService.scene.add(group);
  }

  private getMarkerGroupName(groupSlug: string): string {
    return `${groupSlug}${MarkerGroupSuffix}`;
  }

  private getMarkerGroup(
    groupSlug: string,
    markers: MarkerPoint[],
    markerIcon: string,
    markerColor: string
  ): THREE.Group {
    const group = new THREE.Group();
    group.name = this.getMarkerGroupName(groupSlug);
    markers.forEach((point) => {
      const material = this.getMarkerSpriteMaterial(markerIcon, markerColor);
      const sprite = this.getMarkerSprite(material, point, markerColor);
      this.updateMarkersWithResourceGroup(sprite, point);
      group.add(sprite);
    });
    return group;
  }

  private getMarkerSpriteMaterial(markerIcon: string, markerColor: string) {
    const map = new THREE.TextureLoader().load(markerIcon);
    const material = new THREE.SpriteMaterial({
      map: map,
      depthTest: true,
      sizeAttenuation: false,
      color: markerColor,
    });
    return material;
  }

  private setMarkerSpriteSize(sprite: THREE.Sprite, markerPoint: MarkerPoint) {
    const [scaleX, scaleY, scaleZ] = markerPoint.size?.length
      ? markerPoint.size
      : [
          DefaultMarkerScaleSize.x,
          DefaultMarkerScaleSize.y,
          DefaultMarkerScaleSize.z,
        ];
    sprite.scale.set(scaleX, scaleY, scaleZ);
  }

  private setMarkerSpritePosition(
    sprite: THREE.Sprite,
    markerPoint: MarkerPoint
  ) {
    const [x, y, z] = markerPoint.position;
    sprite.position.set(x, y + 60, z);
  }

  private getMarkerSprite(
    material: THREE.SpriteMaterial,
    markerPoint: MarkerPoint,
    markerColor: string
  ): THREE.Sprite {
    const sprite = new THREE.Sprite(material);
    sprite.userData = { ...markerPoint, originalColor: markerColor };
    this.setMarkerSpritePosition(sprite, markerPoint);
    this.setMarkerSpriteSize(sprite, markerPoint);
    return sprite;
  }

  private updateMarkersWithResourceGroup(
    sprite: THREE.Sprite,
    markerPoint: MarkerPoint
  ) {
    if (markerPoint.hasExtras) {
      this.markersWithResource.push(sprite);
    }
  }

  public removeMarkersFromTerrain(groupSlug: string) {
    const groupName = this.getMarkerGroupName(groupSlug);
    const group = this.markerGroup.getObjectByName(groupName);
    if (group) {
      this.markerGroup.remove(group);
    }
  }

  public listenToMouseoverEventOnMarker =
    (markerGroup: THREE.Group, hoverColor: string = "#32a852") =>
    (event: MouseEvent): void => {
      this.resetPreviousSelectedMarker();
      const intersects = this.raycasterServie.findIntersects(
        markerGroup.children,
        event
      );
      if (intersects?.length) {
        console.log(intersects);
        const closestObject = <THREE.Sprite>intersects[0].object;
        this.onSelectNewMarker(closestObject, hoverColor, event);
      } else {
        document.body.style.cursor = "default";
      }
    };

  private resetPreviousSelectedMarker() {
    if (this.selectedMarker) {
      this.resetSelectedMarkerColor(this.selectedMarker.userData.originalColor);
      this.listenToMouseoutEventOnMarker();
    }
  }

  private onSelectNewMarker(
    closestObject: THREE.Sprite,
    hoverColor: string,
    event: MouseEvent
  ) {
    if (closestObject !== this.selectedMarker) {
      this.selectedMarker = closestObject;
      this.updateStyleWhenHoverMarkerWithResource(closestObject, hoverColor);
      this.displayMarkerLabel(closestObject, event);
    }
  }

  public listenToMouseoutEventOnMarker() {
    if (!this.selectedMarker) {
      return;
    }

    this.selectedMarker.traverse((object) => {
      if (object && this.selectedMarker) {
        this.selectedMarker.remove(object);
      }
    });
    this.selectedMarker = null;
    this.markerLabelService.removeLabel();
  }

  public updateStyleWhenHoverMarkerWithResource(
    marker: THREE.Sprite,
    hoverColor: string = "#32a852"
  ) {
    if (marker?.userData?.hasExtras) {
      document.body.style.cursor = "pointer";
      this.setSelectedMarkerWithHoverColor(marker, hoverColor);
    }
  }

  private displayMarkerLabel(marker: THREE.Sprite, event: MouseEvent) {
    if (!marker.userData.name) {
      return;
    }

    this.markerLabelService.getLabelSprite(marker, event);
  }

  private resetSelectedMarkerColor(originalColor: string): void {
    if (this.selectedMarker && originalColor) {
      this.selectedMarker.material.color.set(originalColor);
    }
  }

  private setSelectedMarkerWithHoverColor(
    marker: THREE.Sprite,
    hoverColor: string
  ): void {
    this.selectedMarker = marker;
    if (hoverColor) {
      this.selectedMarker.material.color.set(hoverColor);
    }
  }

  public listenToMouseClickEventOnMarker = (event: MouseEvent): void => {
    const intersects = this.raycasterServie.findIntersects(
      this.markersWithResource,
      event
    );
    const markerUseData = intersects?.[0]?.object?.userData;

    if (markerUseData) {
      const item = {
        name: markerUseData.name,
        source: markerUseData.source,
        type: markerUseData.type,
        description: markerUseData.description,
      };
      const initialState = {
        displayAsList: false,
        selectedItem: item,
        title: markerUseData.name,
      };
      console.log(item);

      this.modalService.show(ContentDialogComponent, {
        initialState,
        class: "modal-xl modal-dialog-centered",
      });
    }
  };
}
