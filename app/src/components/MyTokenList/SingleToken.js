import React, { Component } from 'react'
import { connect } from 'react-redux'
import { ListGroup, ListGroupItem, Panel, Button } from 'react-bootstrap'
import TransferModal from './TransferModal'

class SingleToken extends Component {
  constructor(){
    super();
    this.state = { showModal: false }
  }
  showModal = e => {
    e.preventDefault();
    this.setState({ showModal: true });
  }
  hideModal = e => {
    if (e) e.preventDefault();
    this.setState({ showModal: false })
  }
  render(){
    return(
      <div>
        <Panel bsStyle="primary">
          <Panel.Heading>
            <div id="panel-title-container">
              <Panel.Title id="panel-title" toggle>
                {this.props.token[2]}
              </Panel.Title>
              <Button onClick={this.showModal}>Transfer</Button>
            </div>
          </Panel.Heading>
          <Panel.Collapse>
            <Panel.Body>
              body goes here
            </Panel.Body>
          </Panel.Collapse>
        </Panel>
        <TransferModal token={this.props.token} hide={this.hideModal.bind(this)} show={this.state.showModal}/>
      </div>
    )
  }
}
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
