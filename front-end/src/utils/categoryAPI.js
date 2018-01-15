import {createGETRequest} from './request';
export const fetchCategories = () => {
          
            const request = createGETRequest('http://localhost:3001/categories')
            return fetch(request)
            .then(response => {
                                 return response.json();
                             }).catch(error =>{
                                 return error;
                               })
};
