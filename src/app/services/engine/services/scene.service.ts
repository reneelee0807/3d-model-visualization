import { Injectable } from "@angular/core";
import * as THREE from "three";

@Injectable({
  providedIn: "root",
})
export class SceneService {
  public scene: THREE.Scene;

  public createScene() {
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0xcce0ff);
    this.scene.fog = new THREE.Fog(this.scene.background, 1, 35000);
    this.setSceneLightings();
  }

  private setSceneLightings() {
    const hemisphereLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 1);
    this.scene.add(hemisphereLight);
    const ambient = new THREE.AmbientLight(0xffffff, 0);
    this.scene.add(ambient);
  }
}
