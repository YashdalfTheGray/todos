import * as React from 'react';

import { connect } from 'react-redux';

import AppBar from '@material-ui/core/AppBar';
import Fab from '@material-ui/core/Fab';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import Switch from '@material-ui/core/Switch';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import AddIcon from '@material-ui/icons/Add';

import { TodoActions } from '../redux/actions';
import { Visibility } from '../redux/constants';
import ITodoStoreShape from '../redux/ITodosStore';
import * as todoSelectors from '../redux/selectors';

import AddTodo from './AddTodo';
import TodoList from './TodoList';

const createTodoSlice = 'createTodo';

const mapStateToProps = (state: ITodoStoreShape) => ({
  isProcessingCreateTodo: todoSelectors.getIsProcessingByApi(
    state,
    createTodoSlice
  ),
  createTodoError: todoSelectors.getApiErrorByApi(state, createTodoSlice),
  visibility: todoSelectors.getVisibility(state)
});

const mapDispatchToProps = {
  createTodo: TodoActions.createTodo,
  setVisibilityAll: TodoActions.setVisibilityAll,
  setVisibilityOpen: TodoActions.setVisibilityOpen
};

const appStyles = (theme: Theme) =>
  createStyles({
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

type AppProps = ReturnType<typeof mapStateToProps> &
  typeof mapDispatchToProps &
  WithStyles<typeof appStyles>;

interface IAppState {
  title: string;
  isAddDialogOpen: boolean;
}

class App extends React.Component<AppProps, IAppState> {
  constructor(props: AppProps) {
    super(props);

    this.state = {
      title: 'Todos',
      isAddDialogOpen: false
    };
  }

  public handleTodoAdd = () => {
    this.setState({
      isAddDialogOpen: true
    });
  };

  public handleDialogClose = (text?: string) => {
    const { createTodo } = this.props;

    this.setState({
      isAddDialogOpen: false
    });

    if (typeof text === 'string') {
      createTodo(text);
    }
  };

  public handleChange = () => {
    const { setVisibilityAll, setVisibilityOpen, visibility } = this.props;

    if (visibility === Visibility.ALL) {
      setVisibilityOpen();
    } else {
      setVisibilityAll();
    }
  };

  public render() {
    const { title, isAddDialogOpen } = this.state;
    const { classes, visibility } = this.props;

    return (
      <div className={classes.root}>
        <AppBar position="static" color="primary">
          <Toolbar className={classes.toolbar}>
            <Typography variant="title" color="inherit">
              {title}
            </Typography>
            <span
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
              }}>
              <Typography color="inherit">All</Typography>
              <Switch
                data-test-id="visibility-toggle"
                checked={visibility === Visibility.OPEN}
                onChange={this.handleChange}
              />
              <Typography color="inherit">Open</Typography>
            </span>
          </Toolbar>
        </AppBar>
        <TodoList />
        <Fab
          data-test-id="add-todo"
          className={classes.fab}
          color="secondary"
          onClick={this.handleTodoAdd}>
          <AddIcon />
        </Fab>
        <AddTodo open={isAddDialogOpen} onClose={this.handleDialogClose} />
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(appStyles)(App));
