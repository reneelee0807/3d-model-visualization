import { Injectable } from "@angular/core";
import * as THREE from "three";
import { CSS2DObject } from "three/examples/jsm/renderers/CSS2DRenderer";

const LabelScaleSize = {
  x: 0.4,
  y: 0.2,
  z: 1,
};

@Injectable({
  providedIn: "root",
})
export class LabelTextureService {
  public getLabelTexture(text: string): THREE.Texture {
    const canvas = document.createElement("canvas");
    canvas.width = 400;
    canvas.height = 200;

    const context = canvas.getContext("2d") as CanvasRenderingContext2D;
    context.textBaseline = "middle";
    context.textAlign = "center";
    context.shadowColor = "#0073a8";
    context.shadowBlur = 3;
    context.lineWidth = 3;

    context.fillStyle = "#fff";
    context.font = '32px "Futura LT Medium", "Trebuchet MS", Arial, sans-serif';
    context.strokeText(text, 200, 100);
    context.fillText(text, 200, 100);

    const texture = new THREE.Texture(canvas);
    texture.needsUpdate = true;
    return texture;
  }

  public getLabelSprite(texture: THREE.Texture): THREE.Sprite {
    const labelSpriteMaterial = this.getLabelSpriteMaterial(texture);
    const sprite = new THREE.Sprite(labelSpriteMaterial);
    sprite.scale.set(LabelScaleSize.x, LabelScaleSize.y, LabelScaleSize.z);
    sprite.renderOrder = 2;
    return sprite;
  }

  private getLabelSpriteMaterial(texture: THREE.Texture): THREE.SpriteMaterial {
    return new THREE.SpriteMaterial({
      map: texture,
      transparent: true,
      sizeAttenuation: false,
      color: 0xffffff,
      depthTest: false,
    });
  }

  public getHTMLLabel(
    intersect: THREE.Intersection,
  ): CSS2DObject {
    document.body.style.cursor = "pointer";
    const div = document.createElement("div");
    div.className = "label";
    div.innerHTML = intersect.object.userData.name;
    const label = new CSS2DObject(div);
    return label;
  }
}
