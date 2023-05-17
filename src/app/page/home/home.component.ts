import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  TemplateRef,
  AfterViewInit,
} from '@angular/core';
import { MatButtonToggleChange } from '@angular/material/button-toggle';

import { FileCombination, PinAndMediaPath } from '../../type/3d-model';
import * as HomeConstants from './home.constants';
import { MatDialog } from '@angular/material/dialog';
import { EngineService } from 'src/app/services/engine/services/engine.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public selectedStage: string;
  public preMiningStage = HomeConstants.stage.Pre_mining;
  public miningStage = HomeConstants.stage.Mining;
  public videoPath = HomeConstants.mp4Path;

  constructor(public dialog: MatDialog, private engineService: EngineService) {
    this.selectedStage = HomeConstants.stage.Pre_mining;
  }

  ngOnInit(): void {}
}
