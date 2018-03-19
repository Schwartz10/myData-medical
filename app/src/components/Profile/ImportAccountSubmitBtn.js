import React, { Component } from 'react';
import { Button,
  Form,
  FormGroup,
  InputGroup,
  FormControl } from 'react-bootstrap'
import { connect } from 'react-redux'
import { importIdentity } from './ipcRendererEvents'
import { setNewConfig } from '../../store/configuredAccount'

import './style.css'

class ImportAccountSubmitBtn extends Component {
  componentDidMount(){
    chrome.ipcRenderer.on('imported-identity',
    (event, address) => {
      this.props.importedIdentity(address)
    })
  }
  componentWillUnmount(){
    chrome.ipcRenderer.removeAllListeners('imported-identity')
  }
  render(){
    return(
      <Form
        className="account-config-option"
        onSubmit={importIdentity}
      >
        <InputGroup>
          <FormControl
            label="privateKey"
            type="password"
          />
          <InputGroup.Button>
            <Button
              type="submit"
            >Import
            </Button>
          </InputGroup.Button>
        </InputGroup>
      </Form>
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
    importedIdentity: function (address){
      return dispatch(setNewConfig(address))
    }
  }
}

export default connect(mapState, mapDispatchToProps)(ImportAccountSubmitBtn)


