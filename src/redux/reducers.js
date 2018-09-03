import { combineReducers } from 'redux';

import { createProcessingSlice } from './utils';
import * as todosActions from './actions';
import { visibility } from './constants';

const todos = (state = [], { type, payload }) => {
  switch (type) {
    case todosActions.GET_ALL_TODOS_SUCCESS:
      return payload;
    default:
      return state;
  }
};

const visibility = (state = visibility.all, { type, payload }) => {
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

return combineReducers({
  todos,
  visibility,
  createTodo,
  updateTodo
});
