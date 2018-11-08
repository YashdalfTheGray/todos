import { combineReducers } from 'redux';

export interface IAction<T extends string> {
  type: T;
}

export interface IActionWithPayload<T extends string, P> extends IAction<T> {
  payload: P;
}

export type ActionsMap<
  A extends { [key: string]: (...args: any[]) => any }
> = ReturnType<A[keyof A]>;

export function createAction<T extends string>(type: T): IAction<T>;
export function createAction<T extends string, P>(
  type: T,
  payload: P
): IActionWithPayload<T, P>;
export function createAction<T extends string, P>(type: T, payload?: P) {
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
