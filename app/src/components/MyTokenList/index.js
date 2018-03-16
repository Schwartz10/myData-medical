import React, { Component } from 'react'
import { connect } from 'react-redux'
import SingleToken from './SingleToken'

import './style.css'

class MyTokenList extends Component {
  // constructor
  render(){
    return(
      <div id="my-token-list-page-container">
        <h3></h3>
        <div id='token-list-container'>
          {this.props.tokens.map((token,idx) => <SingleToken key={idx} token={token} />)}
        </div>
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
    tokens: state.myTokens
  }
}

function mapDispatchToProps(dispatch){
  return {

  }
}

export default connect(mapState, mapDispatchToProps)(MyTokenList)
