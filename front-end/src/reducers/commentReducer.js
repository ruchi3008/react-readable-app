import { RECEIVE_COMMENTS_BY_POSTID,
        RECEIVE_COMMENTS_AFTER_NEW,
        RECEIVE_COMMENTS_AFTER_UPDATE,
        RECEIVE_VOTE,
        RECEIVE_COMMENT_AFTER_DELETE
      } from '../actions/commentActions';


const initialCommentsState = {}


const commentReducer = (state = initialCommentsState, action) => {
  switch(action.type) {
    case RECEIVE_COMMENTS_BY_POSTID :
        console.log("In reducer"+ action.comments);
        return  {...state,comments:action.comments}
    case RECEIVE_COMMENTS_AFTER_UPDATE:
        console.log("In reducerRECEIVE_COMMENTS_AFTER_UPDATE"+ action.comment);
        const index = state.comments.findIndex(comment => comment.id === action.comment.id)
        console.log(index + action.comment.body);
        return {
          ...state,
          comments:[...state.comments.slice(0,index),
          {
            ...state.comments[index],
            body:action.comment.body
          },...state.comments.slice(index+1)]
        }
    case RECEIVE_COMMENTS_AFTER_NEW:
        console.log("Updated Comment"+ action.comment);
        return {
          ...state,comments:[...state.comments,action.comment]
        }
    case RECEIVE_VOTE:
        console.log("After Voting"+ action.comment);
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
        console.log("After deleting" + action.comment.id);
        const deletedIindex = state.comments.findIndex(comment => comment.id === action.comment.id)
        return {
          ...state,
          comments:[...state.comments.slice(0,deletedIindex),
          ...state.comments.slice(deletedIindex+1)]
        }
    default : return state;
  }
}

export default commentReducer;
