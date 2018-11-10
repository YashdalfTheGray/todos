import * as React from 'react';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import TextField from '@material-ui/core/TextField';

const addTodoStyles = (theme: Theme) =>
  createStyles({
    container: {
      display: 'flex',
      flexWrap: 'wrap'
    },
    todoTextField: {
      marginLeft: theme.spacing.unit,
      marginRight: theme.spacing.unit,
      flex: '1 1 auto'
    }
  });

interface IAddTodoProps {
  open: boolean;
  onClose: (todoText?: string) => void;
}

type AddTodoProps = IAddTodoProps & WithStyles<typeof addTodoStyles>;

interface IAddTodoState {
  todoText: string;
  isValid: boolean;
  touched: boolean;
}

class AddTodo extends React.Component<AddTodoProps, IAddTodoState> {
  constructor(props: AddTodoProps) {
    super(props);

    this.state = {
      todoText: '',
      isValid: false,
      touched: false
    };
  }

  public handleCreate = () => {
    this.validateInput().then(() => {
      const { onClose } = this.props;
      const { todoText, isValid } = this.state;

      if (isValid) {
        onClose(todoText);
        this.setState({
          todoText: '',
          isValid: false,
          touched: false
        });
      }
    });
  };

  public handleClose = () => {
    const { onClose } = this.props;

    onClose();
  };

  public handleCancel = () => {
    const { onClose } = this.props;

    this.setState({
      todoText: '',
      isValid: false,
      touched: false
    });

    onClose();
  };

  public handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      todoText: event.target.value
    });
  };

  public validateInput = () =>
    new Promise(resolve => {
      const { todoText } = this.state;

      this.setState(
        {
          touched: true,
          isValid: todoText.length !== 0
        },
        resolve
      );
    });

  public render() {
    const { classes, onClose, ...others } = this.props;
    const { todoText, isValid, touched } = this.state;

    return (
      <Dialog
        onClose={this.handleClose}
        aria-labelledby="add-todo-dialog-title"
        {...others}>
        <DialogTitle id="add-todo-dialog-title">Add a todo</DialogTitle>
        <DialogContent className={classes.container}>
          <TextField
            label="Text"
            error={touched ? !isValid : false}
            className={classes.todoTextField}
            value={todoText}
            onChange={this.handleTextChange}
            onBlur={this.validateInput}
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleCancel}>Cancel</Button>
          <Button onClick={this.handleCreate} color="primary">
            Create
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default withStyles(addTodoStyles)(AddTodo);
