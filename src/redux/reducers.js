import { combineReducers } from 'redux';

import { createProcessingSlice } from './utils';
import * as todosActions from './actions';
import constants from './constants';

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

const getAllTodosApiProcessing = createProcessingSlice(
  todosActions.GET_ALL_TODOS,
  todosActions.GET_ALL_TODOS_SUCCESS,
  todosActions.GET_ALL_TODOS_ERROR
);

const createTodoApiProcessing = createProcessingSlice(
  todosActions.CREATE_TODO,
  todosActions.CREATE_TODO_SUCCESS,
  todosActions.CREATE_TODO_ERROR
);

const updateTodoApiProcessing = createProcessingSlice(
  todosActions.CREATE_TODO,
  todosActions.CREATE_TODO_SUCCESS,
  todosActions.CREATE_TODO_ERROR
);

const markTodoDoneApiProcessing = createProcessingSlice(
  todosActions.MARK_TODO_DONE,
  todosActions.MARK_TODO_DONE_SUCCESS,
  todosActions.MARK_TODO_DONE_ERROR
);

export default combineReducers({
  todoIds,
  todosById,
  visibility,
  getAllTodosApiProcessing,
  createTodoApiProcessing,
  updateTodoApiProcessing,
  markTodoDoneApiProcessing
});
