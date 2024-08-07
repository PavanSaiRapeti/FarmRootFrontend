import { combineReducers } from 'redux';
import authReducer from './authReducer/reducer';
import commonReducer from './commonReducers/commonReducer';
import reciepesReducer from './reciepesReducer/reducer';
import farmReducer from './farmReducer/farmReducer';
import blogReducer from './farmReducer/blogReducer';
import productsReducer from './farmReducer/productReducer';

const rootReducer = combineReducers({
    auth: authReducer,
    common:commonReducer,
    reciepes:reciepesReducer,
    farm:farmReducer,
    blog:blogReducer,
    product:productsReducer,
    // Add other reducers as needed
});

export default rootReducer;
