import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import * as THREE from "three";

@Injectable({
  providedIn: "root",
})
export class RotationService {
  public rotation = new Subject<number>();
  public direction = new THREE.Vector3();

  constructor() {}
}
