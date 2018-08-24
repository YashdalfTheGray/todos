import * as React from 'react';
import { AppBar, Toolbar, Typography } from '@material-ui/core';

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
      root: { flexGrow: 1 }
    };

    return (
      <div className={styles.root}>
        <AppBar position="static" color="primary">
          <Toolbar>
            <Typography variant="title" color="inherit">
              {title}
            </Typography>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}
