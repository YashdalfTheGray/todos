import * as React from 'react';
import * as PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import TextField from '@material-ui/core/TextField';
import withStyles from '@material-ui/core/styles/withStyles';

const addTodoStyles = theme => ({
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

class AddTodo extends React.Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      todoText: '',
      isValid: false,
      touched: false
    };
  }

  handleCreate = () => {
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

  handleCancel = () => {
    const { onClose } = this.props;

    this.setState({
      todoText: '',
      isValid: false,
      touched: false
    });

    onClose();
  };

  handleTextChange = event => {
    this.setState({
      todoText: event.target.value
    });
  };

  validateInput = () =>
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

  render() {
    const { classes, onClose, ...others } = this.props;
    const { todoText, isValid, touched } = this.state;

    return (
      <Dialog
        onClose={onClose}
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
