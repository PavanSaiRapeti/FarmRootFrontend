const initialState = {
  products: [],
  cart: [],
  loading: false,
  error: null
};

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_PRODUCTS_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_PRODUCTS_SUCCESS':
      return { ...state, loading: false, products: action.payload };
    case 'FETCH_PRODUCTS_FAILURE':
      return { ...state, loading: false, error: action.payload };
    case 'ADD_PRODUCT_SUCCESS':
      return { ...state, products: [action.payload, ...state.products] };
    case 'EDIT_PRODUCT_SUCCESS':
      return {
        ...state,
        products: state.products.map((product) =>
          product._id === action.payload._id ? action.payload : product
        )
      };
    case 'DELETE_PRODUCT_SUCCESS':
      return {
        ...state,
        products: state.products.filter((product) => product._id !== action.payload)
      };
    case 'ADD_TO_CART':
      return { ...state, cart: [...state.cart, action.payload] };
    case 'REMOVE_FROM_CART':
      return { ...state, cart: state.cart.filter((product) => product._id !== action.payload) };
    default:
      return state;
  }
};

export default productReducer;