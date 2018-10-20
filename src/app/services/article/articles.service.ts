import { Injectable, OnInit } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { Article } from "../../models/article";

@Injectable({
  providedIn: "root"
})
export class ArticlesService implements OnInit {
  private articlesUrl = "https://conduit.productionready.io/api/articles";
  currentArticle: Article;
  constructor(private http: HttpClient) {}

  ngOnInit() {}

  getArticles(): Observable<Article[]> {
    return this.http.get<Article[]>(`${this.articlesUrl}?limit=100`);
  }

  submit(article: Article): Observable<any> {
    let token = window.localStorage.getItem("jwtToken");
    let httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Authorization: "Token " + token
      })
    };
    console.log(httpOptions.headers.get("Authorization"));
    return this.http.post<Article>(
      this.articlesUrl,
      { article: article },
      httpOptions
    );
  }

  update(article: Article): Observable<any> {
    let token = window.localStorage.getItem("jwtToken");
    let httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Authorization: "Token " + token
      })
    };
    return this.http.put<Article>(
      `${this.articlesUrl}/${article.slug}`,
      { article: article },
      httpOptions
    );
  }

  setCurrentArticle(article: Article) {
    this.currentArticle = article;
  }

  favouriteArticle(slug: any): Observable<any> {
    let token = window.localStorage.getItem("jwtToken");
    let httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Authorization: "Token " + token
      })
    };
    return this.http.post<any>(
      `${this.articlesUrl}/${slug}/favorite`,
      {},
      httpOptions
    );
  }

  unfavouriteArticle(slug: any): Observable<any> {
    let token = window.localStorage.getItem("jwtToken");
    let httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Authorization: "Token " + token
      })
    };
    return this.http.delete<any>(
      `${this.articlesUrl}/${slug}/favorite`,
      httpOptions
    );
  }

  getArticleBySlug(slug: any): Observable<Article> {
    return this.http.get<Article>(`${this.articlesUrl}/${slug}`);
  }

  getArticlesByTag(tag: any): Observable<any> {
    return this.http.get<any>(`${this.articlesUrl}?tag=${tag}`);
  }
  delete(slug: any): Observable<any> {
    let token = window.localStorage.getItem("jwtToken");
    let httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Authorization: "Token " + token
      })
    };
    return this.http.delete(`${this.articlesUrl}/${slug}`, httpOptions);
  }

  getArticlesByAuthor(author: any): Observable<any> {
    return this.http.get<any>(`${this.articlesUrl}?author=${author}`);
  }
}
