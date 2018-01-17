import { RECEIVE_ALL_POSTS,
         RECEIVE_POSTS_BY_ID,
         RECEIVE_POSTS_AFTER_NEW,
         RECEIVE_POSTS_AFTER_UPDATE,
         RECEIVE_VOTE_POSTS,
         RECEIVE_POST_AFTER_DELETE,
         RECEIVE_COMMENTS_BY_POSTID,
         RECEIVE_COMMENTS_AFTER_NEW,
         RECEIVE_COMMENTS_AFTER_UPDATE,
         RECEIVE_VOTE,
         RECEIVE_COMMENT_AFTER_DELETE} from '../actions/types';

const initialPostsState = {}


const postReducer = (state = initialPostsState, action) => {
  switch(action.type) {
    case RECEIVE_ALL_POSTS :
        return  {...state,posts:action.posts}
    case RECEIVE_POSTS_BY_ID :
        return  {...state,postDetails:action.post}
    case RECEIVE_POSTS_AFTER_NEW:
        return {...state,posts:[...state.posts,action.post]}
    case RECEIVE_POSTS_AFTER_UPDATE:
        const index = state.posts.findIndex(post => post.id === action.post.id);

        return {
                ...state,
                posts:[...state.posts.slice(0,index),
                {
                  ...state.posts[index],
                  title:action.post.title,
                  body:action.post.body
                },...state.posts.slice(index+1)],
                postDetails:{
                  ...state.postDetails,
                  title:action.post.title,
                  body:action.post.body
                }
        }
    case RECEIVE_VOTE_POSTS:
         const commentIndex = state.posts.findIndex(post => post.id === action.post.id);
    return {
            ...state,
            posts:[...state.posts.slice(0,commentIndex),
            {
              ...state.posts[commentIndex],
              voteScore:action.post.voteScore
            },...state.posts.slice(commentIndex+1)],
            postDetails:{
              ...state.postDetails,
              voteScore:action.post.voteScore
            }
    }
    case RECEIVE_POST_AFTER_DELETE:
          const deletedIndex = state.posts.findIndex(post => post.id === action.post.id);
          return {
            ...state,
            posts:[...state.posts.slice(0,deletedIndex),
            ...state.posts.slice(deletedIndex+1)]
          }
    case RECEIVE_COMMENTS_BY_POSTID :
              return  {...state,comments:action.comments}
    case RECEIVE_COMMENTS_AFTER_UPDATE:
              const updatedIndex = state.comments.findIndex(comment => comment.id === action.comment.id)
              return {
                ...state,
                comments:[...state.comments.slice(0,updatedIndex),
                {
                  ...state.comments[updatedIndex],
                  body:action.comment.body
                },...state.comments.slice(updatedIndex+1)]
              }
        case RECEIVE_COMMENTS_AFTER_NEW:
              const postIndex = state.posts.findIndex(post =>action.postId===post.id)
              return {
                ...state,
                comments:[...state.comments,action.comment],
                posts:[...state.posts.slice(0,postIndex),
                      {
                        ...state.posts[postIndex],
                        commentCount:state.posts[postIndex].commentCount+1
                      },...state.posts.slice(postIndex+1)],
                postDetails:{...state.postDetails,
                      commentCount:state.postDetails.commentCount+1
                    }
              }
        case RECEIVE_VOTE:

              const commentIindex = state.comments.findIndex(comment => comment.id === action.comment.id)
              return {
                ...state,
                comments:[...state.comments.slice(0,commentIindex),
                {
                  ...state.comments[commentIindex],
                  voteScore:action.comment.voteScore
                },...state.comments.slice(commentIindex+1)]
              }
        case RECEIVE_COMMENT_AFTER_DELETE:
              const deletedIindex = state.comments.findIndex(comment => comment.id === action.comment.id)
              const matchingPostIndex = state.posts.findIndex(post => action.postId === post.id)
              return {
                ...state,
                comments:[...state.comments.slice(0,deletedIindex),
                ...state.comments.slice(deletedIindex+1)],
                posts:[...state.posts.slice(0,matchingPostIndex),
                      {
                        ...state.posts[matchingPostIndex],
                        commentCount:state.posts[matchingPostIndex].commentCount-1
                      },...state.posts.slice(matchingPostIndex+1)],
                postDetails:{...state.postDetails,
                      commentCount:state.postDetails.commentCount-1
                    }
              }
    default : return state;
  }
}

export default postReducer;
