import React from 'react'
import {Route, Switch, Router} from 'react-router-dom'
import history from '../history';
import DragAndDrop from './DragAndDrop';
import ToggleMetaMask from './ToggleMetaMask';
import EncryptAndDecrypt from './EncryptAndDecrypt';

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
        <EncryptAndDecrypt />
      </div>
  </Router>

export default Routes;
