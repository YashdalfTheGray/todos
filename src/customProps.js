import * as PropTypes from 'prop-types';

const TodoPropType = PropTypes.shape({
  id: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  createdAt: PropTypes.instanceOf(Date).isRequired,
  modifiedAt: PropTypes.instanceOf(Date).isRequired,
  doneAt: PropTypes.instanceOf(Date)
});

export default TodoPropType;
