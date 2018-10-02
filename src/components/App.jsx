import * as React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import withStyles from '@material-ui/core/styles/withStyles';
import * as PropTypes from 'prop-types';

import TodoList from './TodoList';
import AddTodo from './AddTodo';

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
    classes: PropTypes.object.isRequired
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
    console.log(text);
    this.setState({
      isAddDialogOpen: false
    });
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

export default withStyles(appStyles)(App);
