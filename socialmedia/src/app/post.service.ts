import { Observable } from 'rxjs';
import { Post } from './model/Post';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PostService {


  constructor(private http: HttpClient) {

  }

  checkInPost(post: Post,userid){
    return this.http.post("http://localhost:9090/post/addPost/"+userid,post,{responseType: 'text'});
  }

  getPostByPostid(postid):Observable<Post>{
    return this.http.get<Post>("http://localhost:9090/post/getPostByPostid/"+postid,{responseType: 'json'});
  }

  getFilteredPostList(userid){
    return this.http.get<Post[]>("http://localhost:9090/post/getFilteredPostByUser/"+userid);
  }

  getPostList(userid){
    return this.http.get<Post[]>("http://localhost:9090/post/getAllByUser/"+userid);
  }

  geAlltPostList(){
    return this.http.get<Post[]>("http://localhost:9090/post/getAll");
  }

  getAllLocation(){
    return this.http.get<Location[]>("http://localhost:9090/location/getAll");
  }

  
}
