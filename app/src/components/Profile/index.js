import React, { Component } from 'react';
import { Button,
  FormGroup,
  InputGroup,
  FormControl } from 'react-bootstrap'
import { connect } from 'react-redux'
import { checkAccountConfig } from '../../store/configuredAccount'
import CreateAccount from './CreateAccount'
import './style.css'

class Profile extends Component {
  constructor(){
    super()
    this.state = {
      isImporting: false
    }
    this.handleConfigDecision = this.handleConfigDecision.bind(this);
  }
  handleConfigDecision = (e, choice) => {
    e.preventDefault();
    if (choice === 'import') {
      this.setState({ isImporting: true })
    } else {
      // create identity
    }
  }
  render(){
    let { isImporting } = this.state;
    return(
      <div id="account-config-options">
        <Button
          className="account-config-option"
          onClick={(e) => this.handleConfigDecision(e, 'import')}
          bsStyle="warning">Import Account
        </Button>

        { !isImporting ?
        <CreateAccount />
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
