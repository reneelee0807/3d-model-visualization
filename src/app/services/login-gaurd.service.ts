import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { AuthenticationService } from "./authentication.service";

@Injectable({
  providedIn: "root",
})
export class LoginGuard implements CanActivate {
  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) {}

  canActivate() {
    if (!this.authService.isAuthenticated()) {
      return true;
    }

    this.router.navigate(["/home"]);
    return false;
  }
}
