import * as React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import { withStyles } from '@material-ui/core/styles';
import Snackbar from '@material-ui/core/Snackbar';

import * as selectors from '../redux/selectors';
import todoActions from '../redux/actions';
import Todo from './Todo';
import constants from '../redux/constants';

const updateTodoSlice = 'updateTodo';
const getAllTodosSlice = 'getAllTodos';
const markTodoDoneSlice = 'markTodoDone';

const mapStateToProps = state => ({
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
  getAllTodos: todoActions.getAllTodos,
  updateTodo: todoActions.updateTodo,
  markTodoDone: todoActions.markTodoDone,
  markTodoUndone: todoActions.markTodoUndone
};

const TodoListStyles = {
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
};

class TodoList extends React.Component {
  static propTypes = {
    todos: PropTypes.arrayOf(PropTypes.object).isRequired,
    visibility: PropTypes.oneOf([...Object.values(constants.visibility)])
      .isRequired,
    getAllTodos: PropTypes.func.isRequired,
    updateTodo: PropTypes.func.isRequired,
    markTodoDone: PropTypes.func.isRequired,
    markTodoUndone: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired,
    isProcessingUpdate: PropTypes.bool.isRequired,
    isProcessingGetAllTodos: PropTypes.bool.isRequired,
    isProcessingMarkTodoDone: PropTypes.bool.isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      snackbarMessage: '',
      snackbarVisible: false
    };
  }

  componentDidMount() {
    const { getAllTodos } = this.props;
    getAllTodos();
  }

  componentDidUpdate(prevProps) {
    const { isProcessingGetAllTodos, isProcessingMarkTodoDone } = this.props;
    const {
      isProcessingGetAllTodos: prevProcessingGetAllTodos,
      isProcessingMarkTodoDone: prevProcessingMarkTodoDone
    } = prevProps;

    /* eslint-disable react/no-did-update-set-state */
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
    /* eslint-enable react/no-did-update-set-state */
  }

  handleClose = () => {
    this.setState({
      snackbarVisible: false
    });
  };

  render() {
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
                t =>
                  visibility === constants.visibility.open
                    ? t.doneAt === null
                    : t
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
          autoHideDuration={null}
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
)(withStyles(TodoListStyles)(TodoList));
