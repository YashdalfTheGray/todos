import { call, put, takeEvery, all } from 'redux-saga/effects';

import { getAllTodos } from '../firebase';

import * as actions from './actions';

const todoActions = actions.default;

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
  yield all([takeEvery(actions.GET_ALL_TODOS, getAllTodosSaga)]);
}
