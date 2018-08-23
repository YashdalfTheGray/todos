import React from 'react';
import ReactDOM from 'react-dom';
import Button from '@material-ui/core/Button';
import { hot } from 'react-hot-loader';

const App = hot(module)(() => (
  <Button variant="contained" color="secondary">
    Hello World
  </Button>
));

ReactDOM.render(<App />, document.querySelector('div#app-root'));
