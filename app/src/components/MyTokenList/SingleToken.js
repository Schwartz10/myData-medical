import React, { Component } from 'react'
import { connect } from 'react-redux'
import { ListGroup, ListGroupItem, Panel } from 'react-bootstrap'

const SingleToken = props =>
  <div>
    <Panel>
      <Panel.Heading>
        <Panel.Title toggle>
          {props.token[1]}
        </Panel.Title>
      </Panel.Heading>
      <Panel.Collapse>
        <Panel.Body>
          body goes here
        </Panel.Body>
      </Panel.Collapse>
    </Panel>
  </div>

function mapState(state){
  return {
    contract: state.contract
  }
}

function mapDispatch(dispatch){
  return {
  }
}


export default connect(mapState, mapDispatch)(SingleToken);
