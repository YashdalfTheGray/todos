import { combineReducers } from 'redux';

import { createProcessingSlice } from './utils';
import * as todosActions from './actions';
import * as constants from './constants';

const todoIds = (state = [], { type, payload }) => {
  switch (type) {
    case todosActions.GET_ALL_TODOS_SUCCESS:
      return payload.map(t => t.id);
    default:
      return state;
  }
};

const todosById = (state = {}, { type, payload }) => {
  switch (type) {
    case todosActions.GET_ALL_TODOS_SUCCESS:
      return payload.reduce((acc, t) => {
        acc[t.id] = t;
        return acc;
      }, {});
    default:
      return state;
  }
};

const visibility = (state = constants.visibility.all, { type, payload }) => {
  switch (type) {
    case todosActions.SET_VISIBILITY_ALL:
    case todosActions.SET_VISIBILITY_DONE:
      return payload;
    default:
      return state;
  }
};

const createTodo = createProcessingSlice(
  todosActions.CREATE_TODO,
  todosActions.CREATE_TODO_SUCCESS,
  todosActions.CREATE_TODO_ERROR
);

const updateTodo = createProcessingSlice(
  todosActions.CREATE_TODO,
  todosActions.CREATE_TODO_SUCCESS,
  todosActions.CREATE_TODO_ERROR
);

export default combineReducers({
  todoIds,
  todosById,
  visibility,
  createTodo,
  updateTodo
});

export const getAllTodoIds = store => store.todoIds;
export const getAllTodos = store => Object.values(store.todosById);
export const getTodoById = (store, id) => store.todosById[id];
export const getVisibility = store => store.visibility;
export const getApiErrorByApi = (store, api) => store[api].isProcessing;
export const getIsProcessingByApi = (store, api) => store[api].apiError;
