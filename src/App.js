import './sass/App.scss';

import React, { useState } from 'react';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";

import Main from './components/main';

const App = () => {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/">
            <Main />
          </Route>
          <Route path="*">
            <div>
              404 error
            </div>
            {/* <NoMatch /> */}
          </Route>
        </Switch>
      </Router>
    </div>
  );
};

export default App;
