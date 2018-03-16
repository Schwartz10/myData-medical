import React, { Component } from 'react';
import { Button } from 'react-bootstrap'
import { connect } from 'react-redux'
import { checkAccountConfig } from '../../store/configuredAccount'
import { fetchPublicKey, openMetamaskNotification } from './ipcRendererEvents'
import { encryptWithPublicKey } from 'eth-crypto';
import { parseOutboundTokenData } from './utils'
import './style.css'

class CreateToken extends Component {
  getPublicKey = (configuredAccount, data) => {
    fetchPublicKey(configuredAccount, data);
  }
  encryptAndCreate = async (event, publicKey, data) => {
    // note we're not doing anything with name yet, but we will...
    const { metadata, age, gender, medicalNotes } = parseOutboundTokenData(data)
    // encrypt the medical data
    let encrypted = await encryptWithPublicKey(publicKey, medicalNotes);
    encrypted = JSON.stringify(encrypted);
    // create note with public facing vars and the medical data
    this.props.contract.createNote(age, metadata, gender, encrypted, {from: this.props.configuredAccount});
    // popup the metamask notification so the transaction can get approved
    openMetamaskNotification()
  }
  componentDidMount(){
    // listener
    chrome.ipcRenderer.on('got-public-key', this.encryptAndCreate.bind(this))
  }
  componentWillUnmount(){
    // unsubscribe
    chrome.ipcRenderer.removeListener('got-public-key', this.encryptAndCreate.bind(this))
  }
  render(){
    return(
      <div>
        <Button
          onClick={(e) => this.props.onClick(e, this.getPublicKey)}
          disabled={
            false
            /*disabled={!configuredAccount}*/
          }
          bsStyle="primary">Create Token
        </Button>
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
    configuredAccount: state.configuredAccount
  }
}

function mapDispatchToProps(dispatch){
  return {
    checkConfig: function (address){
      return dispatch(checkAccountConfig(address))
    }
  }
}

export default connect(mapState, mapDispatchToProps)(CreateToken)
