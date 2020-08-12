import { combineReducers } from 'redux';

import * as todosActions from './actions';
import { Visibility } from './constants';
import { createProcessingSlice } from './utils';

const todoIds = (state: string[] = [], action: todosActions.TodoActions) => {
  switch (action.type) {
    case todosActions.GET_ALL_TODOS_SUCCESS:
      return action.payload.map((t) => t.id);
    default:
      return state;
  }
};

const todosById = (state = {}, action: todosActions.TodoActions) => {
  switch (action.type) {
    case todosActions.GET_ALL_TODOS_SUCCESS:
      return action.payload.reduce((acc, t) => {
        acc[t.id] = t;
        return acc;
      }, {});
    default:
      return state;
  }
};

const visibility = (
  state = Visibility.ALL,
  action: todosActions.TodoActions
) => {
  switch (action.type) {
    case todosActions.SET_VISIBILITY_ALL:
    case todosActions.SET_VISIBILITY_OPEN:
      return action.payload;
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

const markTodoUndoneApiProcessing = createProcessingSlice(
  todosActions.MARK_TODO_UNDONE,
  todosActions.MARK_TODO_UNDONE_SUCCESS,
  todosActions.MARK_TODO_UNDONE_ERROR
);

export default combineReducers({
  todoIds,
  todosById,
  visibility,
  getAllTodosApiProcessing,
  createTodoApiProcessing,
  updateTodoApiProcessing,
  markTodoDoneApiProcessing,
  markTodoUndoneApiProcessing,
});
