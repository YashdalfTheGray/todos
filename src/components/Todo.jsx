import * as React from 'react';

import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

import { TodoPropType } from '../customProps';

const Todo = ({ todo }) => (
  <Card>
    <CardContent>
      <Typography variant="headline" component="h2">
        {todo.content}
      </Typography>
      <pre>{JSON.stringify(todo, null, 2)}</pre>
    </CardContent>
    <CardActions>
      <Button color="primary">Mark done</Button>
    </CardActions>
  </Card>
);

Todo.propTypes = {
  todo: TodoPropType.isRequired
};

export default Todo;
