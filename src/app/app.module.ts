import { BrowserModule } from "@angular/platform-browser";
import { NgModule, OnInit } from "@angular/core";
import { AppRoutingModule } from "./app-routing/app-routing.module";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { NgxPaginationModule } from "ngx-pagination";
import { AuthGuard } from "../app/services/auth/auth.guard";

import { AppComponent } from "./app.component";
import { FooterComponent } from "./components/footer/footer.component";
import { HeaderComponent } from "./components/header/header.component";
import { SigninComponent } from "./components/signin/signin.component";
import { SignupComponent } from "./components/signup/signup.component";
import { HomeComponent } from "./components/home/home.component";
import { TestComponent } from "./test/test.component";
import { NewArticleComponent } from "./components/new-article/new-article.component";
import { SettingsComponent } from "./components/settings/settings.component";
import { ArticleComponent } from "./components/article/article.component";
import { ArticleDetailsComponent } from "./components/article-details/article-details.component";
import { CommentsComponent } from "./components/comments/comments.component";
import { UserPageComponent } from "./components/user-page/user-page.component";

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    SigninComponent,
    SignupComponent,
    HomeComponent,
    TestComponent,
    NewArticleComponent,
    SettingsComponent,
    ArticleComponent,
    ArticleDetailsComponent,
    CommentsComponent,
    UserPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgxPaginationModule
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule {}
