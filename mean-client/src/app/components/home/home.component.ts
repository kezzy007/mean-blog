import { Component, OnInit } from '@angular/core';
import { HomeService } from './services/home.service';

import { environment } from '../../../environments/environment';
import * as io from 'socket.io-client';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  blogPosts;
  blogCategories = [];
  blogPostsComments = [];
  newPostComment; 
  isCommenting = false;

  socket = io(environment.host);

  constructor(
    private homeService: HomeService
  ) { 

  }

  ngOnInit() {

    this.getBlogPostsAndComments();
    this.registerSocketListeners();

  }

  /**
   * Fetches blog posts, categories, tags and comments.
   */

  getBlogPostsAndComments() {

    const blogPostSubscription = this.homeService.getBlogPosts()
        .subscribe(response => {

          this.blogPosts = response.posts;
          this.blogCategories = response.categories;
          this.blogPostsComments = response.comments;

          blogPostSubscription.unsubscribe();

        });

  }


  /**
   *  Submits comment to the server
   */
   submitComment(postId) {

      this.isCommenting = true;

      const comment = this.prepareCommentObjectForPost(postId);

      this.homeService.submitComment(comment)
          .subscribe(response => {

            this.isCommenting = false;
            
            this.blogPostsComments.push(response.comment);

          });

   }

  /**
  *   Prepares the comment object for the post
  */
   prepareCommentObjectForPost(postId){

      return {
        post_id: postId,
        comment: this.newPostComment,
        user: this.getUser()
      };

   }

  /**
   *  Returns the user object of the logged in user
   */
   getUser() {
     return JSON.parse(localStorage.getItem('user'))  || '{"name":"dummy user"}';
   }


  /**
   *  Used to send a broadcast message indicating a user 
   *  is commenting on a post
   * 
   * @param postId 
   */

  socketBroadcastUserCommenting(postId) {

    this.socket.emit('commenting', postId);

  }


  /**
   *  Used to register all client side socket listeners
   *  to listen for emitted events from the server
   */

  registerSocketListeners() {

    const thisComponent = this;

    this.socket.on('commenting', (post_id) => {

      if(thisComponent.postExistsInDom(post_id)) {

        thisComponent.displayCommentingOnCommentList(post_id);

      }

    });

    this.socket.on('user-commented', (comment) => {

      if(thisComponent.isCommenting){ 

        thisComponent.isCommenting = !thisComponent.isCommenting;  

        return;

      }

      thisComponent.getCurrentCommentingNotificationElement(comment.comment.post_id)
                    .classList.remove('show');

      console.log("Foreign user commented", comment.comment);

      thisComponent.addNewCommentToExistingComments(comment.comment);
    });

  }

  itemsListTrackerFunction(index) {

    return index;

  }

  addNewCommentToExistingComments(comment) {

    this.blogPostsComments.push(comment);

  }

  getCurrentCommentingNotificationElement(postId) {

    return document.querySelector('div#post' + postId + ' div.commenting-notification');

  }

  displayCommentingOnCommentList(postId) {

    let commentNotificationElementInDom = this.getCurrentCommentingNotificationElement(postId);
    
    // Comment not found in Dom
    if(commentNotificationElementInDom === null) {
      return;
    }

    commentNotificationElementInDom.classList.add('show');

  }

  postExistsInDom(postId) {

    return document.querySelector('div#post' + postId) !== null;

  }


}
