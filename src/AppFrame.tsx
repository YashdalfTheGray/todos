import * as React from 'react';
import { hot, setConfig } from 'react-hot-loader';
import { Provider } from 'react-redux';

import CssBaseline from '@material-ui/core/CssBaseline';

import App from './components/App';
import { initFirebase } from './firebase';
import store from './redux';

initFirebase();

setConfig({
  showReactDomPatchNotification: false,
});

const AppFrame = hot(module)(() => (
  <React.Fragment>
    <CssBaseline>
      <Provider store={store}>
        <App />
      </Provider>
    </CssBaseline>
  </React.Fragment>
));

export default AppFrame;
