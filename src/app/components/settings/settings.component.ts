import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

import { SharedService } from "../../services/shared/shared.service";

@Component({
  selector: "app-settings",
  templateUrl: "./settings.component.html",
  styleUrls: ["./settings.component.scss"]
})
export class SettingsComponent implements OnInit {
  auth: boolean;
  currentUser: any;
  constructor(private router: Router, private sharedService: SharedService) {}

  ngOnInit() {
    this.sharedService.currentAuth.subscribe(auth => (this.auth = auth));
    this.sharedService.currentUser.subscribe(user => (this.currentUser = user));
  }

  logout() {
    window.localStorage.removeItem("jwtToken");
    this.sharedService.changeAuth(false);
    this.sharedService.changeUser(null);
    this.router.navigateByUrl("");
  }
}
