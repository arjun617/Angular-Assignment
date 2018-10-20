import { Component, OnInit } from "@angular/core";

import { TagsService } from "../../services/tags/tags.service";
import { SharedService } from "../../services/shared/shared.service";
import { ArticlesService } from "../../services/article/articles.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"]
})
export class HomeComponent implements OnInit {
  auth: boolean;
  allArticles: any;
  articles: any;
  tags: any;
  tagName: string;
  constructor(
    private tagsService: TagsService,
    private sharedService: SharedService,
    private articleService: ArticlesService
  ) {
    this.tags = [];
  }

  ngOnInit() {
    this.getTags();
    this.sharedService.currentAuth.subscribe(auth => (this.auth = auth));
    this.articleService.getArticles().subscribe(items => {
      this.allArticles = items;
      this.allArticles = this.allArticles.articles;
      this.articles = this.allArticles;
    });

    console.log(this.auth);
  }

  getTags(): void {
    this.tagsService.getTags().subscribe(tagsData => {
      this.tags.push(tagsData.tags);
    });
  }

  getAllArticles() {
    this.articles = this.allArticles;
  }

  displaytagName(tag) {
    this.tagName = tag;

    this.articleService
      .getArticlesByTag(tag)
      .subscribe(item => (this.articles = item.articles));
  }
}
