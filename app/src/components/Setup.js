import React, { Component } from 'react'
import { connect } from 'react-redux'
import ToggleMetaMask from './ToggleMetaMask'

/*
You know you've correctly set up your environment if your simple storage contract is working - you should be able to set and get the value in your smart contract. If not, somethings not right
*/

class Setup extends Component {
  constructor(props){
    super(props)
    this.state = {
    }
  }
  render(){
    return(
      <div>
        <h1>Test</h1>
        <ToggleMetaMask />
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

export default connect(mapState)(Setup)
