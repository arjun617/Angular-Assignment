import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Register } from "src/app/models/register";

@Injectable({
  providedIn: "root"
})
export class SharedService {
  private authsource = new BehaviorSubject(false);
  currentAuth = this.authsource.asObservable();

  private usersource = new BehaviorSubject({} as Register);
  currentUser = this.usersource.asObservable();

  constructor() {}

  changeAuth(auth: boolean) {
    this.authsource.next(auth);
  }

  changeUser(user: Register) {
    this.usersource.next(user);
  }
}
