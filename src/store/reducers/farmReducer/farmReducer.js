import {
    ADD_POST_SUCCESS,
    ADD_POST_FAILURE,
    LOAD_MORE_POSTS_SUCCESS,
    LOAD_MORE_POSTS_FAILURE,
    DELETE_POST_SUCCESS,
    DELETE_POST_FAILURE,
    DELETE_POST_REQUEST,
    IS_POST_LOADING,
} from '../../constants';

  const initialState = {
    posts: [],
    loading: false,
    error: null,
  };
  
  const farmReducer = (state = initialState, action) => {
    switch (action.type) {
      case ADD_POST_SUCCESS:
        return {
          ...state,
          posts: [action.payload, ...state.posts],
          error: null,
        };
      case ADD_POST_FAILURE:
        return {
          ...state,
          error: action.payload,
        };
      case DELETE_POST_REQUEST:
        return {
          ...state,
          error: null,
        };
      case DELETE_POST_SUCCESS:
        return {
          ...state,
          error: 'Deleted Successfully',
        };
      case DELETE_POST_FAILURE:
        return {
          ...state,
          error: 'Failed to delete',
        };
      case LOAD_MORE_POSTS_SUCCESS:
        return {
          ...state,
          posts: action.payload.posts,
          loading: false,
          error: null,
        };
      case LOAD_MORE_POSTS_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      case IS_POST_LOADING:
        return {
          ...state,
          loading: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default farmReducer;