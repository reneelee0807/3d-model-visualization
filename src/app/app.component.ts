import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { AuthenticationService } from "./services/authentication.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {
  public isAuth: boolean = false;

  private ngUnSubscribe$ = new Subject();

  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) {}

  ngOnInit() {
    this.checkAuthValue();
  }

  ngOnDestroy() {
    this.ngUnSubscribe$.next();
    this.ngUnSubscribe$.complete();
  }

  public logout() {
    this.authService.logout();
    this.router.navigate(["/login"]);
  }

  private checkAuthValue() {
    this.authService.currentUserName$
      .pipe(takeUntil(this.ngUnSubscribe$))
      .subscribe((userName) => (this.isAuth = !!userName));
  }
}
