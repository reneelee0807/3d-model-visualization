import { Injectable } from "@angular/core";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";
import * as THREE from "three";
import { GLTF, GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { SceneService } from "./scene.service";
import { BehaviorSubject, Subject } from "rxjs";
import { Terrain } from "src/app/type/3d-model";
import { InitialTerrains, ProposeTerrains } from "src/app/data/stages";

const DefaultFilePath = "assets/terrains/";

@Injectable({
  providedIn: "root",
})
export class LoaderService {
  public loadManager: THREE.LoadingManager;
  public loader: GLTFLoader;
  public isModelLoading$ = new BehaviorSubject(true);
  public progressLoader = new Subject<number>();

  private outerTerrains: Terrain[] = InitialTerrains;

  constructor(private sceneService: SceneService) {}

  public setupLoader(path?: string) {
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath("../assets/draco/");

    this.loadManager = new THREE.LoadingManager();
    this.loader = new GLTFLoader(this.loadManager).setPath(
      path || DefaultFilePath
    );
    this.loader.setDRACOLoader(dracoLoader);
  }

  public loadMineTerrainModel = async () => {
    this.loadTerrains();

    this.loadManager.onLoad = () => {
      this.isModelLoading$.next(false);
    };

    this.loadManager.onProgress = (url, itemsLoaded, itemsTotal) => {
      const progress = itemsLoaded / itemsTotal;
      this.progressLoader.next(progress);
    };
  };

  public loadMesh(meshFileName: string) {
    this.loader.load(meshFileName, (glb) => {
      this.sceneService.scene.add(glb.scene);
      glb.scene.children.forEach((mesh) => (mesh.visible = false));
    });
  }

  private loadTerrains() {
    this.outerTerrains.forEach((terrain) => {
      this.loader.load(terrain.fileName, (glb) => {
        this.addAnisotropy(glb);
        glb.scene.name = terrain.fileName;
        this.hideStageInInitialLoaded(glb.scene, ProposeTerrains);
        this.sceneService.scene.add(glb.scene);
      });
    });
  }

  public toggleStage(terrains: Terrain[], isVisible: boolean) {
    terrains.forEach((terrain) => {
      const foundModel = this.sceneService.scene.getObjectByName(
        terrain.fileName
      );
      if (foundModel) {
        foundModel.visible = isVisible;
      }
    });
  }

  private hideStageInInitialLoaded(group: THREE.Group, terrains: Terrain[]) {
    const stageFileNames = terrains.map((terrain) => terrain.fileName);
    if (stageFileNames.includes(group.name)) {
      group.visible = false;
    }
  }

  private addAnisotropy(glb: GLTF) {
    glb.scene.traverse((object) => {
      if (
        (<THREE.Mesh>object)?.isMesh &&
        (<THREE.MeshStandardMaterial>(<THREE.Mesh>object)?.material)?.map
          ?.anisotropy
      ) {
        // Note: for a multi-material mesh, `object.material` may be an array, in which case you'd need to set `.map` on each value
        // (<any>)object.material
        // .map.anisotropy =
        //   this.rendererService.renderer.capabilities.getMaxAnisotropy();
        // (<THREE.MeshStandardMaterial>(
        //   (<THREE.Mesh>object)?.material
        // ))?.map?.anisotropy =
        //   this.rendererService.renderer.capabilities.getMaxAnisotropy();
      }
    });
  }
}
