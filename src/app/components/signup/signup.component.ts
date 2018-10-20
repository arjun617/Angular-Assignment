import { Component, OnInit } from "@angular/core";
import { UserService } from "../../services/user/user-service.service";
import { Router } from "@angular/router";

@Component({
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.css"]
})
export class SignupComponent implements OnInit {
  users: any[];
  user: any;
  constructor(private userService: UserService, private router: Router) {
    this.users = [];
    this.user = {};
  }

  ngOnInit() {}

  register(): void {
    if (!this.user.email || !this.user.password || !this.user.username) {
      window.alert("All fields compulsory");
    } else {
      this.user.username = this.user.username.trim();
      this.user.password = this.user.password.trim();
      this.user.email = this.user.email.trim();
      this.userService.register(this.user).subscribe(
        user => {
          this.users.push(user);
          this.router.navigate(["signin"]);
        },
        err => window.alert("Error! Please Try again")
      );
    }
  }
}
