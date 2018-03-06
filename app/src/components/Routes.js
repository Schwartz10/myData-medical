import React from 'react'
import {Route, Switch, Router} from 'react-router-dom'
import history from '../history';
import DragAndDrop from './DragAndDrop';
import SideNav from './SideNav';
import Setup from './Setup';
import SimpleStorage from './SimpleStorage'

const Routes = () =>
  <Router history={history}>
      <div>
        <span>
          <h1 id="main-header">Backup your shit!</h1>
        </span>
        <div id='main-container'>
          <SideNav />
          <Switch>
            <Route path='/setup' component={Setup} />
            <Route path='/' component={DragAndDrop} />
          </Switch>
          <SimpleStorage />
        </div>
      </div>
  </Router>

export default Routes;
