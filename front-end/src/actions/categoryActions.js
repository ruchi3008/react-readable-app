import * as CategoriesAPI from '../utils/categoryAPI';

export const RECEIVE_CATEGORIES = "RECEIVE_CATEGORIES";

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
