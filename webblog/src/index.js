import React from 'react';
import ReactDOM from 'react-dom';
import css from './index.less';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { configure } from 'mobx';

import { Provider } from 'mobx-react';
import Store from './store/storeClasee';
const stores = { Store };
ReactDOM.render(
  <Provider {...stores}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider >,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
