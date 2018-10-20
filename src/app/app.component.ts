import { Component, OnInit } from "@angular/core";
import { SharedService } from "../app/services/shared/shared.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  title = "conduit-assgn1";
  auth: boolean;

  constructor(private sharedService: SharedService) {}

  ngOnInit() {
    this.sharedService.currentUser.subscribe(
      item => (window.localStorage["jwtToken"] = item.token)
    );
    this.auth = window.localStorage["jwtToken"] == undefined ? false : true;
    this.sharedService.currentAuth.subscribe(auth => (this.auth = auth));
  }
}
