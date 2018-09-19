import * as React from 'react';
import * as moment from 'moment';
import * as PropTypes from 'prop-types';

import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

import TodoPropType from '../customProps';

class Todo extends React.Component {
  propTypes = {
    todo: TodoPropType.isRequired,
    onUpdate: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      editMode: true
    };
  }

  handleDoneClick = () => {
    const { onUpdate, todo } = this.props;

    onUpdate(todo.id);
  };

  render() {
    const { todo } = this.props;
    const { editMode } = this.state;

    return (
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
          {(() => {
            if (editMode) {
              return <Button onClick={this.handleDoneClick}>Done</Button>;
            }
            return (
              <>
                <Button>Edit</Button>
                <Button color="primary">Mark done</Button>
              </>
            );
          })()}
        </CardActions>
      </Card>
    );
  }
}

export default Todo;
