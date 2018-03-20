import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Modal, Button, FormGroup, ControlLabel, FormControl } from 'react-bootstrap'
import { reEncrypt, openMetamaskNotification } from './ipcRendererEvents'

class TransferModal extends Component {
  constructor(){
    super();
    this.state = { addressTo: '0x00..', publicKeyTo: '0x00..' }
  }
  componentDidMount(){
    // listener
    chrome.ipcRenderer.on('reEncrypted', this.transferToken.bind(this))
  }
  componentWillUnmount(){
    // unsubscribe
    chrome.ipcRenderer.removeAllListeners('reEncrypted');
  }
  prepareForTransfer = e => {
    e.preventDefault();
    reEncrypt(this.props.configuredAccount, this.state.addressTo, this.state.publicKeyTo, this.props.token.encryptedData)
  }
  transferToken = async (e, newData, addressFrom, addressTo) => {
    // calls smart contract function to transfer the token
    this.props.contract.transfer(addressTo, this.props.token[1], {from: this.props.configuredAccount});
    openMetamaskNotification();
    this.props.hide();
  }
  handleChange = (e, field) => {
    e.preventDefault();
    const newStateObj = {};
    newStateObj[field] = e.target.value;
    this.setState(newStateObj);
  }
  render(){
    return(
      <div className="static-modal">
        <Modal show={this.props.show}>
          <Modal.Header>
            <Modal.Title>Transfer Token</Modal.Title>
          </Modal.Header>
            <Modal.Body>
              <FormGroup>
                <ControlLabel>Recipient's Address</ControlLabel>{' '}
                <FormControl onChange={(e) => this.handleChange(e, 'addressTo')} type="text" placeholder={this.state.addressTo} />
              </FormGroup>{' '}

              <FormGroup>
                <ControlLabel>Recipient's Public Key</ControlLabel>{' '}
                <FormControl onChange={(e) => this.handleChange(e, 'publicKeyTo')} type="text" placeholder={this.state.publicKeyTo} />
              </FormGroup>{' '}
            </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.props.hide}>Close</Button>
            <Button onClick={this.prepareForTransfer} bsStyle="primary">Transfer</Button>
          </Modal.Footer>
        </Modal>
      </div>
    )
  }
}

function mapState(state){
  return {
    contract: state.contract,
    configuredAccount: state.configuredAccount
  }
}

function mapDispatch(dispatch){
  return {

  }
}


export default connect(mapState, mapDispatch)(TransferModal);
