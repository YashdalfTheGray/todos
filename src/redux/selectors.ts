import ITodoStoreShape from './ITodosStore';

export const getAllTodoIds = (store: ITodoStoreShape) => store.todoIds;
export const getAllTodos = (store: ITodoStoreShape) =>
  Object.values(store.todosById);
export const getTodoById = (store: ITodoStoreShape, id: string) =>
  store.todosById[id];
export const getVisibility = (store: ITodoStoreShape) => store.visibility;
export const getApiErrorByApi = (store: ITodoStoreShape, api: string) =>
  store[`${api}ApiProcessing`].apiError as Error;
export const getIsProcessingByApi = (store: ITodoStoreShape, api: string) =>
  store[`${api}ApiProcessing`].isProcessing as boolean;
