import * as React from 'react';
import * as moment from 'moment';

import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

import TodoPropType from '../customProps';

const Todo = ({ todo }) => (
  <Card>
    <CardContent>
      <Typography variant="headline" component="h2">
        {todo.content}
      </Typography>
      <Typography variant="caption">
        Created&nbsp;
        {moment(todo.createdAt).fromNow()}
      </Typography>
      <Typography variant="caption">
        Last modified&nbsp;
        {moment(todo.modifiedAt).fromNow()}
      </Typography>
    </CardContent>
    <CardActions>
      <Button>Edit</Button>
      <Button color="primary">Mark done</Button>
    </CardActions>
  </Card>
);

Todo.propTypes = {
  todo: TodoPropType.isRequired
};

export default Todo;
