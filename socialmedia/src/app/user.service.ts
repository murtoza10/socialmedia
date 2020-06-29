import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {

  }

  Pinned(userid,pinned){
    return this.http.post("http://localhost:9090/user/pin/"+userid,pinned,{responseType:"text"});
  }

  unPinned(userid){
    return this.http.post("http://localhost:9090/user/unpin",userid,{responseType:"text"});
  }
}
