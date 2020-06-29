import { Component, OnInit, Input } from '@angular/core';
import { User } from '../model/User';
import { AuthenticationService } from '../authentication.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  username ='';
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) { }

  ngOnInit() {
    this.username=this.authenticationService.getLoggedInUserName();
  }

  logout(){
    this.authenticationService.logout();
    this.router.navigate(['']);

  }

}
