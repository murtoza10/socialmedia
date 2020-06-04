import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiResponse } from './model/ApiResponse';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  BASE_PATH = 'http://localhost:9090';
  public apiResponse: ApiResponse;
  
  constructor(private http: HttpClient) {

  }

  Signup(userinfo) {
    return this.http.post(`${this.BASE_PATH}/auth/signup`, userinfo
    ).pipe(map((res: ApiResponse) => {
      console.log(res);
      this.apiResponse = res;
    }));
    
  }
}
