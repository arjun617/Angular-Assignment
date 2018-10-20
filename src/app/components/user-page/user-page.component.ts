import { Component, OnInit } from "@angular/core";
import { SharedService } from "../../services/shared/shared.service";
import { ArticlesService } from "../../services/article/articles.service";

@Component({
  selector: "app-user-page",
  templateUrl: "./user-page.component.html",
  styleUrls: ["./user-page.component.scss"]
})
export class UserPageComponent implements OnInit {
  currentUser: any;
  articles: any;
  constructor(
    private sharedService: SharedService,
    private articleService: ArticlesService
  ) {}

  ngOnInit() {
    this.sharedService.currentUser.subscribe(item => (this.currentUser = item));
    this.articleService
      .getArticlesByAuthor(this.currentUser.username)
      .subscribe(item => (this.articles = item.articles));
  }
}
