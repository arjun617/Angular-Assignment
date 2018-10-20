import { Component, OnInit } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { ArticlesService } from "../../services/article/articles.service";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-new-article",
  templateUrl: "./new-article.component.html",
  styleUrls: ["./new-article.component.scss"]
})
export class NewArticleComponent implements OnInit {
  article: any;
  tag: string;
  slug: any;
  constructor(
    private articlesService: ArticlesService,
    public router: Router,
    private route: ActivatedRoute
  ) {
    this.route.queryParams.subscribe(params => (this.slug = params["slug"]));
    this.article = {};
    this.article.tagList = [];
    if (this.slug != undefined) {
      this.articlesService
        .getArticleBySlug(this.slug)
        .subscribe(articleData => {
          this.article = articleData["article"];
        });
    }
  }

  ngOnInit() {}
  addTag() {
    this.article.tagList.push(this.tag);
  }

  removeTag(tag: string) {
    this.article.tagList = this.article.tagList.filter(item => item != tag);
  }

  submitForm() {
    console.log("Before");
    console.log(window.localStorage.getItem("jwtToken"));
    if (this.slug == undefined) {
      this.articlesService.submit(this.article).subscribe(item => {
        this.router.navigate([""]);
      });
    } else {
      this.articlesService.update(this.article).subscribe(item => {
        this.router.navigate([""]);
      });
    }
  }
}
