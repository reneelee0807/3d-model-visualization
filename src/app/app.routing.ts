import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "./page/home/home.component";
import { LoginComponent } from "./page/login/login.component";

import { AuthGuard } from "./services/auth-gaurd.service";
import { LoginGuard } from "./services/login-gaurd.service";

const routes: Routes = [
  { path: "", redirectTo: "login", pathMatch: "full" },
  { path: "login", component: LoginComponent, canActivate: [LoginGuard] },
  { path: "home", component: HomeComponent, canActivate: [AuthGuard] },
  {
    path: ":parentPageSlug",
    component: HomeComponent,
    data: { animation: "app" },
  },
  {
    path: ":parentPageSlug/:childPageSlug",
    component: HomeComponent,
    data: { animation: "app" },
  },

  {
    path: "**",
    redirectTo: "login",
    pathMatch: "full",
  },
];

export const appRoutingModule = RouterModule.forRoot(routes);
