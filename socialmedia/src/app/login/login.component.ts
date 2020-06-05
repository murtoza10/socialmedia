import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';
import { JWTToken } from '../model/JWTToken';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user = {};
  email='';
  alert =0;
  token: JWTToken;
  password = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService) { 

    }

  ngOnInit() {
  }

  login(user){
    this.authenticationService.executeJwtAuthenticationService(this.email, this.password).subscribe(res=>{
      this.alert=1;
      this.authenticationService.getUser(res.accessToken).subscribe(res=>{
        this.user=this.authenticationService.user;    
        this.router.navigate(['home']);
      });
      
    }); 
  }

}
