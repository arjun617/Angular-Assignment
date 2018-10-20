import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { Router } from "@angular/router";
import { SharedService } from "../../services/shared/shared.service";

import { UserService } from "../../services/user/user-service.service";
import { of } from "rxjs";
import { catchError } from "rxjs/operators";

@Component({
  selector: "app-signin",
  templateUrl: "./signin.component.html",
  styleUrls: ["./signin.component.css"]
})
export class SigninComponent implements OnInit {
  user: any;
  auth: boolean;

  constructor(
    private userService: UserService,
    private router: Router,
    private sharedService: SharedService
  ) {
    this.user = {};
  }

  ngOnInit() {
    this.sharedService.currentAuth.subscribe(auth => (this.auth = auth));
  }

  setToken(token: string) {
    window.localStorage.removeItem("jwtToken");
    window.localStorage.setItem("jwtToken", token);

    this.router.navigate([""]);
  }

  login(): void {
    if (!this.user.email || !this.user.password) {
      window.alert("All fields compulsory");
    } else {
      this.user.email = this.user.email.trim();
      this.user.password = this.user.password.trim();
      this.userService.login(this.user).subscribe(
        userData => {
          this.sharedService.changeAuth(true);
          this.sharedService.changeUser(userData.user);
          this.setToken(userData.user.token);
        },
        err => window.alert("Invalid Credentials")
      );
    }
  }
}
