import * as PropTypes from 'prop-types';

export const FirebaseDatePropType = PropTypes.shape({
  seconds: PropTypes.number.isRequired,
  nanoseconds: PropTypes.number.isRequired
});

export const TodoPropType = PropTypes.shape({
  id: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  createdAt: FirebaseDatePropType.isRequired,
  modifiedAt: FirebaseDatePropType.isRequired,
  doneAt: FirebaseDatePropType
});
