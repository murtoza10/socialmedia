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
    console.log(this.email+" "+this.password);
    this.authenticationService.executeJwtAuthenticationService(this.email, this.password).subscribe(res=>{
      console.log(res);
      this.authenticationService.getUser(res.accessToken).subscribe(res=>{
        this.router.navigate(['home']);
      });
      
    }); 
  }

}
