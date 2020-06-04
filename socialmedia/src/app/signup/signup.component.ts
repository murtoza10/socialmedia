import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  userinfo ={};
  constructor(private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService) { }

  ngOnInit() {
  }

  save(userinfo){
    console.log(userinfo);
    this.authenticationService.Signup(userinfo).subscribe((res) =>{
      if(this.authenticationService.apiResponse.success)  this.router.navigate(['login']);
      else console.log("User already exists");
    });

    
  }

}
