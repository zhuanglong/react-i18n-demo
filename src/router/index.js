import React from 'react';
import {
  Router, Switch, Route, Link, Redirect
} from 'react-router-dom';

import history from '@/router/history';
import { IntlPro, ChooseLanguageButton } from '@/i18n/index.lazy';

import Home from '@/pages/Home';
import About from '@/pages/About';
import asyncComponent from './asyncComponent';

const CounterState = asyncComponent(() => import(/* webpackChunkName: "CounterState" */'@/pages/CounterState'));
const CounterHook = asyncComponent(() => import(/* webpackChunkName: "CounterHook" */'@/pages/CounterHook'));

function getRouter() {
  return (
    <IntlPro>
      {() => (
        <Router history={history}>
          <div>
            <ChooseLanguageButton />
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">About</Link></li>
              <li><Link to="/counterState">CounterState</Link></li>
              <li><Link to="/counterHook">CounterHook</Link></li>
            </ul>
            <hr />
            <Switch>
              <Route path="/" exact component={Home} />
              <Route path="/about" component={About} />
              <Route path="/counterState" component={CounterState} />
              <Route path="/counterHook" component={CounterHook} />
              <Redirect to="/" />
            </Switch>
          </div>
        </Router>
      )}
    </IntlPro>
  );
}

export default getRouter;
