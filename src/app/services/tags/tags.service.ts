import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class TagsService {
  private tagsUrl = "https://conduit.productionready.io/api/tags";

  constructor(private http: HttpClient) {}

  getTags(): Observable<any> {
    return this.http.get<any[]>(this.tagsUrl);
  }
}
