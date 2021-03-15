import './sass/App.scss';

import React, { useState } from 'react';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";

import Main from './components/main';

const App = () => {
  return (
    <div className="App">
      <Router>
        <Switch>
          {/* <Route
            // key={key}
            path={'/'}
            exact={true}
            render={(props) => {
              history.listen((location) => {
                lastLocation = location;
              });

              // monkey patching to prevent pushing same url into history stack
              const prevHistoryPush = history.push;
              history.push = (pathname, state = {}) => {
                if (
                  lastLocation === null ||
                  pathname !==
                    lastLocation.pathname + lastLocation.search + lastLocation.hash ||
                  JSON.stringify(state) !== JSON.stringify(lastLocation.state)
                ) {
                  prevHistoryPush(pathname, state);
                }
              };

              return <Main {...props} />;
            }}
          /> */}
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
