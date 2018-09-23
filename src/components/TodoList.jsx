import * as React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import { withStyles } from '@material-ui/core/styles';

import * as selectors from '../redux/selectors';
import todoActions from '../redux/actions';
import Todo from './Todo';

const updateTodoSlice = 'updateTodo';
const getAllTodosSlice = 'getAllTodos';

const mapStateToProps = state => ({
  todos: selectors.getAllTodos(state),
  isProcessingGetAllTodos: selectors.getIsProcessingByApi(
    state,
    getAllTodosSlice
  ),
  isProcessingUpdate: selectors.getIsProcessingByApi(state, updateTodoSlice)
});

const mapDispatchToProps = {
  getAllTodos: todoActions.getAllTodos,
  updateTodo: todoActions.updateTodo
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
    getAllTodos: PropTypes.func.isRequired,
    updateTodo: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired,
    isProcessingUpdate: PropTypes.bool.isRequired
  };

  componentDidMount() {
    const { getAllTodos } = this.props;
    getAllTodos();
  }

  render() {
    const { todos, classes, updateTodo, isProcessingUpdate } = this.props;
    return (
      <div className={classes.root}>
        <GridList
          className={classes.gridList}
          cols={3}
          spacing={8}
          cellHeight="auto">
          {todos.map(t => (
            <GridListTile key={t.id}>
              <Todo
                key={t.id}
                todo={t}
                onUpdate={updateTodo}
                isProcessingUpdate={isProcessingUpdate}
              />
            </GridListTile>
          ))}
        </GridList>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(TodoListStyles)(TodoList));
