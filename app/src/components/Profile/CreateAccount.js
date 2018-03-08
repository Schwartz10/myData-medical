import React, { Component } from 'react';
import { Button } from 'react-bootstrap'
import { connect } from 'react-redux'
import createIdentity from './ipcRendererEvents'

import './style.css'

const CreateAccount = (props) => {
  chrome.ipcRenderer.once('created-new-identity',
    (event, configured) => {
      console.log(configured)
  })
  return(
  <Button
    className="account-config-option"
    onClick={createIdentity}
    bsStyle="info">
  Create New Account
  </Button>
  )
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    accounts: state.accounts,
    configuredAccount: state.configuredAccount
  }
}

function mapDispatchToProps(dispatch){
  return {
    checkConfig: function (address){
      return dispatch(checkAccountConfig(address))
    }
  }
}

export default connect(mapState, mapDispatchToProps)(CreateAccount)


