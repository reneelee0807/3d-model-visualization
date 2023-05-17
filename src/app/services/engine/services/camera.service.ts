import { Injectable } from "@angular/core";
import { InitialCameraPosition } from "src/app/data/stages";

import * as THREE from "three";
import { Position } from "../type/position";
import { SceneService } from "./scene.service";

const DefaultFov = 45;
const DefaultAspect = window.innerWidth / window.innerHeight;
const DefaultNear = 10;
const DefaultFar = 250000;



@Injectable({
  providedIn: "root",
})
export class CameraService {
  public camera: THREE.PerspectiveCamera;

  constructor(private sceneService: SceneService) {}

  public createCamera(
    fov?: number,
    aspect?: number,
    near?: number,
    far?: number
  ) {
    this.camera = new THREE.PerspectiveCamera(
      fov || DefaultFov,
      aspect || DefaultAspect,
      near || DefaultNear,
      far || DefaultFar
    );
    this.camera.lookAt(this.sceneService.scene.position);
    this.setCameraPosition(InitialCameraPosition);
    this.sceneService.scene.add(this.camera);
  }

  private setCameraPosition(cameraPosition: Position) {
    this.camera.position.set(
      cameraPosition.x,
      cameraPosition.y,
      cameraPosition.z
    );
  }
}
