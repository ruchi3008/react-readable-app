import { RECEIVE_CATEGORIES } from '../actions/categoryActions';

const initialCategoriesState = []


const categoryReducer = (state = initialCategoriesState, action) => {
  switch(action.type) {
    case RECEIVE_CATEGORIES :
        return  action.categories
    default : return state;
  }
}

export default categoryReducer;