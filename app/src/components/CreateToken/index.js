import React, { Component } from 'react';
import { Button } from 'react-bootstrap'
import { connect } from 'react-redux'
import { checkAccountConfig } from '../../store/configuredAccount'
import './style.css'

class CreateToken extends Component {
  render(){
    let { configuredAccount } = this.props
    return(
      <div>
        <Button
          disabled={!configuredAccount}
          bsStyle="primary">Create Token
        </Button>
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    contract: state.contract,
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

export default connect(mapState, mapDispatchToProps)(CreateToken)
