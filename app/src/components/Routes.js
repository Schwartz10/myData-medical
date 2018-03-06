import React from 'react'
import {Route, Switch, Router} from 'react-router-dom'
import history from '../history';
import DragAndDrop from './DragAndDrop';
import BottomNav from './BottomNav';
import Setup from './Setup';

const Routes = () =>
  <Router history={history}>
      <div>
        <span>
          <h1 id="main-header">Backup your shit!</h1>
        </span>
        <div id='main-container'>
          <Switch>
            <Route path='/setup' component={Setup} />
            <Route path='/' component={DragAndDrop} />
          </Switch>
          <BottomNav />
        </div>
      </div>
  </Router>

export default Routes;
