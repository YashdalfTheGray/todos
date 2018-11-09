import { all, call, put, takeEvery, takeLatest } from 'redux-saga/effects';

import {
  createTodo,
  getAllTodos,
  markTodoDone,
  markTodoUndone,
  updateTodo
} from '../firebase';

import * as actions from './actions';

const TodoActions = actions.TodoActions;

export function* getAllTodosSaga() {
  try {
    const todos = yield call(getAllTodos);
    yield put(TodoActions.getAllTodosSuccess(todos));

    return todos;
  } catch (e) {
    yield put(TodoActions.getAllTodosError(e));

    throw e;
  }
}

export function* createTodoSaga(
  action: ReturnType<typeof TodoActions.createTodo>
) {
  try {
    yield call(createTodo, action.payload);
    yield put(TodoActions.createTodoSuccess());
    yield put(TodoActions.getAllTodos());
    yield call(getAllTodosSaga);
  } catch (e) {
    yield put(TodoActions.createTodoError(e));
    throw e;
  }
}

export function* updateTodoSaga(
  action: ReturnType<typeof TodoActions.updateTodo>
) {
  try {
    yield call(updateTodo, action.payload.id, action.payload.content);
    yield put(TodoActions.updateTodoSuccess());
    yield put(TodoActions.getAllTodos());
    yield call(getAllTodosSaga);
  } catch (e) {
    yield put(TodoActions.updateTodoError(e));
    throw e;
  }
}

export function* markTodoDoneSaga(
  action: ReturnType<typeof TodoActions.markTodoDone>
) {
  try {
    yield call(markTodoDone, action.payload);
    yield put(TodoActions.markTodoDoneSuccess());
    yield put(TodoActions.getAllTodos());
    yield call(getAllTodosSaga);
  } catch (e) {
    yield put(TodoActions.markTodoDoneError(e));
    throw e;
  }
}

export function* markTodoUndoneSaga(
  action: ReturnType<typeof TodoActions.markTodoUndone>
) {
  try {
    yield call(markTodoUndone, action.payload);
    yield put(TodoActions.markTodoUndoneSuccess());
    yield put(TodoActions.getAllTodos());
    yield call(getAllTodosSaga);
  } catch (e) {
    yield put(TodoActions.markTodoUndoneError(e));
    throw e;
  }
}

export default function* rootSaga() {
  yield all([
    takeEvery(actions.GET_ALL_TODOS, getAllTodosSaga),
    takeLatest(actions.CREATE_TODO, createTodoSaga),
    takeLatest(actions.UPDATE_TODO, updateTodoSaga),
    takeLatest(actions.MARK_TODO_DONE, markTodoDoneSaga),
    takeLatest(actions.MARK_TODO_UNDONE, markTodoUndoneSaga)
  ]);
}
