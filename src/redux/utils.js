import { combineReducers } from 'redux';

export const createAction = (type, payload) => ({
  type,
  payload
});

export const createProcessingSlice = (
  apiAction,
  successAction,
  errorAction
) => {
  const isProcessing = (state = false, { type }) => {
    if (type === apiAction) {
      return true;
    }
    if (type === successAction || type === errorAction) {
      return false;
    }
    return state;
  };

  const hasError = (state = null, { type, payload }) =>
    type === errorAction ? payload : state;

  return combineReducers({ isProcessing, hasError });
};
