import React, { Component } from 'react';
import { Button, FormGroup } from 'react-bootstrap'
import { connect } from 'react-redux'
import { checkAccountConfig } from '../../store/configuredAccount'
import CreateAccountBtn from './CreateAccountBtn'
import ImportAccountSubmitBtn from './ImportAccountSubmitBtn'
import './style.css'

class Profile extends Component {
  constructor(){
    super()
    this.state = {
      isImporting: false
    }
    this.handleImport = this.handleImport.bind(this);
    this.handleImportSubmit = this.handleImportSubmit.bind(this);
  }
  handleImport = e => {
    e.preventDefault();
    this.setState({ isImporting: true })
  }
  handleImportSubmit = e => {
    e.preventDefault()
    console.log(e)
  }
  render(){
    let { isImporting } = this.state;
    return(
      <div id="account-config-options">
          <Button
            className="account-config-option"
            onClick={this.handleImport}
            bsStyle="warning">Import Account
          </Button>

          { !isImporting ?
          <CreateAccountBtn />
          :
          <ImportAccountSubmitBtn />
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
