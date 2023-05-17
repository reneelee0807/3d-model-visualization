import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { EngineService } from "src/app/services/engine/services/engine.service";
import { LoaderService } from "src/app/services/engine/services/loader.service";

@Component({
  selector: "ts-engine",
  templateUrl: "./engine.component.html",
  styleUrls: ["./engine.component.scss"],
})
export class EngineComponent implements OnInit {
  @ViewChild("rendererCanvas", { static: true })
  public rendererCanvas: ElementRef<HTMLCanvasElement>;

  public isModelLoading$: BehaviorSubject<boolean>;

  public constructor(
    private engServ: EngineService,
    private loaderService: LoaderService
  ) {
    this.isModelLoading$ = this.loaderService.isModelLoading$;
  }

  public async ngOnInit() {
    this.engServ.createScene(this.rendererCanvas);
    this.engServ.animate();
  }
}
