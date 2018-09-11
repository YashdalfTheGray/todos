import * as React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

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
      <div>
        {todos.map(t => (
          <Todo key={t.id} todo={t} />
        ))}
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoList);
