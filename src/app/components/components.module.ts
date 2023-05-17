import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompassComponent } from './compass/compass.component';
import { EngineComponent } from './engine/engine.component';
import { LoaderComponent } from './loader/loader.component';
import { ContentDialogComponent } from './content-dialog/content-dialog.component';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
import { ModalModule } from 'ngx-bootstrap/modal';
import { SideMenuComponent } from './side-menu/side-menu.component';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { PinchZoomModule } from "ngx-pinch-zoom";

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true,
};

@NgModule({
  declarations: [
    LoaderComponent,
    CompassComponent,
    EngineComponent,
    ContentDialogComponent,
    SideMenuComponent,
  ],
  exports: [
    LoaderComponent,
    CompassComponent,
    EngineComponent,
    ContentDialogComponent,
    SideMenuComponent,
  ],
  imports: [
    CommonModule,
    NgxExtendedPdfViewerModule,
    ModalModule.forRoot(),
    PerfectScrollbarModule,
    PinchZoomModule,
  ],
  providers: [
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG,
    },
  ],
})
export class ComponentsModule {}