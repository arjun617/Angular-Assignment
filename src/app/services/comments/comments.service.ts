import { Injectable } from "@angular/core";
import { Comment } from "../../models/comment";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class CommentsService {
  constructor(private http: HttpClient) {}

  private commentUrl = "https://conduit.productionready.io/api/articles";

  getComments(slug: string): Observable<any> {
    return this.http.get<any>(`${this.commentUrl}/${slug}/comments`);
  }

  addComment(slug: string, comment: any): Observable<any> {
    let token = window.localStorage.getItem("jwtToken");
    let httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Authorization: "Token " + token
      })
    };
    return this.http.post<any>(
      `${this.commentUrl}/${slug}/comments`,
      { comment: { body: comment } },
      httpOptions
    );
  }

  deleteComment(slug: string, id: number) {
    let token = window.localStorage.getItem("jwtToken");
    let httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Authorization: "Token " + token
      })
    };
    return this.http.delete(
      `${this.commentUrl}/${slug}/comments/${id}`,
      httpOptions
    );
  }
}
