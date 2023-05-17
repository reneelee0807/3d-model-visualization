import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AppComponent } from "./app.component";
import { MatMenuModule } from "@angular/material/menu";
import { HomeComponent } from "./page/home/home.component";
import { appRoutingModule } from "./app.routing";
import { HttpClientModule } from "@angular/common/http";
import { MatButtonToggleModule } from "@angular/material/button-toggle";
import { MatDialogModule } from "@angular/material/dialog";
import { LoginComponent } from "./page/login/login.component";
import { ComponentsModule } from "./components/components.module";

@NgModule({
  declarations: [AppComponent, LoginComponent, HomeComponent],
  imports: [
    BrowserModule,
    appRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatButtonToggleModule,
    MatDialogModule,
    BrowserAnimationsModule,
    ComponentsModule,
    MatMenuModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
