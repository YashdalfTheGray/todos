import { call, put, takeEvery, all } from 'redux-saga/effects';

import { getAllTodos, createTodo } from '../firebase';

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

export function* createTodoSaga(action) {
  try {
    yield call(createTodo, action.payload);
    yield put(todoActions.createTodoSuccess);
  } catch (e) {
    yield put(todoActions.createTodoError(e));
    throw e;
  }
}

export default function* rootSaga() {
  yield all([takeEvery(actions.GET_ALL_TODOS, getAllTodosSaga)]);
}
