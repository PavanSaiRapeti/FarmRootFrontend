import { call, put, takeLatest } from 'redux-saga/effects';
import { addPost, loadMorePosts, addProduct, loadProducts, deletePost, addComment, deleteBlog, editBlog, addBlog, fetchBlogs } from '../../../api/farm';
import {
  ADD_POST_SUCCESS,
  ADD_POST_FAILURE,
  LOAD_MORE_POSTS_SUCCESS,
  LOAD_MORE_POSTS_FAILURE,
  LOAD_PRODUCTS_SUCCESS,
  LOAD_PRODUCTS_FAILURE,
  ADD_PRODUCT_SUCCESS,
  ADD_PRODUCT_FAILURE,
  DELETE_POST_SUCCESS,
  DELETE_POST_FAILURE,
} from '../../constants';
import { getUserId } from '../../../api/authApi';
import { addBlogFailure, addBlogSuccess, addCommentFailure, addCommentSuccess, deleteBlogFailure, deleteBlogSuccess, editBlogFailure, editBlogSuccess, fetchBlogsFailure, fetchBlogsSuccess, isPostLoading } from '../../actions/farmActions/actions';

export function* addPostSaga(action) {
  try {
    const post = yield call(addPost, {...action.payload, userId: getUserId()});
    yield put({ type: ADD_POST_SUCCESS, payload: post });
  } catch (error) {
    yield put({ type: ADD_POST_FAILURE, payload: error.message });
  }
}

export function* loadMorePostsSaga() {
  try {
    const posts = yield call(loadMorePosts);
    yield put({ type: LOAD_MORE_POSTS_SUCCESS, payload: posts });
  } catch (error) {
    yield put({ type: LOAD_MORE_POSTS_FAILURE, payload: error.message });
  }
}

export function* addProductSaga(action) {
  try {
    const product = yield call(addProduct, action.payload);
    yield put({ type: ADD_PRODUCT_SUCCESS, payload: product });
  } catch (error) {
    yield put({ type: ADD_PRODUCT_FAILURE, payload: error.message });
  }
}

export function* loadProductsSaga() {
  try {
    const products = yield call(loadProducts);
    yield put({ type: 'FETCH_PRODUCTS_SUCCESS', payload: products });
  } catch (error) {
    yield put({ type: 'FETCH_PRODUCTS_FAILURE', payload: error.message });
  }
}


export function* deletePostSaga(action) {
  try {
    yield put(isPostLoading(true));
    yield call(deletePost, action.payload);
    yield put({ type: DELETE_POST_SUCCESS });
    yield put(isPostLoading(false));
    yield call(loadMorePostsSaga);
  } catch (error) {
    yield put({ type: DELETE_POST_FAILURE });
    yield put(isPostLoading(false));
  }
}


export function* fetchBlogsSaga() {
  try {
    const response = yield call(fetchBlogs);
    yield put(fetchBlogsSuccess(response));
  } catch (error) {
    yield put(fetchBlogsFailure(error.message));
  }
}

export function* addBlogSaga(action) {
  try {
    const response = yield call(addBlog, action.payload);
    yield put(addBlogSuccess(response));
  } catch (error) {
    yield put(addBlogFailure(error.message));
  }
}

export function* editBlogSaga(action) {
  try {
    const { blogId, updatedContent } = action.payload;
    const response = yield call(editBlog, blogId, updatedContent);
    yield put(editBlogSuccess(response));
  } catch (error) {
    yield put(editBlogFailure(error.message));
  }
}

export function* deleteBlogSaga(action) {
  try {
    yield call(deleteBlog, action.payload);
    yield put(deleteBlogSuccess(action.payload));
  } catch (error) {
    yield put(deleteBlogFailure(error.message));
  }
}

export function* addCommentSaga(action) {
  try {
    const { blogId, comment } = action.payload;
    const response = yield call(addComment, blogId, comment);
    yield put(addCommentSuccess(response));
  } catch (error) {
    yield put(addCommentFailure(error.message));
  }
}
