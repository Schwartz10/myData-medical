import React, { Component } from 'react';
import { Button } from 'react-bootstrap'
import { connect } from 'react-redux'
import { createIdentity } from './ipcRendererEvents'
import { setNewConfig } from '../../store/configuredAccount'

import './style.css'

class CreateAccountBtn extends Component {
  componentDidMount() {
    chrome.ipcRenderer.on('created-new-identity',
    (event, address) => {
      this.props.createdIdentity(address)
    })
  }
  componentWillUnmount() {
    chrome.ipcRenderer.removeAllListeners('created-new-identity')
  }
  render(){
    return(
      <Button
        className="account-config-option"
        onClick={createIdentity}
        bsStyle="info">
      Create New Account
      </Button>
    )
  }
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
    createdIdentity: function (address){
      return dispatch(setNewConfig(address))
    }
  }
}

export default connect(mapState, mapDispatchToProps)(CreateAccountBtn)


