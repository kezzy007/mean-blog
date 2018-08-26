import { Component, OnInit } from '@angular/core';
import { HomeService } from './services/home.service';

import { environment } from '../../../environments/environment';
import * as io from 'socket.io-client';
import { RegisterService } from '../register/services/register.service';
import { LoginService } from '../login/services/login-service.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  loggedIn = false;
  blogPosts;
  blogCategories = [];
  blogPostsComments = [];
  blogTags = []
  newPostComment; 
  isCommenting = {
    newComment: false,
    postId: null
  };

  socket = io(environment.host);

  constructor(
    private homeService: HomeService,
    private registerService: RegisterService,
    private loginService: LoginService,
    private router: ActivatedRoute
  ) { 
    this.checkRouteUrl()
  }

  ngOnInit() {

    this.verifyUserAuthenticated()
    this.registerSocketListeners()
    this.registerListenerForSignupAndLogin()

  }

  verifyUserAuthenticated = () => {

    this.loggedIn = this.getUser() !== '' ? true: false 

  }

  /**
   * Changes the first character to uppercase
   */
  ucFirst = (value: string) => {

    let valueArray = value.split('')

    const newValue = `${valueArray.shift().toString().toUpperCase()}${valueArray.join('')}`

    return newValue
  }

  /**
   * Returns date from a mongodb date timestamp
   */
  getDate(dateTime) {

    return dateTime.split('T')[0]

  }

  /**
   * Register a listener for new user registration and activates login
   */
  registerListenerForSignupAndLogin() {

    const signupSubscription = 
          this.registerService.notifyLoggedIn
              .subscribe( ({ success, user, token }) => {

                if(!success)return

                this.storeTokenInLocalStorage(token)

                this.storeUserInLocalStorage(user)

                this.setUserLoggedIn(true)

                signupSubscription.unsubscribe()
                
              })

    const loginSubscription = 
          this.loginService.userLoggedIn
              .subscribe( ({ success, user, token }) => {

                if(!success)return

                this.storeTokenInLocalStorage(token)

                this.storeUserInLocalStorage(user)

                this.setUserLoggedIn(true)

                loginSubscription.unsubscribe()
                
              })

  }

  setUserLoggedIn(loginState){

    this.loggedIn = loginState

  }


  storeTokenInLocalStorage(token) {

    window.localStorage.setItem('token', token);

  }

  storeUserInLocalStorage(user) {

    window.localStorage.setItem('user', JSON.stringify(user));

  }

  /**
   * 
   */
  checkRouteUrl() {

    this.router.url.subscribe( urlSegments => {

      let urlType: any[] = []
      
      if(new RegExp(/categories/, 'ig').test(urlSegments[0].path)){

        urlType = ['categories', urlSegments[1].path]

      }else if (new RegExp(/tags/, 'ig').test(urlSegments[0].path)){

        urlType = ['tags', urlSegments[1].path]

      }

      if( urlType.length > 0 ){
        this.getBlogPostsAndComments(urlType)
        return
      }

      this.getBlogPostsAndComments(null)

    })
    
  }

  /**
   * Fetches blog posts, categories, tags and comments.
   */

  getBlogPostsAndComments(url) {

    const blogPostSubscription = this.homeService.getBlogPosts(url)
        .subscribe(response => {

          this.blogPosts = response.posts;
          this.blogCategories = response.categories;
          this.blogPostsComments = response.comments;
          this.blogTags = response.tags;

          blogPostSubscription.unsubscribe();

        });

  }

  getBlogPostComments(postId) {
    
    const comments = this.blogPostsComments.filter( 
      comment => comment.post_id === postId
    )

    return comments
  }

  /**
   *  Submits comment to the server
   */
   submitComment(postId) {

      this.initIsCommenting(postId)

      const comment = this.prepareCommentObjectForPost(postId);

      this.homeService.submitComment(comment)
          .subscribe(response => {

            this.unInitIsCommenting()
            
            this.blogPostsComments.push(response.comment);

          });

   }

  /**
   * Initializes isCommenting object used to prevent notification
   * of "someone is commenting" on post
   * 
   * @param postId 
   */
  initIsCommenting(postId) {

    this.isCommenting = {
      newComment: postId !== null ? true : false ,
      postId: postId
    };

  }

  unInitIsCommenting() {

    this.initIsCommenting(null)
    
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
    *   Displays the full post when read more button is clicked for a post
    */
   displayFullPost($event, postContainer, postContent) {

    postContainer.innerHTML = postContent

    const element = $event.target

    element.tagName.toUpperCase() === "BUTTON" ? 
      element.style.display = "none" :
      element.parentNode.style.display = "none" 

   }

  /**
   *  Returns the user object of the logged in user
   */
   getUser() {
     return JSON.parse(localStorage.getItem('user'))  || '';
   }


  /**
   *  Used to send a broadcast message indicating a user 
   *  is commenting on a post
   * 
   * @param postId 
   */

  broadcastUserCommenting(postId) {

    //console.log('commenting')
    this.socket.emit('commenting', postId);

  }

  /**
   * Removes the notification for user commenting
   * 
   */
  removeUserCommentingBroadcast(postId) {

    this.socket.emit('commentDone', postId);

  }


  /**
   *  Used to register all client side socket listeners
   *  to listen for emitted events from the server
   */
  registerSocketListeners() {

    const thisComponent = this;

    this.socket.on('commenting', (post_id) => {

      //console.log('commenting')
      if(thisComponent.postExistsInDom(post_id)) {

        thisComponent.displayCommentingOnCommentList(post_id);

      }

    });

    this.socket.on('user-commented', (result) => {

      if(thisComponent.isCommenting.newComment){ 

        thisComponent.isCommenting.newComment = 
          !thisComponent.isCommenting.newComment;  

        thisComponent.clearCommentingDiv()

        return;

      }

      // Hide commenting notification div for other users
      thisComponent.hideCommentingNotificationDiv(result.comment.post_id)

      thisComponent.addNewCommentToExistingComments(result.comment);
    });

  }

  clearCommentingDiv() {
    
    this.newPostComment = ''

  }

  hideCommentingNotificationDiv(postId) {
    this.getCurrentCommentingNotificationElement(postId)
                    .classList.remove('show');
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

    let commentingNotificationElementInDom = 
      this.getCurrentCommentingNotificationElement(postId);

    // Comment not found in Dom
    if( (commentingNotificationElementInDom === null) || 
        commentingNotificationElementInDom.classList.contains('show')) {
      return;    
    }

    commentingNotificationElementInDom.classList.add('show');

  }

  postExistsInDom(postId) {

    return document.querySelector('div#post' + postId) !== null;

  }


}
