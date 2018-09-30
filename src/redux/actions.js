import { createAction } from './utils';
import constants from './constants';

export const GET_ALL_TODOS = '[todos] get all';
export const GET_ALL_TODOS_SUCCESS = '[todos] get all success';
export const GET_ALL_TODOS_ERROR = '[todos] get all error';
export const CREATE_TODO = '[todos] create';
export const CREATE_TODO_SUCCESS = '[todos] create success';
export const CREATE_TODO_ERROR = '[todos] create error';
export const UPDATE_TODO = '[todos] update';
export const UPDATE_TODO_SUCCESS = '[todos] update success';
export const UPDATE_TODO_ERROR = '[todos] update error';
export const MARK_TODO_DONE = '[todos] mark done';
export const MARK_TODO_DONE_SUCCESS = '[todos] mark done success';
export const MARK_TODO_DONE_ERROR = '[todos] mark done error';
export const MARK_TODO_UNDONE = '[todos] mark undone';
export const MARK_TODO_UNDONE_SUCCESS = '[todos] mark undone success';
export const MARK_TODO_UNDONE_ERROR = '[todos] mark undone error';
export const SET_VISIBILITY_ALL = '[visibility] all';
export const SET_VISIBILITY_DONE = '[visibility] done';

const todoActions = {
  getAllTodos: () => createAction(GET_ALL_TODOS),
  getAllTodosSuccess: payload => createAction(GET_ALL_TODOS_SUCCESS, payload),
  getAllTodosError: error => createAction(GET_ALL_TODOS_ERROR, error),
  createTodo: content => createAction(CREATE_TODO, content),
  createTodoSuccess: () => createAction(CREATE_TODO_SUCCESS),
  createTodoError: error => createAction(CREATE_TODO_ERROR, error),
  updateTodo: (id, content) => createAction(UPDATE_TODO, { id, content }),
  updateTodoSuccess: () => createAction(UPDATE_TODO_SUCCESS),
  updateTodoError: error => createAction(UPDATE_TODO_ERROR, error),
  markTodoDone: id => createAction(MARK_TODO_DONE, id),
  markTodoDoneSuccess: () => createAction(MARK_TODO_DONE_SUCCESS),
  markTodoDoneError: error => createAction(MARK_TODO_DONE_ERROR, error),
  markTodoUndone: id => createAction(MARK_TODO_UNDONE, id),
  markTodoUndoneSuccess: () => createAction(MARK_TODO_UNDONE_SUCCESS),
  markTodoUndoneError: error => createAction(MARK_TODO_UNDONE_ERROR, error),
  setVisibilityAll: () =>
    createAction(SET_VISIBILITY_ALL, constants.visibility.all),
  setVisibilityDone: () =>
    createAction(SET_VISIBILITY_ALL, constants.visibility.done)
};

export default todoActions;
