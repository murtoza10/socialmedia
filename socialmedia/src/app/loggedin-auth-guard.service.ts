import { Injectable } from '@angular/core';
import { AuthenticationService } from './authentication.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoggedinAuthGuardService {

  constructor(public auth: AuthenticationService, public router: Router) { }

    canActivate(): boolean {
        if (this.auth.isUserLoggedIn()) {
            this.router.navigate(['home']);
            return false;
        }
        return true;
    }
}
