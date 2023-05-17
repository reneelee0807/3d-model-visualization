import { Component, ElementRef, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';
import { EngineService } from 'src/app/services/engine/services/engine.service';

@Component({
  selector: 'ts-compass',
  templateUrl: './compass.component.html',
  styleUrls: ['./compass.component.scss'],
})
export class CompassComponent implements OnInit {
  subscription: Subscription;

  constructor(public element: ElementRef, private engineSrv: EngineService) {}

  ngOnInit(): void {
    this.subscription = this.engineSrv.rotation.subscribe((rotate) => {
      this.element.nativeElement.style.transform = `rotate(${rotate}deg)`;
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
