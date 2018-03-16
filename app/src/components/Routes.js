import React from 'react'
import {Route, Switch, Router} from 'react-router-dom'
import history from '../history';
import { Profile, SideNav, CreateNote, TokenList } from './';

const Routes = () =>
  <Router history={history}>
      <div>
        <div id='main-container'>
          <SideNav />
          <div id='action-container'>
            <Switch>
              <Route path='/account' component={Profile} />
              <Route path='/create-note' component={CreateNote} />
              <Route path='/my-token-list' component={TokenList} />
              <Route path='/' component={CreateNote} />
            </Switch>
          </div>
        </div>
      </div>
  </Router>

export default Routes;
