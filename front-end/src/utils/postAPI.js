import {createGETRequest,
        createPOSTRequest,
        createPUTRequest,
        createDELETERequest
      } from './request';
const uuidv1 = require('uuid/v1');

export const fetchAllPosts = () => {
            const request = createGETRequest('http://localhost:3001/posts')
            return fetch(request)
            .then(response => {

                                 return response.json();
                             }).catch(error =>{

                                 return error;
                               })
};

export const fetchPostsByCategory = (categoryName) => {

            const request = createGETRequest(`http://localhost:3001/${categoryName}/posts`)
            return fetch(request)
            .then(response => {

                                 return response.json();
                             }).catch(error =>{

                                 return error;
                               })
};

export const fetchPostDetails = (id) => {

            const request = createGETRequest(`http://localhost:3001/posts/${id}/`)
            return fetch(request)
            .then(response => {

                                 return response.json();
                             }).catch(error =>{
                                
                                 return error;
                               })
};

export const submitNewPost = (postTitle,postText,postCategory) => {
  const requestBody = {
      id:uuidv1(),
      timestamp:new Date(),
      title:postTitle,
      body:postText,
      author:'Ruchi',
      category:postCategory
    }
    const request = createPOSTRequest(`http://localhost:3001/posts`,requestBody);
    return fetch(request)
          .then(response => {
              return response.json();
              }).catch(error =>{
                        return error;
              })
  };

export const updatePost = (postId,postTitle,postText) => {
    const requestBody = {
        timestamp:new Date(),
        title:postTitle,
        body:postText
      }
    const request = createPUTRequest(`http://localhost:3001/posts/${postId}`,requestBody);
    return fetch(request)
          .then(response => {
              return response.json();
              }).catch(error =>{
                        return error;
              })
  };

export const votePost = (postId,voteType) => {
    const requestBody = {
        option:voteType
      }
    const request = createPOSTRequest(`http://localhost:3001/posts/${postId}`,requestBody);
    return fetch(request)
          .then(response => {
              return response.json();
              }).catch(error =>{
                        return error;
              })
};

export const deletePost = (postId) => {
  const request = createDELETERequest(`http://localhost:3001/posts/${postId}`);
  return fetch(request)
        .then(response => {
            return response.json();
            }).catch(error =>{
                      return error;
            })
};
