import { LoginRequest } from './model/LoginRequest';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ApiResponse } from './model/ApiResponse';
import { map } from 'rxjs/operators';
import { JWTToken } from './model/JWTToken';
import { User } from './model/User';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  BASE_PATH = 'http://localhost:9090';
  USER_NAME_SESSION_ATTRIBUTE_NAME = 'authenticatedUser';

  public apiResponse: ApiResponse;
  loginRequest: LoginRequest;
  public token: String;
  public user: User;
  
  constructor(private http: HttpClient) {

  }

  executeJwtAuthenticationService(email, password) {
    console.log(email);
    this.loginRequest={
      email: email,
      password: password
    };
    console.log(this.loginRequest);
    return this.http.post<JWTToken>(`${this.BASE_PATH}/auth/login`, this.loginRequest
    );
    
  }

  getUser(token){
    this.token=token;
    
    return this.http.get(`${this.BASE_PATH}/user/me`,{
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.token}`
    })
    }
    ).pipe(map( (res: User) => {
      this.user =res;
      console.log("hello"+this.user.name);
      this.registerSuccessfulLoginForJwt(this.user.name);
    }));
  }

  Signup(userinfo) {
    return this.http.post(`${this.BASE_PATH}/auth/signup`, userinfo
    ).pipe(map((res: ApiResponse) => {
      console.log(res);
      this.apiResponse = res;
    }));
    
  }

  registerSuccessfulLoginForJwt(username) {
    sessionStorage.setItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME, username);
  }

  isUserLoggedIn() {
    let user = sessionStorage.getItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME);
    if (user === null) return false
    return true
  }

  getLoggedInUserName() {
    let user = sessionStorage.getItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME);
    if (user === null) return ''
    return user
  }

  logout() {
    sessionStorage.removeItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME);
    this.user.name = null;
    this.token = null;
  }
}
