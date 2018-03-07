import React from 'react'
import {Route, Switch, Router} from 'react-router-dom'
import history from '../history';
import Compose from './Compose';
import SideNav from './SideNav';
import Setup from './Setup';

const Routes = () =>
  <Router history={history}>
      <div>
        <div id='main-container'>
          <SideNav />
          <div id='action-container'>
            <Switch>
              <Route path='/setup' component={Setup} />
              <Route path='/compose' component={Compose} />
              <Route path='/' component={Compose} />
            </Switch>
          </div>
        </div>
      </div>
  </Router>

export default Routes;
