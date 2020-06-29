import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignupComponent } from './signup/signup.component';
import { HomeComponent } from './home/home.component';
import { AuthGuardService } from './auth-guard.service';
import { LoggedinAuthGuardService } from './loggedin-auth-guard.service';
import { PostComponent } from './post/post.component';


const routes: Routes = [
  {path: '', component: LoginComponent, canActivate:[LoggedinAuthGuardService]},
  {path: 'login', component: LoginComponent, canActivate:[LoggedinAuthGuardService]},
  {path: 'signup', component: SignupComponent, canActivate:[LoggedinAuthGuardService]},
  {path: 'home', component: HomeComponent, canActivate:[AuthGuardService]},
  {path: 'post/:id', component: PostComponent, canActivate:[AuthGuardService]}

];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
