import { NgModule } from "@angular/core";
import { RouterModule, Routes, CanActivate } from "@angular/router";
import { SigninComponent } from "../components/signin/signin.component";
import { SignupComponent } from "../components/signup/signup.component";
import { HomeComponent } from "../components/home/home.component";
import { NewArticleComponent } from "../components/new-article/new-article.component";
import { SettingsComponent } from "../components/settings/settings.component";
import { ArticleComponent } from "../components/article/article.component";
import { AuthGuard } from "../services/auth/auth.guard";
import { ArticleDetailsComponent } from "../components/article-details/article-details.component";
import { UserPageComponent } from "../components/user-page/user-page.component";

const routes: Routes = [
  {
    path: "",
    component: HomeComponent
  },
  { path: "signin", component: SigninComponent },
  { path: "signup", component: SignupComponent },
  {
    path: "newArticle",
    component: NewArticleComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "newArticle/:slug",
    component: NewArticleComponent,
    canActivate: [AuthGuard]
  },
  { path: "settings", component: SettingsComponent, canActivate: [AuthGuard] },
  { path: "articles", component: ArticleComponent },
  { path: "articles/:tag", component: ArticleComponent },
  { path: "articleDetails", component: ArticleDetailsComponent },
  { path: "articleDetails/:slug", component: ArticleDetailsComponent },
  { path: "userPage", component: UserPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
  // providers: [AuthGuard]
})
export class AppRoutingModule {}
