// Start of Selection
import { takeEvery, takeLatest } from 'redux-saga/effects';
import { LOGIN_REQUEST, REGISTER_REQUEST, LOGOUT_REQUEST, FETCH_RECIPES, ADD_POST_REQUEST, LOAD_MORE_POSTS_REQUEST, ADD_PRODUCT_REQUEST, LOAD_PRODUCTS_REQUEST, DELETE_POST_REQUEST } from '../constants';
import { loginSaga, logoutSaga, registerSaga } from './authSaga';
import { fetchRecipesSaga } from './reciepesSaga';
import { addBlogSaga, addCommentSaga, addPostSaga, addProductSaga, deleteBlogSaga, deletePostSaga, editBlogSaga, fetchBlogsSaga, loadMorePostsSaga, loadProductsSaga } from './farmSaga';

export default function* rootSaga() {
    yield takeEvery(LOGIN_REQUEST, loginSaga);
    yield takeEvery(REGISTER_REQUEST, registerSaga);
    yield takeEvery(LOGOUT_REQUEST, logoutSaga);
    yield takeEvery(FETCH_RECIPES, fetchRecipesSaga);
    yield takeEvery(ADD_POST_REQUEST, addPostSaga);
    yield takeEvery(LOAD_MORE_POSTS_REQUEST, loadMorePostsSaga);
    yield takeLatest(ADD_PRODUCT_REQUEST, addProductSaga);
  yield takeLatest(LOAD_PRODUCTS_REQUEST, loadProductsSaga);
  yield takeLatest(DELETE_POST_REQUEST, deletePostSaga);
  yield takeLatest('FETCH_PRODUCTS_REQUEST', loadProductsSaga);
  yield takeLatest('ADD_COMMENT_REQUEST', addCommentSaga);
  yield takeLatest('FETCH_BLOGS_REQUEST', fetchBlogsSaga);
  yield takeLatest('ADD_BLOG_REQUEST', addBlogSaga);
  yield takeLatest('EDIT_BLOG_REQUEST', editBlogSaga);
  yield takeLatest('DELETE_BLOG_REQUEST', deleteBlogSaga);
  yield takeLatest('ADD_COMMENT_REQUEST', addCommentSaga);

}