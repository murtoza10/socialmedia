import { User } from './../model/User';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  user: User;
  email='';
  password = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService) { 

    }

  ngOnInit() {
    //this.user=this.authenticationService.user;
    
    this.authenticationService.getUser(this.authenticationService.token).subscribe(res=>{
      this.user= this.authenticationService.user;
      console.log("home "+this.user.name);
    });
  }



}
