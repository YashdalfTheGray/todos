import { IFirebaseTodo } from '../firebase';

import { Visibility } from './constants';
import { ActionsMap, createAction } from './utils';

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
export const SET_VISIBILITY_OPEN = '[visibility] open';

export const TodoActions = {
  getAllTodos: () => createAction(GET_ALL_TODOS),
  getAllTodosSuccess: (payload: IFirebaseTodo[]) =>
    createAction(GET_ALL_TODOS_SUCCESS, payload),
  getAllTodosError: (payload: Error) =>
    createAction(GET_ALL_TODOS_ERROR, payload),
  createTodo: (payload: string) => createAction(CREATE_TODO, payload),
  createTodoSuccess: () => createAction(CREATE_TODO_SUCCESS),
  createTodoError: (payload: Error) => createAction(CREATE_TODO_ERROR, payload),
  updateTodo: (payload: { id: string; content: string }) =>
    createAction(UPDATE_TODO, { id: payload.id, content: payload.content }),
  updateTodoSuccess: () => createAction(UPDATE_TODO_SUCCESS),
  updateTodoError: (payload: Error) => createAction(UPDATE_TODO_ERROR, payload),
  markTodoDone: (payload: string) => createAction(MARK_TODO_DONE, payload),
  markTodoDoneSuccess: () => createAction(MARK_TODO_DONE_SUCCESS),
  markTodoDoneError: (payload: Error) =>
    createAction(MARK_TODO_DONE_ERROR, payload),
  markTodoUndone: (payload: string) => createAction(MARK_TODO_UNDONE, payload),
  markTodoUndoneSuccess: () => createAction(MARK_TODO_UNDONE_SUCCESS),
  markTodoUndoneError: (payload: Error) =>
    createAction(MARK_TODO_UNDONE_ERROR, payload),
  setVisibilityAll: () => createAction(SET_VISIBILITY_ALL, Visibility.ALL),
  setVisibilityOpen: () => createAction(SET_VISIBILITY_OPEN, Visibility.OPEN),
};

export type TodoActions = ActionsMap<typeof TodoActions>;
