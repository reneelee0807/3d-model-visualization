import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import {  Subject } from 'rxjs';
import { MenuItems } from 'src/app/data/menu/menu';
import { Stages } from 'src/app/data/stages';
import { EngineService } from 'src/app/services/engine/services/engine.service';
import { PanToLocationService } from 'src/app/services/engine/services/pan-to-location.service';
import { Stage } from 'src/app/type/3d-model';
import { FeatureMenu } from 'src/app/type/feature-sub-menu.model';
import { Animation } from 'src/app/services/animations.service';

@Component({
  selector: 'ts-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss'],
  animations: [Animation.sideMenuSlide],
})
export class SideMenuComponent implements OnInit {
  public sideMenuTransitioning: boolean;
  public allStages: Stage[];
  public menuItems: FeatureMenu[];

  private ngUnsubscribe = new Subject();

  constructor(
    private engServ: EngineService,
    private ref: ChangeDetectorRef,
    private panLocationService: PanToLocationService
  ) {}

  ngOnInit() {
    this.allStages = [...Stages];
    this.menuItems = [...MenuItems];
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  onClickMenu(item: FeatureMenu) {
    item.isActive = !item.isActive;
    // this.toggleSplineToTerrain(item);
    this.engServ.toggleMarkersToTerrain(item);
    this.toggleModal(item);
  }

  //   private toggleSplineToTerrain(subMenu: FeatureSubMenu) {
  //     if (subMenu.splines?.length) {
  //       this.engServ.toggleSplineToTerrain(subMenu);
  //     }
  //   }

  private toggleModal(subMenu: FeatureMenu) {
    // if (subMenu.modalContent) {
    //   this.engServ.toggleModal(subMenu);
    // }
  }

  public onPanToLocation(selectedSubMenu: FeatureMenu, event: any) {
    if (selectedSubMenu.panToLocation) {
      this.panLocationService.centerAndPanToTargetLocation(
        selectedSubMenu.panToLocation.cameraPosition,
        selectedSubMenu.panToLocation.controlTarget
      );
    }

    event.stopPropagation();
  }

  public selectStage(stage: Stage) {
    console.log(stage)
    console.log(this.allStages)

    this.allStages.forEach(stage =>{
      stage.isActive = !stage.isActive
      this.engServ.toggleStage(stage)
    })
  }
}
