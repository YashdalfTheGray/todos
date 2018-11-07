import { IFirebaseTodo } from '../firebase';

import { Visibility } from './constants';
import { createProcessingSlice, IApiProcessingSlice } from './utils';

export interface IStringKeyedObject<T> {
  [key: string]: T;
}

export default interface ITodosStoreShape {
  todoIds: string[];
  todosById: IStringKeyedObject<IFirebaseTodo>;
  visibility: Visibility;
  getAllTodosApiProcessing: IApiProcessingSlice;
  createTodoApiProcessing: IApiProcessingSlice;
  updateTodoApiProcessing: IApiProcessingSlice;
  markTodoDoneApiProcessing: IApiProcessingSlice;
  markTodoUndoneApiProcessing: IApiProcessingSlice;
}
