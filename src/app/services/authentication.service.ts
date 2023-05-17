import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, of, BehaviorSubject } from "rxjs";
import { startWith, map } from "rxjs/operators";

const SessionItemName = "currentUserName";

@Injectable({ providedIn: "root" })
export class AuthenticationService {
  public currentUserName$ = new BehaviorSubject("");

  constructor(private http: HttpClient) {}

  public isAuthenticated(): boolean {
    const userName = sessionStorage.getItem(SessionItemName);
    this.currentUserName$.next(userName || "");
    return !!userName;
  }

  public login(username: string, password: string): Observable<boolean> {
    const authericationResult$ = this.authenticateUser(username, password);
    return authericationResult$.pipe(
      startWith(true),
      map((result) => {
        if (result) {
          this.currentUserName$.next(username);
          sessionStorage.setItem(SessionItemName, username);
        }
        return result;
      })
    );
  }

  public logout() {
    sessionStorage.removeItem(SessionItemName);
  }

  private authenticateUser(
    username: string,
    password: string
  ): Observable<boolean> {
    const url = "user/authenticate";
    const body = { username, password };
    return this.http.post<boolean>(url, body);
  }
}
