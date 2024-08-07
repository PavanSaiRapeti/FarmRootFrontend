// sagas.js
import { call, put} from 'redux-saga/effects';
import { fetchRecipes } from '../../../api/recipes';
import { fetchRecipesFailure, fetchRecipesSuccess } from '../../actions/reciepesActions/actions';
import { setErrorPopup, setLoading } from '../../actions/common/actions';


export function* fetchRecipesSaga(action) {
  try {
    yield put(setErrorPopup(null));
    yield put(setLoading(true));
    const { ingredients } = action.payload;
    let response;
    response = yield call(fetchRecipes, ingredients);
    if (response?.preflight) {
    } else {
        response = yield call(fetchRecipes, ingredients);
        if (!response) {
          yield new Promise(resolve => setTimeout(resolve, 1000));
        }
    }
    if(response?.error){
      yield put(setLoading(true));
      yield put(setErrorPopup('Failed to fetch recipes'));
      yield put(setLoading(false));
      return;
    }
      yield put(fetchRecipesSuccess(response?.recipes || []));
      yield put(setLoading(false));
  } catch (error) {
    yield put(setLoading(true));
    yield put(setErrorPopup('Failed to fetch recipes:'));
    yield put(setLoading(false));
  }
}
