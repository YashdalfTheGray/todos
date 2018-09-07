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
export const SET_VISIBILITY_ALL = '[visibility] all';
export const SET_VISIBILITY_DONE = '[visibility] done';

const todoActions = {
  getAllTodos: () => createAction(GET_ALL_TODOS),
  getAllTodosSuccess: payload => createAction(GET_ALL_TODOS_SUCCESS, payload),
  getAllTodosError: error => createAction(GET_ALL_TODOS_ERROR, error),
  createTodo: todo => createAction(CREATE_TODO, todo),
  createTodoSuccess: () => createAction(CREATE_TODO_SUCCESS),
  createTodoError: error => createAction(CREATE_TODO_ERROR, error),
  updateTodo: todo => createAction(UPDATE_TODO, todo),
  updateTodoSuccess: () => createAction(UPDATE_TODO_SUCCESS),
  updateTodoError: error => createAction(UPDATE_TODO_ERROR, error),
  setVisibilityAll: () =>
    createAction(SET_VISIBILITY_ALL, constants.visibility.all),
  setVisibilityDone: () =>
    createAction(SET_VISIBILITY_ALL, constants.visibility.done)
};

export default todoActions;
