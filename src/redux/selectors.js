export const getAllTodoIds = store => store.todoIds;
export const getAllTodos = store => Object.values(store.todosById);
export const getTodoById = (store, id) => store.todosById[id];
export const getVisibility = store => store.visibility;
export const getApiErrorByApi = (store, api) =>
  store[`${api}ApiProcessing`].apiError;
export const getIsProcessingByApi = (store, api) =>
  store[`${api}ApiProcessing`].isProcessing;
