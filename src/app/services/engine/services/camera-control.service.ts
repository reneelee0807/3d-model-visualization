import { Injectable } from "@angular/core";
import CameraControls from "camera-controls";
import {
  InitialCameraPosition,
  InitialControlTarget,
} from "src/app/data/stages";
import * as THREE from "three";
import { Position } from "../type/position";
import { CameraService } from "./camera.service";
import { RendererService } from "./renderer.service";
import { RotationService } from "./rotation.service";

CameraControls.install({ THREE: THREE });

@Injectable({
  providedIn: "root",
})
export class CameraControlService {
  public cameraControl: CameraControls;
  public maxPan = new THREE.Vector3(12504.4027, 18000, 8000.8545);
  public minPan = new THREE.Vector3(-8500.5973, -15000, -9000.1455);

  private spherical = new THREE.Spherical();
  private positionV = new THREE.Vector3();
  private targetV = new THREE.Vector3();

  constructor(
    private rotationService: RotationService,
    private rendererService: RendererService,
    private cameraService: CameraService
  ) {}

  public setCameraControl() {
    this.cameraControl = new CameraControls(
      this.cameraService.camera,
      this.rendererService.renderer.domElement
    );
    this.setCameraControlProperties();
    this.enableControlMouseAction();
    this.setCameraControlPosition(InitialCameraPosition, InitialControlTarget);
    this.setBountry();
  }

  private setCameraControlProperties() {
    this.cameraControl.enabled = true;
    this.cameraControl.minDistance = 1000;
    this.cameraControl.maxDistance = 50000;
    this.cameraControl.minPolarAngle = 0;
    this.cameraControl.maxPolarAngle = Math.PI / 2.1;
    this.cameraControl.azimuthRotateSpeed = 0.3;
    this.cameraControl.dollySpeed = 0.5;
    this.cameraControl.polarRotateSpeed = 0.3;
    this.cameraControl.truckSpeed = 0.3;
  }

  public setCameraControlPosition(
    cameraPosition: Position,
    controlTarget: Position
  ) {
    this.cameraControl.setLookAt(
      cameraPosition.x,
      cameraPosition.y,
      cameraPosition.z,
      controlTarget.x,
      controlTarget.y,
      controlTarget.z,
      true
    );
  }

  public addControlEventListener() {
    this.cameraControl.addEventListener("control", () => {
      this.cameraControl.getPosition(this.positionV);
      this.cameraControl.getTarget(this.targetV);
      this.spherical.setFromVector3(this.rotationService.direction);
      this.rotationService.rotation.next(
        THREE.MathUtils.radToDeg(this.spherical.theta)
      );
    });
  }

  public addUpdateEventListener() {
    this.cameraControl.addEventListener("update", () => {
      this.cameraService.camera.updateProjectionMatrix();
      this.cameraService.camera.updateMatrix();
      this.cameraService.camera.getWorldDirection(
        this.rotationService.direction
      );
      this.spherical.setFromVector3(this.rotationService.direction);
      this.rotationService.rotation.next(
        THREE.MathUtils.radToDeg(this.spherical.theta)
      );
    });
  }

  public enableControlMouseAction() {
    this.cameraControl.mouseButtons.right = CameraControls.ACTION.TRUCK;
    this.cameraControl.mouseButtons.left = CameraControls.ACTION.ROTATE;
    this.cameraControl.mouseButtons.wheel = CameraControls.ACTION.DOLLY;
    this.cameraControl.mouseButtons.middle = CameraControls.ACTION.DOLLY;
    this.cameraControl.mouseButtons.shiftLeft = CameraControls.ACTION.DOLLY;
  }

  private setBountry() {
    const bb = new THREE.Box3(this.minPan, this.maxPan);
    // const boxHelper = new THREE.Box3Helper(bb, new THREE.Color('red'))
    // this.scene.add(boxHelper)
    this.cameraControl.setBoundary(bb);
    this.cameraControl.boundaryFriction = 0.5;
  }
}
