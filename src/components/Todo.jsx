import * as React from 'react';
import * as moment from 'moment';
import * as PropTypes from 'prop-types';

import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

import TodoPropType from '../customProps';

class Todo extends React.Component {
  static propTypes = {
    todo: TodoPropType.isRequired,
    onUpdate: PropTypes.func.isRequired,
    isProcessingUpdate: PropTypes.bool.isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      editMode: false,
      isError: false,
      newContent: props.todo.content
    };
  }

  componentDidUpdate(prevProps) {
    const { isProcessingUpdate } = this.props;
    const { isProcessingUpdate: prevProcessingUpdate } = prevProps;

    if (prevProcessingUpdate && !isProcessingUpdate) {
      this.setState({ editMode: false }); // eslint-disable-line react/no-did-update-set-state
    }
  }

  handleTextChange = event => {
    const {
      target: { value }
    } = event;

    this.setState({
      newContent: value,
      isError: value.length === 0
    });
  };

  handleDone = () => {
    const { onUpdate, todo } = this.props;
    const { newContent, isError } = this.state;

    if (!isError) {
      onUpdate(todo.id, newContent);
      this.setState({ editMode: false });
    }
  };

  handleEdit = () => {
    this.setState({ editMode: true });
  };

  render() {
    const { todo } = this.props;
    const { editMode, newContent, isError } = this.state;

    return (
      <Card>
        <CardContent>
          {editMode ? (
            <TextField
              id="todo-content"
              value={newContent}
              margin="normal"
              onChange={this.handleTextChange}
              placeholder="Content (can't be blank)"
              error={isError}
              fullWidth
            />
          ) : (
            <Typography variant="headline" component="h2">
              {todo.content}
            </Typography>
          )}
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
              return <Button onClick={this.handleDone}>Done</Button>;
            }
            return (
              <>
                <Button onClick={this.handleEdit}>Edit</Button>
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
