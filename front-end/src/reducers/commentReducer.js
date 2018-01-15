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

        return  {...state,comments:action.comments}
    case RECEIVE_COMMENTS_AFTER_UPDATE:

        const index = state.comments.findIndex(comment => comment.id === action.comment.id)

        return {
          ...state,
          comments:[...state.comments.slice(0,index),
          {
            ...state.comments[index],
            body:action.comment.body
          },...state.comments.slice(index+1)]
        }
    case RECEIVE_COMMENTS_AFTER_NEW:

        return {
          ...state,comments:[...state.comments,action.comment]
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
        return {
          ...state,
          comments:[...state.comments.slice(0,deletedIindex),
          ...state.comments.slice(deletedIindex+1)]
        }
    default : return state;
  }
}

export default commentReducer;
