import React from 'react'
import {Route, Switch, Router} from 'react-router-dom'
import history from '../history';
import DragAndDrop from './DragAndDrop';
import ToggleMetaMask from './ToggleMetaMask';

const Routes = () =>
  <Router history={history}>
      <div>
        <span>
          <h1 id="main-header">Backup your shit!</h1>
        </span>
        <Switch>
          <Route path='/' component={DragAndDrop} />
        </Switch>
        <ToggleMetaMask />
      </div>
  </Router>

export default Routes;
