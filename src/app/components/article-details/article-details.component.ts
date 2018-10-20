import { Component, OnInit } from "@angular/core";
import { ArticlesService } from "../../services/article/articles.service";
import { Article } from "../../models/article";
import { SharedService } from "../../services/shared/shared.service";
import { CommentsService } from "../../services/comments/comments.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-article-details",
  templateUrl: "./article-details.component.html",
  styleUrls: ["./article-details.component.scss"]
})
export class ArticleDetailsComponent implements OnInit {
  currentArticle: Article;
  canModify: boolean;
  currentUser: any;
  comments: any;
  auth: boolean;
  newComment: string;
  constructor(
    private articleService: ArticlesService,
    private sharedService: SharedService,
    private commentService: CommentsService,
    public router: Router
  ) {
    this.currentArticle = this.articleService.currentArticle;
  }

  ngOnInit() {
    this.authorize();
    this.canUserModify();
    this.getComments();
  }

  authorize() {
    this.sharedService.currentAuth.subscribe(auth => (this.auth = auth));
  }

  canUserModify() {
    this.sharedService.currentUser.subscribe(
      userData => (this.currentUser = userData)
    );
    this.canModify =
      this.currentUser.username === this.currentArticle.author.username
        ? true
        : false;
  }

  favouriteArticle() {
    if (this.auth) {
      if (!this.currentArticle.favorited) {
        this.articleService
          .favouriteArticle(this.currentArticle.slug)
          .subscribe(item => {
            this.currentArticle = item.article;

            console.log(this.currentArticle);
          });
      } else {
        this.articleService
          .unfavouriteArticle(this.currentArticle.slug)
          .subscribe(item => {
            this.currentArticle = item.article;
            console.log(this.currentArticle);
          });
      }
    } else {
      window.alert("Sign In for this action");
    }
  }

  addComment(comment) {
    this.newComment = comment;

    this.commentService
      .addComment(this.currentArticle.slug, this.newComment)
      .subscribe(item => {
        this.comments.unshift(item.comment);
      });
  }

  getComments() {
    this.commentService
      .getComments(this.currentArticle.slug)
      .subscribe(item => {
        this.comments = item["comments"];
      });
  }

  deleteComment(comment: any) {
    this.commentService
      .deleteComment(this.currentArticle.slug, comment.id)
      .subscribe(item => {
        this.comments = this.comments.filter(item => item !== comment);
      });
  }

  getArticleBySlug() {
    this.articleService
      .getArticleBySlug(this.currentArticle.slug)
      .subscribe(item => (this.currentArticle = item));
  }

  deleteArticle() {
    this.articleService.delete(this.currentArticle.slug).subscribe(item => {
      console.log("Article deleted");
      this.router.navigate([""]);
    });
  }
}
