import { Injectable } from "@angular/core";
import { RaycasterService } from "./raycaster.service";
import * as THREE from "three";
import { CameraControlService } from "./camera-control.service";
import { CameraService } from "./camera.service";
import { SceneService } from "./scene.service";
import { RotationService } from "./rotation.service";
import { Position } from "../type/position";

const CenterAndZoomCameraAlphaNum = 0.5;
const CenterAlphaCameraNum = 0;

@Injectable({
  providedIn: "root",
})
export class PanToLocationService {
  constructor(
    private raycasterServie: RaycasterService,
    private cameraControlService: CameraControlService,
    private cameraService: CameraService,
    private sceneService: SceneService,
    private rotationService: RotationService
  ) {}

  public panToTargetLocation(
    cameraPosition: Position,
    controlTarget: Position
  ): void {
    this.cameraControlService.setCameraControlPosition(
      cameraPosition,
      controlTarget
    );
    this.cameraService.camera.updateProjectionMatrix();
    this.cameraService.camera.updateMatrix();
  }

  public centerAndZoomByDoubleClick = (event: MouseEvent) => {
    const scene = this.sceneService.scene;
    const intersects = this.raycasterServie.findIntersects([scene], event);
    console.log('intersects[0].point', intersects[0].point)
    if (
      intersects.length &&
      this.cameraControlService.cameraControl.distance > 400
    ) {
     
      const newCameraPosition = this.getCenterCameraPosition(
        this.cameraService.camera.position,
        intersects[0].point,
        CenterAndZoomCameraAlphaNum
      );
      const newTargetPosition = this.getCenterTargetPosition(
        intersects[0].point
      );
      console.log('newCameraPosition', newCameraPosition)
      console.log('newTargetPosition', newTargetPosition)
      this.centerAndZoom(newCameraPosition, newTargetPosition);
    }
  };

  public centerAndPanToTargetLocation(
    cameraPosition: Position,
    controlTarget: Position
  ) {
    const newCameraPosition = this.getCenterCameraPosition(
      cameraPosition as THREE.Vector3,
      controlTarget as THREE.Vector3,
      CenterAlphaCameraNum
    );
    const newTargetPosition = this.getCenterTargetPosition(
      controlTarget as THREE.Vector3
    );

    this.centerAndZoom(newCameraPosition, newTargetPosition);
  }

  private centerAndZoom(
    cameraPosition: THREE.Vector3,
    targetPosition: THREE.Vector3
  ) {
    this.cameraControlService.setCameraControlPosition(
      cameraPosition,
      targetPosition
    );
    this.cameraService.camera.updateProjectionMatrix();
    this.cameraService.camera.updateMatrix();
    this.cameraService.camera.getWorldDirection(this.rotationService.direction);
  }

  private getCenterCameraPosition(
    cameraPosition: THREE.Vector3,
    point: THREE.Vector3,
    alpha: number
  ): THREE.Vector3 {
    const newCameraPosition = new THREE.Vector3();
    return newCameraPosition.lerpVectors(cameraPosition, point, alpha);
  }

  private getCenterTargetPosition(point: THREE.Vector3): THREE.Vector3 {
    const newTargetPosition = new THREE.Vector3(point.x, point.y, point.z);
    newTargetPosition.clamp(
      this.cameraControlService.minPan,
      this.cameraControlService.maxPan
    );
    return newTargetPosition;
  }
}
