import { combineReducers } from 'redux';

export interface IAction {
  type: string;
}

export interface IActionWithPayload<P> extends IAction {
  payload: P;
}

export type ActionsMap<
  A extends { [key: string]: (...args: any[]) => any }
> = ReturnType<A[keyof A]>;

export function createAction(type: string): IAction;
export function createAction<P>(
  type: string,
  payload: P
): IActionWithPayload<P>;
export function createAction<P>(type: string, payload?: P) {
  return { type, payload };
}

export interface IApiProcessingSlice {
  isProcessing: boolean;
  apiError: Error;
}

export const createProcessingSlice = (
  apiAction: string,
  successAction: string,
  errorAction: string
) => {
  const isProcessing = (state = false, action: any) => {
    if (action.type === apiAction) {
      return true;
    }
    if (action.type === successAction || action.type === errorAction) {
      return false;
    }
    return state;
  };

  const apiError = (state = null, action: any) =>
    action.type === errorAction ? action.payload : state;

  return combineReducers({ isProcessing, apiError });
};
