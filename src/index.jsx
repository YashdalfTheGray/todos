import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import CssBaseline from '@material-ui/core/CssBaseline';
import { hot } from 'react-hot-loader';

import App from './components/App';
import initFirebase from './firebase';
import store from './redux';

initFirebase();

const AppFrame = hot(module)(() => (
  <React.Fragment>
    <CssBaseline>
      <Provider store={store}>
        <App />
      </Provider>
    </CssBaseline>
  </React.Fragment>
));

ReactDOM.render(<AppFrame />, document.querySelector('div#app-root'));
