import React, { Component } from 'react'
import { connect } from 'react-redux'
import { ListGroup, ListGroupItem, Panel } from 'react-bootstrap'

const SingleToken = props =>
  <div>
    <Panel id="collapsible-panel-example-2" defaultExpanded>
      <Panel.Heading>
        <Panel.Title toggle>
          {props.token}
        </Panel.Title>
      </Panel.Heading>
      <Panel.Collapse>
        <Panel.Body>
          Anim pariatur cliche reprehenderit, enim eiusmod high life
          accusamus terry richardson ad squid. Nihil anim keffiyeh
          helvetica, craft beer labore wes anderson cred nesciunt sapiente
          ea proident.
        </Panel.Body>
      </Panel.Collapse>
    </Panel>
  </div>

function mapState(state){
  return {
    tokens: state.myTokens
  }
}

function mapDispatch(dispatch){
  return {
  }
}


export default connect(mapState, mapDispatch)(SingleToken);
