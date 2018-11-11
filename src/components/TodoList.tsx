import * as React from 'react';

import { connect } from 'react-redux';

import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import Snackbar from '@material-ui/core/Snackbar';
import createStyles from '@material-ui/core/styles/createStyles';
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';

import { TodoActions } from '../redux/actions';
import { Visibility } from '../redux/constants';
import ITodoStoreShape from '../redux/ITodosStore';
import * as selectors from '../redux/selectors';

import Todo from './Todo';

const updateTodoSlice = 'updateTodo';
const getAllTodosSlice = 'getAllTodos';
const markTodoDoneSlice = 'markTodoDone';

const mapStateToProps = (state: ITodoStoreShape) => ({
  todos: selectors.getAllTodos(state),
  visibility: selectors.getVisibility(state),
  isProcessingGetAllTodos: selectors.getIsProcessingByApi(
    state,
    getAllTodosSlice
  ),
  isProcessingUpdate: selectors.getIsProcessingByApi(state, updateTodoSlice),
  isProcessingMarkTodoDone: selectors.getIsProcessingByApi(
    state,
    markTodoDoneSlice
  )
});

const mapDispatchToProps = {
  getAllTodos: TodoActions.getAllTodos,
  updateTodo: TodoActions.updateTodo,
  markTodoDone: TodoActions.markTodoDone,
  markTodoUndone: TodoActions.markTodoUndone
};

const todoListStyles = createStyles({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    margin: '16px'
  },
  gridList: {
    flex: '1 1 auto'
  }
});

type TodoListProps = ReturnType<typeof mapStateToProps> &
  typeof mapDispatchToProps &
  WithStyles<typeof todoListStyles>;

interface ITodoListState {
  snackbarMessage: string;
  snackbarVisible: boolean;
}

class TodoList extends React.Component<TodoListProps, ITodoListState> {
  constructor(props: TodoListProps) {
    super(props);

    this.state = {
      snackbarMessage: '',
      snackbarVisible: false
    };
  }

  public componentDidMount() {
    const { getAllTodos } = this.props;
    getAllTodos();
  }

  public componentDidUpdate(prevProps: TodoListProps) {
    const { isProcessingGetAllTodos, isProcessingMarkTodoDone } = this.props;
    const {
      isProcessingGetAllTodos: prevProcessingGetAllTodos,
      isProcessingMarkTodoDone: prevProcessingMarkTodoDone
    } = prevProps;

    if (
      (!prevProcessingGetAllTodos && isProcessingGetAllTodos) ||
      (!prevProcessingMarkTodoDone && isProcessingMarkTodoDone)
    ) {
      this.setState({
        snackbarMessage: 'Loading...',
        snackbarVisible: true
      });
    } else if (
      (prevProcessingGetAllTodos && !isProcessingGetAllTodos) ||
      (prevProcessingMarkTodoDone && !isProcessingMarkTodoDone)
    ) {
      this.setState({
        snackbarMessage: '',
        snackbarVisible: false
      });
    }
  }

  public handleClose = () => {
    this.setState({
      snackbarVisible: false
    });
  };

  public render() {
    const {
      todos,
      classes,
      updateTodo,
      markTodoDone,
      markTodoUndone,
      isProcessingUpdate,
      visibility
    } = this.props;
    const { snackbarMessage, snackbarVisible } = this.state;

    return (
      <>
        <div className={classes.root}>
          <GridList
            className={classes.gridList}
            cols={3}
            spacing={8}
            cellHeight="auto">
            {todos
              .filter(
                t => (visibility === Visibility.OPEN ? t.doneAt === null : t)
              )
              .map(t => (
                <GridListTile key={t.id}>
                  <Todo
                    key={t.id}
                    todo={t}
                    onUpdate={updateTodo}
                    onMarkDone={markTodoDone}
                    onMarkUndone={markTodoUndone}
                    isProcessingUpdate={isProcessingUpdate}
                  />
                </GridListTile>
              ))}
          </GridList>
        </div>
        <Snackbar
          data-test-id="loading-snackbar"
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left'
          }}
          open={snackbarVisible}
          onClose={this.handleClose}
          ContentProps={{
            'aria-describedby': 'message-id'
          }}
          message={<span id="message-id">{snackbarMessage}</span>}
        />
      </>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(todoListStyles)(TodoList));
