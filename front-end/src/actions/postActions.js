
import * as PostAPI from '../utils/postAPI';

export const RECEIVE_ALL_POSTS = "RECEIVE_ALL_POSTS";
export const RECEIVE_POSTS_BY_CATEGORY = "RECEIVE_POSTS_BY_CATEGORY";
export const RECEIVE_POSTS_BY_ID = "RECEIVE_POSTS_BY_ID";
export const RECEIVE_POSTS_AFTER_NEW = "RECEIVE_POSTS_AFTER_NEW";
export const RECEIVE_POSTS_AFTER_UPDATE = "RECEIVE_POSTS_AFTER_UPDATE";
export const RECEIVE_VOTE_POSTS = "RECEIVE_VOTE_POSTS";
export const RECEIVE_POST_AFTER_DELETE = "RECEIVE_POST_AFTER_DELETE";

export const receiveAllPosts = (posts) => (
  {
    type:RECEIVE_ALL_POSTS,
    posts:posts
  }
)

export const fetchAllPosts = () => (dispatch) => {

  return PostAPI
  .fetchAllPosts()
  .then((posts) => {
     dispatch(receiveAllPosts(posts))
   })
}

// export const receivePostsByCategory = (posts) => (
//   {
//     type:RECEIVE_POSTS_BY_CATEGORY,
//     posts:posts
//   }
// )

// export const fetchPostsByCategory = (category) => (dispatch) => {
//   console.log("1. fetchPostsByCategoryFetchin posts in action"+ category);
//   return PostAPI
//   .fetchPostsByCategory(category)
//   .then((posts) => {
//      console.log("Posts in actions"+ posts)
//      dispatch(receivePostsByCategory(posts))
//    })
// }


export const receivePostDetails = (post) => (
  {
    type:RECEIVE_POSTS_BY_ID,
    post:post
  }
)

export const fetchPostDetails = (id) => (dispatch) => {
  return PostAPI
  .fetchPostDetails(id)
  .then((post) => {
     dispatch(receivePostDetails(post))
   })
}


export const receivePostsAfterNew= (post) => (
  {
    type:RECEIVE_POSTS_AFTER_NEW,
    post:post
  }
)

export const receivePostsAfterUpdate= (post) => (
  {
    type:RECEIVE_POSTS_AFTER_UPDATE,
    post:post
  }
)

export const submitPost = (postTitle,postText,postCategory,postId) => (dispatch) => {

  if(postId!==''){
    return PostAPI
    .updatePost(postId,postTitle,postText)
    .then((post) => {
       dispatch(receivePostsAfterUpdate(post))
     })
  }else{
    return PostAPI
    .submitNewPost(postTitle,postText,postCategory)
    .then((post) => {
       dispatch(receivePostsAfterNew(post))
     })
  }

}


export const receiveVotePosts= (post) => (
  {
    type:RECEIVE_VOTE_POSTS,
    post:post
  }
)

export const votePost = (postId,voteType) => (dispatch) => {

  return PostAPI
  .votePost(postId,voteType)
  .then((post) => {

     dispatch(receiveVotePosts(post))
   })
}

export const receivePostAfterDelete= (post) => (
  {
    type:RECEIVE_POST_AFTER_DELETE,
    post:post
  }
)

export const deletePost = (postId) => (dispatch) => {
  return PostAPI
  .deletePost(postId)
  .then((post) => {
     dispatch(receivePostAfterDelete(post))
   })
}
