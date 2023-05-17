import { Component, OnInit } from '@angular/core';
import { LoaderService } from 'src/app/services/engine/services/loader.service';

@Component({
  selector: 'ts-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss'],
})
export class LoaderComponent implements OnInit {
  constructor(private loaderService: LoaderService) {}

  progress: number;

  ngOnInit(): void {
    this.loaderService.progressLoader.subscribe(
      (progress) => (this.progress = Math.trunc(progress * 100))
    );
  }
}
