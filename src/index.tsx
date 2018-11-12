import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { hot } from 'react-hot-loader';
import { Provider } from 'react-redux';

import CssBaseline from '@material-ui/core/CssBaseline';

import App from './components/App';
import { initFirebase } from './firebase';
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
