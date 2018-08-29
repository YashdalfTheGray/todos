import React from 'react';
import ReactDOM from 'react-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import { hot } from 'react-hot-loader';
import firebase from 'firebase/app';
import 'firebase/database';

import App from './components/App';

firebase.initializeApp({
  apiKey: FIREBASE_API_KEY,
  authDomain: `${FIREBASE_PROJECT_ID}.firebaseapp.com`,
  databaseURL: `https://${FIREBASE_PROJECT_ID}.firebaseio.com`,
  projectId: `${FIREBASE_PROJECT_ID}`,
  messagingSenderId: FIREBASE_MESSAGING_ID
});

(async () => {
  const snapshot = await firebase
    .database()
    .ref('todos')
    .once('value');
  console.log(snapshot.val());
})();

const AppFrame = hot(module)(() => (
  <React.Fragment>
    <CssBaseline>
      <App />
    </CssBaseline>
  </React.Fragment>
));

ReactDOM.render(<AppFrame />, document.querySelector('div#app-root'));
