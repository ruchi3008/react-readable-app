
import * as CommentAPI from '../utils/commentAPI';

export const RECEIVE_COMMENTS_BY_POSTID = "RECEIVE_COMMENTS_BY_POSTID"

export const RECEIVE_COMMENTS_AFTER_NEW = "RECEIVE_COMMENTS_AFTER_NEW";

export const RECEIVE_COMMENTS_AFTER_UPDATE = "RECEIVE_COMMENTS_AFTER_UPDATE";

export const RECEIVE_VOTE = "RECEIVE_VOTE";

export const RECEIVE_COMMENT_AFTER_DELETE = "RECEIVE_COMMENT_AFTER_DELETE";


export const receiveComments= (comments) => (
  {
    type:RECEIVE_COMMENTS_BY_POSTID,
    comments:comments
  }
)
export const receiveCommentsAfterNew= (comment) => (
  {
    type:RECEIVE_COMMENTS_AFTER_NEW,
    comment:comment
  }
)

export const receiveCommentsAfterUpdate= (comment) => (
  {
    type:RECEIVE_COMMENTS_AFTER_UPDATE,
    comment:comment
  }
)

export const receiveVote= (comment) => (
  {
    type:RECEIVE_VOTE,
    comment:comment
  }
)

export const receiveCommentAfterDelete= (comment) => (
  {
    type:RECEIVE_COMMENT_AFTER_DELETE,
    comment:comment
  }
)

export const fetchComments = (postId) => (dispatch) => {
  console.log("1. fetchComments  in action"+ postId);
  return CommentAPI
  .fetchComments(postId)
  .then((comments) => {
     console.log("Comments in action:fetchComments"+ comments)
     dispatch(receiveComments(comments))
   })
}

export const submitNewComment = (postId,commentText,commentId) => (dispatch) => {
  console.log("1. submitNewComment  in action"+ postId + commentText+ commentId);
  if(commentId!==''){
    return CommentAPI
    .updateComment(postId,commentText,commentId)
    .then((comment) => {
       console.log("Comments in action :Updating a comment"+ comment.id + comment.body)
       dispatch(receiveCommentsAfterUpdate(comment))
     })
  }else{
    return CommentAPI
    .submitNewComment(postId,commentText)
    .then((comment) => {
       console.log("Comments in action :submitNewComment"+ comment.id)
       dispatch(receiveCommentsAfterNew(comment))
     })
  }

}

export const voteComment = (commentId,voteType) => (dispatch) => {
  console.log("1. voteComment  in action"+ commentId);
  return CommentAPI
  .voteComment(commentId,voteType)
  .then((comment) => {
     console.log("Comments in action:voteComment"+ comment)
     dispatch(receiveVote(comment))
   })
}

export const deleteComment = (commentId) => (dispatch) => {
  console.log("1. deleteComment  in action"+ commentId);
  return CommentAPI
  .deleteComment(commentId)
  .then((comment) => {
     console.log("Comments in action:deleteComment"+ comment)
     dispatch(receiveCommentAfterDelete(comment))
   })
}
