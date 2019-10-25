import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { StartComponent } from './pages/start/start.component';
import { BlogComponent } from './pages/blog/blog.component';
import { AboutComponent } from './pages/about/about.component';
import { LoginComponent } from './pages/login/login.component';
import { TryComponent } from './pages/try/try.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { AdminComponent } from './admin/admin/admin.component';
import { AdminCategoryComponent } from './admin/admin-category/admin-category.component';
import { AdminPostsComponent } from './admin/admin-posts/admin-posts.component';
import { RunningComponent } from './pages/blog/running/running.component';





const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'try', component: TryComponent },
  { path: 'start', component: StartComponent },
  { path: 'blog', component: BlogComponent },
  {path: 'blog/:id', component: RunningComponent},
  { path: 'about', component: AboutComponent },
  { path: 'login', component: LoginComponent },
  { path: 'profile', component: ProfileComponent },
  {path: 'admin', component: AdminComponent, children: [
    {path: '', redirectTo: 'category', pathMatch: 'full'},
    {path: 'category', component: AdminCategoryComponent},
    {path: 'posts', component: AdminPostsComponent},
  ]},
  { path: '**', redirectTo: 'home'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
