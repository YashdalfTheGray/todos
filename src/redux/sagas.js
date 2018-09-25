import { call, put, takeEvery, all, takeLatest } from 'redux-saga/effects';

import { getAllTodos, createTodo, updateTodo, markTodoDone } from '../firebase';

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
    yield put(todoActions.createTodoSuccess());
    yield put(todoActions.getAllTodos());
    yield call(getAllTodosSaga);
  } catch (e) {
    yield put(todoActions.createTodoError(e));
    throw e;
  }
}

export function* updateTodoSaga(action) {
  try {
    yield call(updateTodo, action.payload.id, action.payload.content);
    yield put(todoActions.updateTodoSuccess());
    yield put(todoActions.getAllTodos());
    yield call(getAllTodosSaga);
  } catch (e) {
    yield put(todoActions.updateTodoError(e));
    throw e;
  }
}

export function* markTodoDoneSaga(action) {
  try {
    yield call(markTodoDone, action.payload);
    yield put(todoActions.markTodoDoneSuccess());
    yield put(todoActions.getAllTodos());
    yield call(getAllTodosSaga);
  } catch (e) {
    yield put(todoActions.markTodoDoneError(e));
    throw e;
  }
}

export default function* rootSaga() {
  yield all([
    takeEvery(actions.GET_ALL_TODOS, getAllTodosSaga),
    takeLatest(actions.CREATE_TODO, createTodoSaga),
    takeLatest(actions.UPDATE_TODO, updateTodoSaga)
  ]);
}
