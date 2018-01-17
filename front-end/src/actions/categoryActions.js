import * as CategoriesAPI from '../utils/categoryAPI';
import { RECEIVE_CATEGORIES } from './types';

export const receiveCategories = (categories) => (
  {
    type:RECEIVE_CATEGORIES,
    categories:categories
  }
)

export const fetchCategories = () => (dispatch) => {
  return CategoriesAPI
  .fetchCategories()
  .then((categories) => {
     dispatch(receiveCategories(categories))
   })
}
