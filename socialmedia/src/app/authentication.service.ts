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
    
    return this.http.get<User>(`${this.BASE_PATH}/user/me`,{
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.token}`
    })
    }
    )
    .pipe(map( (res: User) => {
      //console.log(res);
      this.user =res;
      console.log(this.user);
      console.log("hello "+this.user.name+" "+this.user.userId);
      this.registerSuccessfulLoginForJwt(this.user.name,this.token);
    }));
  }

  getUserDetails(){
    return this.http.get<User>(`${this.BASE_PATH}/user/me`);
  }

  Signup(userinfo) {
    return this.http.post(`${this.BASE_PATH}/auth/signup`, userinfo
    ).pipe(map((res: ApiResponse) => {
      console.log(res);
      this.apiResponse = res;
    }));
    
  }

  registerSuccessfulLoginForJwt(username,token) {
    localStorage.setItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME, username);
    localStorage.setItem("token", token);
  }

  isUserLoggedIn() {
    let user = localStorage.getItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME);
    if (user === null) return false
    return true
  }

  getLoggedInUserName() {
    let user = localStorage.getItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME);
    if (user === null) return ''
    return user
  }

  getToken(){
    let token = localStorage.getItem("token");
    if (token === null) return ''
    return token
  }

  logout() {
    localStorage.removeItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME);
    localStorage.removeItem("token");
    this.user.name = null;
    this.token = null;
  }
}
