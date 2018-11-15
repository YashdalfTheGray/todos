import * as React from 'react';

import * as moment from 'moment';

import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import grey from '@material-ui/core/colors/grey';
import createStyles from '@material-ui/core/styles/createStyles';
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

import { IFirebaseTodo } from '../firebase';
import { TodoActions } from '../redux/actions';

const todoStyles = createStyles({
  headingDone: {
    color: grey[500],
    textDecoration: 'line-through'
  }
});

interface ITodoProps {
  todo: IFirebaseTodo;
  onUpdate: typeof TodoActions.updateTodo;
  onMarkDone: typeof TodoActions.markTodoDone;
  onMarkUndone: typeof TodoActions.markTodoUndone;
  isProcessingUpdate: boolean;
}

type TodoProps = ITodoProps & WithStyles<typeof todoStyles>;

interface ITodoState {
  editMode: boolean;
  isError: boolean;
  newContent: string;
}

class Todo extends React.Component<TodoProps, ITodoState> {
  constructor(props: TodoProps) {
    super(props);

    this.state = {
      editMode: false,
      isError: false,
      newContent: props.todo.content
    };
  }

  public componentDidUpdate(prevProps: TodoProps) {
    const { isProcessingUpdate } = this.props;
    const { isProcessingUpdate: prevProcessingUpdate } = prevProps;

    if (prevProcessingUpdate && !isProcessingUpdate) {
      this.setState({ editMode: false });
    }
  }

  public handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value }
    } = event;

    this.setState({
      newContent: value,
      isError: value.length === 0
    });
  };

  public handleDone = () => {
    const { onUpdate, todo } = this.props;
    const { newContent, isError } = this.state;

    if (!isError) {
      onUpdate({ id: todo.id, content: newContent });
      this.setState({ editMode: false });
    }
  };

  public handleEdit = () => {
    this.setState({ editMode: true });
  };

  public handleMarkDone = () => {
    const { onMarkDone, todo } = this.props;

    onMarkDone(todo.id);
  };

  public handleMarkUndone = () => {
    const { onMarkUndone, todo } = this.props;

    onMarkUndone(todo.id);
  };

  public render() {
    const { todo, classes } = this.props;
    const { editMode, newContent, isError } = this.state;

    return (
      <Card data-test-id={todo.id}>
        <CardContent>
          {editMode ? (
            <TextField
              data-test-id={`${todo.id}-edit-content`}
              id="todo-content"
              value={newContent}
              margin="normal"
              onChange={this.handleTextChange}
              placeholder="Content (can't be blank)"
              error={isError}
              fullWidth={true}
            />
          ) : (
            <Typography variant="headline" component="h2">
              <span
                data-test-id={`${todo.id}-heading`}
                className={todo.doneAt ? classes.headingDone : ''}>
                {todo.content}
              </span>
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
          {todo.doneAt ? (
            <Typography variant="caption">
              Done at&nbsp;
              {moment(todo.doneAt).fromNow()}
            </Typography>
          ) : null}
        </CardContent>
        <CardActions>
          {(() => {
            if (editMode) {
              return (
                <Button
                  data-test-id={`${todo.id}-done`}
                  onClick={this.handleDone}>
                  Done
                </Button>
              );
            }
            return (
              <>
                <Button
                  data-test-id={`${todo.id}-edit-todo`}
                  onClick={this.handleEdit}>
                  Edit
                </Button>
                {!todo.doneAt ? (
                  <Button
                    data-test-id={`${todo.id}-mark-done`}
                    onClick={this.handleMarkDone}
                    color="primary">
                    Mark done
                  </Button>
                ) : (
                  <Button
                    data-test-id={`${todo.id}-mark-undone`}
                    onClick={this.handleMarkUndone}
                    color="primary">
                    Mark undone
                  </Button>
                )}
              </>
            );
          })()}
        </CardActions>
      </Card>
    );
  }
}

export default withStyles(todoStyles)(Todo);
