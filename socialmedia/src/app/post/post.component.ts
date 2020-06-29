import { Post } from './../model/Post';
import { PostService } from './../post.service';
import { User } from './../model/User';
import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';
import { PostlistComponent } from '../postlist/postlist.component';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  user: User;
  locationlist: Location[]=[];
  postlist: Post[]=[];
  post: any = {};
  postId;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private PostService: PostService,
    private postListComponent: PostlistComponent ) { 

    }

    ngOnInit() {
      this.authenticationService.getUser(this.authenticationService.getToken()).subscribe(res=>{
        this.user= this.authenticationService.user;
        console.log("home "+this.user.name+" "+this.user.userId);
      });

      this.post.status="";
      this.post.location="Sylhet";
      this.post.privacy="public";
      this.getLocationList();
      this.postId= this.route.snapshot.paramMap.get('id');
      console.log('PostId',this.postId);
      if(this.postId!=null){
      this.getPostByPostid(this.postId);
      }
    }

    postSubmit(postform){
      this.post.timestamp= new Date().getTime();
      console.log(this.post.status+" "+ this.post.user_id+" "+this.user.userId+" "+this.post.timestamp+" "+this.post.privacy);
      this.PostService.checkInPost(this.post,this.user.userId).subscribe(res=>{
        if(this.postId!=null){
          alert("Post Edited");
          this.router.navigate(['home']);
          }
          else{
            alert("Post Saved");
          }
        this.postListComponent.getPostList(this.user.userId);
        console.log(res);
      });
    }
  
    onOptionsSelected(value:string){
      this.post.location = value;
      console.log("the selected value is " + this.post.location);
  }
  
    getLocationList(){
      this.PostService.getAllLocation().subscribe(locations=>{
        this.locationlist=locations;
        console.log(this.locationlist);
      });
    }

    getPostByPostid(postid){
      console.log(postid);
      this.PostService.getPostByPostid(postid).subscribe(p=>{
          this.post=p;
          console.log(this.post);
      });
    }

}
