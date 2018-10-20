import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";

import { Register } from "../../models/register";
import { Observable } from "rxjs";

const httpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json" })
};
@Injectable({
  providedIn: "root"
})
export class UserService {
  private usersUrl = "https://conduit.productionready.io/api/";

  constructor(private http: HttpClient) {}

  currentUser: Observable<Object>;

  register(cred: Register): Observable<any> {
    return this.http.post<Register>(
      `${this.usersUrl}users`,
      { user: cred },
      httpOptions
    );
  }

  userLoggedIn() {
    const token = window.localStorage.getItem("jwtToken");
    if (token != undefined) return true;
    return false;
  }

  login(cred: Register): Observable<any> {
    return this.http.post<Register>(
      `${this.usersUrl}users/login`,
      { user: cred },
      httpOptions
    );
  }
}
