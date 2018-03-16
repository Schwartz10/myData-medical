import React, { Component } from 'react'
import { connect } from 'react-redux'
import { ListGroup, ListGroupItem, Panel } from 'react-bootstrap'

import './style.css'

class MyTokenList extends Component {
  // constructor
  render(){
    return(
      <div id="my-token-list-page-container">
        <h3></h3>
        <div id='token-list-container'>
        {/*will map over items and display panels*/}
        <Panel>
          <Panel.Heading>Panel heading</Panel.Heading>
          <ListGroup>
            <ListGroupItem>Item 1</ListGroupItem>
            <ListGroupItem>Item 2</ListGroupItem>
            <ListGroupItem>...</ListGroupItem>
          </ListGroup>
        </Panel>
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
  }
}

function mapDispatchToProps(dispatch){
  return {

  }
}

export default connect(mapState, mapDispatchToProps)(MyTokenList)
