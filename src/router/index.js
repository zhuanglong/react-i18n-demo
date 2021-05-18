import React from 'react';
import {
  Router, Switch, Route, Link, Redirect
} from 'react-router-dom';

import history from '@/router/history';
import { IntlPro, ChooseLanguageButton, supportLanguages } from '@/i18n/index';

import Home from '@/pages/Home';
import About from '@/pages/About';
import asyncComponent from './asyncComponent';

const CounterState = asyncComponent(() => import(/* webpackChunkName: "CounterState" */'@/pages/CounterState'));
const CounterHook = asyncComponent(() => import(/* webpackChunkName: "CounterHook" */'@/pages/CounterHook'));

const langKeys = supportLanguages.map((item) => item.tag).join('|');

function getRouter() {
  return (
    <IntlPro>
      {(props) => (
        <Router history={history}>
          <div>
            <ChooseLanguageButton />
            <ul>
              <li><Link to={`/${props.language}`}>Home</Link></li>
              <li><Link to={`/${props.language}/about`}>About</Link></li>
              <li><Link to={`/${props.language}/counterState`}>CounterState</Link></li>
              <li><Link to={`/${props.language}/counterHook`}>CounterHook</Link></li>
            </ul>
            <hr />
            <Switch>
              <Route path={`/(${langKeys})`} exact component={Home} />
              <Route path={`/(${langKeys})/about`} component={About} />
              <Route path={`/(${langKeys})/counterState`} component={CounterState} />
              <Route path={`/(${langKeys})/counterHook`} component={CounterHook} />
              <Redirect to={`/${props.language}`} />
            </Switch>
          </div>
        </Router>
      )}
    </IntlPro>
  );
}

export default getRouter;
