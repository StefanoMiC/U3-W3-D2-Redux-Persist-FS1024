import { SET_BOOKS } from "../actions";

const initialState = {
  content: []
};
const booksReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_BOOKS:
      return {
        ...state,
        content: action.payload
      };

    default:
      return state;
  }
};

export default booksReducer;
