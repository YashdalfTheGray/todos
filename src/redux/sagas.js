import { call, put, takeEvery } from 'redux-saga';

import { getAllTodos } from '../firebase';

import todoActions from './actions';

export function* getAllTodosSaga() {
  try {
    const todos = yield call(getAllTodos);
    yield put(todoActions.getAllTodosSuccess(todos));

    return todos;
  } catch (e) {
    yield put(todoActions.getAllTodosError(e));

    throw e;
  }
}

export default function* rootSaga() {
  yield [takeEvery(getAllTodosSaga)];
}
