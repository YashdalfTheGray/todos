import * as React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import GridList from '@material-ui/core/GridList';

import * as selectors from '../redux/selectors';
import todoActions from '../redux/actions';
import Todo from './Todo';

const mapStateToProps = state => ({
  todos: selectors.getAllTodos(state)
});

const mapDispatchToProps = {
  getAllTodos: todoActions.getAllTodos
};

class TodoList extends React.Component {
  static propTypes = {
    todos: PropTypes.arrayOf(PropTypes.object).isRequired,
    getAllTodos: PropTypes.func.isRequired
  };

  componentDidMount() {
    const { getAllTodos } = this.props;
    getAllTodos();
  }

  render() {
    const { todos } = this.props;
    return (
      <GridList cols={2} spacing={16}>
        {todos.map(t => (
          <Todo key={t.id} todo={t} />
        ))}
      </GridList>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoList);
