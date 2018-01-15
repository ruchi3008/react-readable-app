import { RECEIVE_ALL_POSTS,
         RECEIVE_POSTS_BY_ID,
         RECEIVE_POSTS_AFTER_NEW,
         RECEIVE_POSTS_AFTER_UPDATE,
         RECEIVE_VOTE_POSTS,
         RECEIVE_POST_AFTER_DELETE} from '../actions/postActions';

const initialPostsState = {}


const postReducer = (state = initialPostsState, action) => {
  switch(action.type) {
    case RECEIVE_ALL_POSTS :
        console.log("In reducer"+ action.posts);
        return  {...state,posts:action.posts}
    case RECEIVE_POSTS_BY_ID :
        return  {...state,postDetails:action.post}
    case RECEIVE_POSTS_AFTER_NEW:
        return {...state,posts:[...state.posts,action.post]}
    case RECEIVE_POSTS_AFTER_UPDATE:
        const index = state.posts.findIndex(post => post.id === action.post.id);
        console.log(index + action.post.title);
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
    default : return state;
  }
}

export default postReducer;
