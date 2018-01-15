import {createGETRequest,createPOSTRequest,createPUTRequest,createDELETERequest} from './request';
const uuidv1 = require('uuid/v1');

export const fetchComments = (postId) => {
  const request = createGETRequest(`http://localhost:3001/posts/${postId}/comments`)
  return fetch(request)
        .then(response => {
            return response.json();
            }).catch(error =>{
                      return error;
            })
};

export const submitNewComment = (postId,commentText) => {
  const requestBody = {
      id:uuidv1(),
      timestamp:new Date(),
      body:commentText,
      author:'Ruchi',
      parentId:postId
    }
  const request = createPOSTRequest(`http://localhost:3001/comments`,requestBody);
  return fetch(request)
        .then(response => {
            return response.json();
            }).catch(error =>{
                      return error;
            })
};

export const updateComment = (postId,commentText,commentId) => {
  const requestBody = {
      timestamp:new Date(),
      body:commentText,
      author:'Ruchi'
    }
  const request = createPUTRequest(`http://localhost:3001/comments/${commentId}`,requestBody);
  return fetch(request)
        .then(response => {
            return response.json();
            }).catch(error =>{
                      return error;
            })
};

export const voteComment = (commentId,voteType) => {
  const requestBody = {
      option:voteType
    }
  const request = createPOSTRequest(`http://localhost:3001/comments/${commentId}`,requestBody);
  return fetch(request)
        .then(response => {
            return response.json();
            }).catch(error =>{
                      return error;
            })
};

export const deleteComment = (commentId) => {
  const request = createDELETERequest(`http://localhost:3001/comments/${commentId}`);
  return fetch(request)
        .then(response => {
            return response.json();
            }).catch(error =>{
                      return error;
            })
};
