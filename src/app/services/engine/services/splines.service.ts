// import { Injectable } from '@angular/core';
// import { MeshLine, MeshLineMaterial } from 'three.meshline';
// import * as THREE from 'three';
// import { SceneService } from './scene.service';
// import { fixedVertexShader } from '../models/meshlineHotFix';
// import { Position, SplinesData } from '../type/spline';

// const SplinesSuffix = '-splinesGroup';

// @Injectable({
//   providedIn: 'root',
// })
// export class SplinesService {
//   constructor(private sceneService: SceneService) {}

//   public addPageSplinesToTerrain(page: any) {
//     const splineGroup = this.getSplineGroup(page);
//     page.splines.map((spline: any) =>
//       this.addSplinesToGroup(splineGroup, spline, page.color)
//     );
//     this.sceneService.scene.add(splineGroup);
//   }

//   private addSplinesToGroup(
//     group: THREE.Group,
//     splines: SplinesData,
//     color: string
//   ) {
//     splines.data.forEach((positions) => {
//       const material = this.getSplineLineMaterial(color, splines.lineWidth);
//       material.color.convertSRGBToLinear();
//       material.vertexShader = fixedVertexShader;

//       const linePositions = this.getLinePositions(positions);
//       const line = new MeshLine();
//       line.setPoints(linePositions);

//       const overlaysGroup = this.getLineMesh(line, material);
//       group.add(overlaysGroup);
//     });
//     return group;
//   }

//   private getGroupName(groupSlug: string) {
//     return `${groupSlug}${SplinesSuffix}`;
//   }

//   private getSplineGroup(page: any): THREE.Group {
//     const group = new THREE.Group();
//     group.name = this.getGroupName(page.slug);
//     return group;
//   }

//   private getSplineLineMaterial(
//     color: string,
//     lineWidth: number
//   ): MeshLineMaterial {
//     return new MeshLineMaterial({
//       color: new THREE.Color(color),
//       lineWidth: lineWidth || 10,
//       dashArray: 0,
//       sizeAttenuation: false,
//       depthTest: false,
//       resolution: new THREE.Vector2(window.innerWidth, window.innerHeight),
//     });
//   }

//   private getLinePositions(positions: Position[]): THREE.Vector3[] {
//     return positions.map((element) => {
//       const [x, y, z] = element;
//       return new THREE.Vector3(x, -y, z);
//     });
//   }

//   private getLineMesh(line: MeshLine, material: MeshLineMaterial): THREE.Mesh {
//     const overlaysGroup = new THREE.Mesh(line, material);
//     const axis = new THREE.Vector3(1, 0, 0).normalize();
//     overlaysGroup.rotateOnAxis(axis, Math.PI);
//     overlaysGroup.renderOrder = 999;
//     overlaysGroup.onBeforeRender = (renderer) => {
//       renderer.clearDepth();
//     };
//     return overlaysGroup;
//   }

//   public removeSplinesFromTerrain(groupSlug: string) {
//     const groupName = this.getGroupName(groupSlug);
//     const group = this.sceneService.scene.getObjectByName(groupName);
//     if (group) {
//       this.sceneService.scene.remove(group);
//     }
//   }
// }
