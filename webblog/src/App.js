import React from 'react';
import logo from './logo.svg';
import css from './App.less';
import MyRoute from './page/index';
function App() {
  return (
    <div className={css.App}>
      <MyRoute/>
    </div>
  );
}

export default App;
