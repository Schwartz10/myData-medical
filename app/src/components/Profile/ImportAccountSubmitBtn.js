import React from 'react';
import { Button,
  Form,
  FormGroup,
  InputGroup,
  FormControl } from 'react-bootstrap'
import { connect } from 'react-redux'
import createIdentity from './ipcRendererEvents'
import { setNewConfig } from '../../store/configuredAccount'

import './style.css'

const ImportAccountSubmitBtn = (props) => {
  // chrome.ipcRenderer.once('imported-identity',
  //   (event, address) => {
  //     props.createdIdentity(address)
  // })
  return(
    <Form
      className="account-config-option"
      onSubmit={props.importedIdentity}
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
    importedIdentity: function (e){
      e.preventDefault()
      console.log(e.target.elements.privateKey.value)
      return dispatch(setNewConfig('test'))
    }
  }
}

export default connect(mapState, mapDispatchToProps)(ImportAccountSubmitBtn)


