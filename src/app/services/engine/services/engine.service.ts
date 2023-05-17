import * as THREE from 'three';
import { ElementRef, EventEmitter, Injectable, Output } from '@angular/core';
import { Subject } from 'rxjs/internal/Subject';
import * as TWEEN from '@tweenjs/tween.js';
import { MarkerService } from './marker.service';
import CameraControls from 'camera-controls';
import { PanToLocationService } from './pan-to-location.service';
import { RendererService } from './renderer.service';
import { SceneService } from './scene.service';
import { CameraService } from './camera.service';
import { LoaderService } from './loader.service';
import { CSSLabelRendererService } from './css-label-renderer.service';
import { AnimationService } from './animation.service';
import { MeshService } from './mesh.service';
import { RotationService } from './rotation.service';
import { CameraControlService } from './camera-control.service';
import {
  InitialCameraPosition,
  InitialControlTarget,
} from 'src/app/data/stages';
import { FeatureMenu } from 'src/app/type/feature-sub-menu.model';
import { Stage } from 'src/app/type/3d-model';

CameraControls.install({ THREE: THREE });
@Injectable({ providedIn: 'root' })
export class EngineService {
  @Output() onShowThreeSixty = new EventEmitter();

  public rotation: Subject<number>;
  private markerGroup = new THREE.Group()

  private canvas: HTMLCanvasElement;
  private clock: THREE.Clock;

  public constructor(
    private animationService: AnimationService,
    // private splinesService: SplinesService,
    private markerService: MarkerService,
    private cameraControlService: CameraControlService,
    private panToLocationService: PanToLocationService,
    private rendererService: RendererService,
    private rotationService: RotationService,
    private sceneService: SceneService,
    private cameraService: CameraService,
    private loaderService: LoaderService,
    private cSSLabelRendererService: CSSLabelRendererService,
    private meshService: MeshService
  ) {}

  public ngOnDestroy(): void {
    TWEEN.removeAll();
    if (this.animationService.frameId != null) {
      cancelAnimationFrame(this.animationService.frameId);
    }
  }

  public animate(): void {
    this.animationService.animate(this.clock);
  }

  public createScene(canvas: ElementRef<HTMLCanvasElement>) {
    this.canvas = canvas.nativeElement;
    this.clock = new THREE.Clock();
    this.rotation = this.rotationService.rotation;
    this.rendererService.createRenderer(this.canvas);
    this.cSSLabelRendererService.setCSSLabelRenderer();
    this.sceneService.createScene();
    this.cameraService.createCamera();
    this.setControls();
  
    this.loaderService.setupLoader();
    this.loaderService.loadMineTerrainModel();
    this.doubleClickToCenterAndZoom();
    this.markerService.listenToHoverMarkers(this.canvas)
    this.listenToClickMarkerWithResource();
  }

  private listenToHoverMarkers(){
    this.markerGroup = new THREE.Group();
    this.sceneService.scene.add(this.markerGroup);
    this.canvas.addEventListener(
      "mousemove",
      this.markerService.listenToMouseoverEventOnMarker(this.markerGroup),
      true
    );
  }

  private doubleClickToCenterAndZoom() {
    this.canvas.addEventListener(
      'dblclick',
      this.panToLocationService.centerAndZoomByDoubleClick,
      true
    );
  }

  private listenToClickMarkerWithResource() {
    this.canvas.addEventListener(
      'click',
      this.markerService.listenToMouseClickEventOnMarker,
      true
    );
  }

  public toggleMarkersToTerrain(menu: FeatureMenu) {
    if (menu.markers && menu.markerIcon && menu.isActive) {
      console.log(menu)
      this.markerService.addMarkersToTerrain(
        menu.label,
        menu.markers,
        menu.markerIcon,
        menu.color
      );
    }else{
      this.markerService.removeMarkersFromTerrain( menu.label)
    }
  }

  public toggleOffMarkerByPage(page: any) {
    if (page.markers) {
      this.markerService.removeMarkersFromTerrain(page.slug);
    }
  }

  public toggleMeshByPage(page: any, isVisible: boolean) {
    if (page.meshes) {
      page.meshes.forEach((mesh: any) =>
        this.meshService.toggleMeshByStatus(mesh, isVisible)
      );
    }
  }

  public toggleStage(stage: Stage){
    this.loaderService.toggleStage(stage.model, stage.isActive)
  }

  // public toggleOnSplinesByPage(page: any) {
  //   if (page.splines) {
  //     this.splinesService.addPageSplinesToTerrain(page);
  //   }
  // }

  // public toggleOffSplinesByPage(page: any) {
  //   if (page.splines) {
  //     this.splinesService.removeSplinesFromTerrain(page.slug);
  //   }
  // }

  private setControls = () => {
    this.cameraControlService.setCameraControl();
    this.cameraControlService.addControlEventListener();
    this.cameraControlService.addUpdateEventListener();
  };
}
