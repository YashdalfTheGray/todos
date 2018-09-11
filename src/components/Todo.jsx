import * as React from 'react';

import { TodoPropType } from '../customProps';

const Todo = ({ todo }) => <pre>{JSON.stringify(todo, null, 2)}</pre>;

Todo.propTypes = {
  todo: TodoPropType.isRequired
};

export default Todo;
