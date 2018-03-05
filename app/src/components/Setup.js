import React, { Component } from 'react'
import { connect } from 'react-redux'
import ToggleMetaMask from './ToggleMetaMask'
// import keytar from 'keytar'

/*
You know you've correctly set up your environment if your simple storage contract is working - you should be able to set and get the value in your smart contract. If not, somethings not right
*/

class Setup extends Component {
  constructor(props){
    super(props)
    this.state = {}
  }
  // addAccount(e, account,password){
  //   e.preventDefault()
  //   keytar.setPassword('backup', '0xcf4749f2f18f16e3aff7173d80977a2642d95302', 'c5d8095710a815086e551048b5e860ec0273762a5f53cbf081cf3e68d5fd0973')
  // }
  render(){
    return(
      <div>
        <h1>Test</h1>
        <ToggleMetaMask />
        <button onClick={this.addAccount}>Add Account</button>
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
