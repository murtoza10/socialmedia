import { Post } from './../model/Post';
import { PostService } from './../post.service';
import { User } from './../model/User';
import { Component, OnInit, Input } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-postlist',
  templateUrl: './postlist.component.html',
  styleUrls: ['./postlist.component.css']
})
export class PostlistComponent implements OnInit {

  user:User;
  locationlist: Location[]=[];
  postlist: Post[]=[];
  post: any = {};
  pinnedpost;

  constructor(
    private authenticationService: AuthenticationService,
    private PostService: PostService,
    private userService: UserService) { 

    }

    ngOnInit() {

      this.authenticationService.getUser(this.authenticationService.getToken()).subscribe(res=>{
        this.user= this.authenticationService.user;
        
        if(this.user.pinned!=null){
          this.getFilteredPostList(this.user.userId);
          this.setPinnedPost(this.user.pinned);
        }else{
          this.getPostList(this.user.userId);
        }
                    
        console.log("home "+this.user.name+" "+this.user.userId);
      });

    }

    getFilteredPostList(userid){
      this.PostService.getFilteredPostList(userid).subscribe(posts=>{
        this.postlist=posts;
        console.log("posts  "+posts.toString());
        console.log(this.postlist);
      })
    }

    getPostList(userid){
      console.log("postlist "+userid);
      this.PostService.getPostList(userid).
      
      subscribe(posts=>{
        
        this.postlist=posts;
        console.log("posts  "+posts.toString());
        console.log(this.postlist);
      })
    }

    Pinning(postId,post,i){
      console.log("pinnedpost ");
      console.log(post);
      this.userService.Pinned(this.user.userId,postId).subscribe(res=>{
        this.user.pinned=postId;
        this.pinnedpost= post;
        console.log(this.pinnedpost);
        console.log(this.postlist);
      });
    }

    setPinnedPost(postId){
      this.PostService.getPostByPostid(postId).
      subscribe(post=>{
        this.pinnedpost=post;
        console.log("pinnedpost from Onit call "+this.pinnedpost);
      });

    }

    Unpinning(){     
      this.userService.unPinned(this.user.userId).subscribe(res=>{
        this.postlist=this.postlist;
        this.pinnedpost=null;
        this.user.pinned=null;       
        console.log(res);
      });
    }

}
