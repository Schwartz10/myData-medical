import React, { Component } from 'react';
import { Button,
  FormGroup,
  InputGroup,
  FormControl } from 'react-bootstrap'
import { connect } from 'react-redux'
import { checkAccountConfig } from '../../store/configuredAccount'
import CreateAccountBtn from './CreateAccountBtn'
import './style.css'

class Profile extends Component {
  constructor(){
    super()
    this.state = {
      isImporting: false
    }
    this.handleImport = this.handleImport.bind(this);
  }
  handleImport = e => {
    e.preventDefault();
    this.setState({ isImporting: true })
  }
  render(){
    let { isImporting } = this.state;
    return(
      <div id="account-config-options">
        <Button
          className="account-config-option"
          onClick={this.handleConfigDecision}
          bsStyle="warning">Import Account
        </Button>

        { !isImporting ?
        <CreateAccountBtn />
        :
        <FormGroup className="account-config-option">
          <InputGroup>
            <FormControl
              label="private-key"
              type="password"
            />
            <InputGroup.Button>
              <Button>Import</Button>
            </InputGroup.Button>
          </InputGroup>
        </FormGroup>
        }
      </div>
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
    checkConfig: function (address){
      return dispatch(checkAccountConfig(address))
    }
  }
}

export default connect(mapState, mapDispatchToProps)(Profile)
