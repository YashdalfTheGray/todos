import * as React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: 'Todos'
    };
  }

  render() {
    const { title } = this.state;
    const styles = {
      root: { flexGrow: 1 },
      toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }
    };
    return (
      <div className={styles.root}>
        <AppBar position="static" color="primary">
          <Toolbar style={{ ...styles.toolbar }}>
            <Typography variant="title" color="inherit">
              {title}
            </Typography>
            <IconButton color="inherit" aria-label="Add">
              <AddIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}
