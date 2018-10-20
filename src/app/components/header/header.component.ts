import { Component, OnInit, Input, OnChanges } from "@angular/core";
import { SharedService } from "../../services/shared/shared.service";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"]
})
export class HeaderComponent implements OnInit {
  auth: boolean;
  currentUser: any;
  constructor(private sharedService: SharedService) {}

  ngOnInit() {
    this.sharedService.currentAuth.subscribe(auth => (this.auth = auth));
    this.sharedService.currentUser.subscribe(user => (this.currentUser = user));
  }
}
