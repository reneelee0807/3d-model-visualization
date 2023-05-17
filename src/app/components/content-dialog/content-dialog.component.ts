import { Component } from "@angular/core";
import { BsModalRef } from "ngx-bootstrap/modal";
import { Media } from "src/app/type/media";

@Component({
  selector: "ts-content-dialog",
  templateUrl: "./content-dialog.component.html",
  styleUrls: ["./content-dialog.component.scss"],
})
export class ContentDialogComponent {
  public items: Media[];
  public displayAsList: boolean = true;
  public title: string;
  public selectedItem: Media;
  public displayFullScreenImage: boolean = false;
  public isZoomInMode: boolean = false;

  constructor(public modalRef: BsModalRef) {}

  ngOnInit() {}

  public setSelectedItem(item: Media) {
    this.selectedItem = item;
  }

  public expandImage() {
    const model = document.getElementById("modal-dialog");
    console.log(model)
    if (model) {
      model.style.visibility = "hidden";
      this.displayFullScreenImage = true;
    }
  }

  public compressImage() {
    const model = document.getElementById("modal-dialog");
    if (model) {
      model.style.visibility = "visible";
      this.displayFullScreenImage = false;
      this.isZoomInMode = false;
    }
  }
}