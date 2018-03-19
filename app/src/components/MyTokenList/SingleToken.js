import React, { Component } from 'react'
import { connect } from 'react-redux'
import { ListGroup, ListGroupItem, Panel, Button } from 'react-bootstrap'

const SingleToken = props =>
  <div>
    <Panel bsStyle="primary">
      <Panel.Heading>
        <div id="panel-title-container">
          <Panel.Title id="panel-title" toggle>
            {props.token[1]}
          </Panel.Title>
          <Button onClick={props.invokeTransfer}>transfer</Button>
        </div>
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
    invokeTransfer: function(e){
      e.preventDefault();
      console.log('clicked')
    }
  }
}


export default connect(mapState, mapDispatch)(SingleToken);
