import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { PostService } from './services/post.service'


@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {
 
  posts;
  isPostEdit = false;
  postToEdit = false;

  constructor(
                private postService: PostService,
                private router: Router
              ) { }

  ngOnInit() {

    this.fetchPosts()

  }

  fetchPosts(){

    this.postService.fetchPosts()
        .subscribe( result => {
                    this.posts = result.posts
                  })

  }

  deletePost(postId) {

    this.postService.deletePost(postId)
        .subscribe( result => {
          console.log(result)
          if(!result.success)
          return //notify failed


          this.posts = this.posts.filter( post => post._id !== postId )

        } )

  }

  editPost(post) {

    this.postToEdit = post

    this.isPostEdit = true
    
  }

  postsTrackByFunction(index) { return index }

}
