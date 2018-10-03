import * as React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import withStyles from '@material-ui/core/styles/withStyles';
import * as PropTypes from 'prop-types';
import { connect } from 'react-redux';

import TodoList from './TodoList';
import AddTodo from './AddTodo';
import todoActions from '../redux/actions';
import * as todoSelectors from '../redux/selectors';

const createTodoSlice = 'createTodo';

const mapStateToProps = state => ({
  isProcessingCreateTodo: todoSelectors.getIsProcessingByApi(
    state,
    createTodoSlice
  ),
  createTodoError: todoSelectors.getApiErrorByApi(state, createTodoSlice)
});

const mapDispatchToProps = {
  createTodo: todoActions.createTodo
};

const appStyles = theme => ({
  root: { flexGrow: 1 },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  fab: {
    position: 'absolute',
    bottom: theme.spacing.unit * 2,
    right: theme.spacing.unit * 2
  }
});

class App extends React.Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    createTodo: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      title: 'Todos',
      isAddDialogOpen: false
    };
  }

  handleTodoAdd = () => {
    this.setState({
      isAddDialogOpen: true
    });
  };

  handleDialogClose = text => {
    const { createTodo } = this.props;

    this.setState({
      isAddDialogOpen: false
    });

    createTodo(text);
  };

  render() {
    const { title, isAddDialogOpen } = this.state;
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <AppBar position="static" color="primary">
          <Toolbar className={classes.toolbar}>
            <Typography variant="title" color="inherit">
              {title}
            </Typography>
          </Toolbar>
        </AppBar>
        <TodoList />
        <Button
          variant="fab"
          className={classes.fab}
          color="secondary"
          onClick={this.handleTodoAdd}>
          <AddIcon />
        </Button>
        <AddTodo open={isAddDialogOpen} onClose={this.handleDialogClose} />
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(appStyles)(App));
