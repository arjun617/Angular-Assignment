import { Component, OnInit, Input } from "@angular/core";
import { ArticlesService } from "../../services/article/articles.service";
import { Article } from "../../models/article";

@Component({
  selector: "app-article",
  templateUrl: "./article.component.html",
  styleUrls: ["./article.component.scss"]
})
export class ArticleComponent implements OnInit {
  @Input()
  articles: any;
  p: number = 1;
  constructor(private articleService: ArticlesService) {}

  ngOnInit() {}

  setCurrentArticle(article: Article) {
    this.articleService.setCurrentArticle(article);
  }
}
