import React, { Component } from 'react';
import { Button } from 'react-bootstrap'
import { connect } from 'react-redux'
import './style.css'

class SendEmail extends Component {
  render(){
    return(
      <div>
        <Button bsStyle="primary">Send</Button>
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
    accounts: state.accounts
  }
}

export default connect(mapState)(SendEmail)
