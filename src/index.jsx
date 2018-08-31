import React from 'react';
import ReactDOM from 'react-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import { hot } from 'react-hot-loader';

import App from './components/App';
import initFirebase from './initializeFirebase';

initFirebase();

const AppFrame = hot(module)(() => (
  <React.Fragment>
    <CssBaseline>
      <App />
    </CssBaseline>
  </React.Fragment>
));

ReactDOM.render(<AppFrame />, document.querySelector('div#app-root'));
