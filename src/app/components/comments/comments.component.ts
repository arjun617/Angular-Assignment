import { Component, OnInit, Input, EventEmitter, Output } from "@angular/core";
import { SharedService } from "../../services/shared/shared.service";

@Component({
  selector: "app-comments",
  templateUrl: "./comments.component.html",
  styleUrls: ["./comments.component.scss"]
})
export class CommentsComponent implements OnInit {
  @Input()
  comment: any;

  @Output()
  commentDelete = new EventEmitter();

  auth: boolean;
  canModify: boolean;
  currentUser: any;
  constructor(private sharedService: SharedService) {}

  ngOnInit() {
    this.sharedService.currentUser.subscribe(user => (this.currentUser = user));

    this.canUserModify();
  }

  canUserModify() {
    this.canModify =
      this.currentUser["username"] === this.comment.author.username
        ? true
        : false;
  }

  deleteComment(comment: any) {
    this.commentDelete.emit(comment);
  }
}
