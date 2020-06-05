import { Post } from './../model/Post';
import { PostService } from './../post.service';
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
  locationlist: Location[]=[];
  postlist: Post[]=[];
  post: Post;
  status="";
  location="";
  privacy="";

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private PostService: PostService) { 

    }

  ngOnInit() {
    this.authenticationService.getUser(this.authenticationService.token).subscribe(res=>{
      this.user= this.authenticationService.user;
      console.log("home "+this.user.name);
    });
    this.getLocationList();
    this.getPostList();
  }

  postSubmit(){
    this.post.location="Bandarban";
    this.post.status=this.status;
    this.post.userid=this.user.id;
    this.post.pinned= false;
    this.post.privacy= this.privacy;
    this.post.timestamp= new Date().getTime();
    console.log(this.post.status+" "+ this.post.userid+" "+this.post.timestamp+" "+this.post.privacy+" "+this.location);
    this.PostService.checkInPost(this.post);
  }

  // selectChangeHandler (event: any) {
  //   this.location = event.target.value;
  // }
  onOptionsSelected(value:string){
    this.location = value;
    console.log("the selected value is " + this.location);
}

  getLocationList(){
    this.PostService.getAllLocation().subscribe(locations=>{
      this.locationlist=locations;
      console.log(this.locationlist);
    })
  }

  getPostList(){
    this.PostService.getPostList().subscribe(posts=>{
      this.postlist=posts;
      console.log(this.postlist);
    })
  }



}
