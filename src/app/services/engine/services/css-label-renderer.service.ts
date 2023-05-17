import { Injectable } from "@angular/core";
import { CSS2DRenderer } from "three/examples/jsm/renderers/CSS2DRenderer";

@Injectable({
  providedIn: "root",
})
export class CSSLabelRendererService {
  public CSSLabelRenderer: CSS2DRenderer;

  public setCSSLabelRenderer() {
    this.CSSLabelRenderer = new CSS2DRenderer();
    this.CSSLabelRenderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(this.CSSLabelRenderer.domElement);
  }
}
