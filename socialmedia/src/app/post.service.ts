import { Post } from './model/Post';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PostService {


  constructor(private http: HttpClient) {

  }

  checkInPost(post: Post){
    return this.http.post<Post>("http://localhost:9090/post/Addpost",post);
  }

  getPostList(){
    return this.http.get<Post[]>("http://localhost:9090/post/getAll");
  }

  getAllLocation(){
    return this.http.get<Location[]>("http://localhost:9090/location/getAll");
  }
}
