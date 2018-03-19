import React, { Component } from 'react';
import { Button } from 'react-bootstrap'
import { connect } from 'react-redux'
import { checkAccountConfig } from '../../store/configuredAccount'
import { addToken } from '../../store/myTokens'
import { fetchPublicKey, openMetamaskNotification } from './ipcRendererEvents'
import { encryptWithPublicKey } from 'eth-crypto';
import { parseOutboundTokenData } from './utils'
import './style.css'

class CreateToken extends Component {
  getPublicKey = (data) => {
    fetchPublicKey(this.props.configuredAccount, data);
  }
  encryptAndCreate = async (event, publicKey, data) => {
    const { metadata, age, gender, medicalNotes } = parseOutboundTokenData(data);
    // encrypt the medical data
    let encrypted = await encryptWithPublicKey(publicKey, medicalNotes);
    encrypted = JSON.stringify(encrypted);
    // create note with public facing vars and the medical data
    const create = this.props.contract.createNote(age, metadata, gender, encrypted, {from: this.props.configuredAccount});
    // popup the metamask notification so the transaction can get approved
    openMetamaskNotification();

    // update the redux store with the receipt from the blockchain
    create.then(res => this.props.addToTokenList(res.logs[0].args))
    .catch(err => console.log(err));
  }
  componentDidMount(){
    // listener
    chrome.ipcRenderer.on('got-public-key', this.encryptAndCreate.bind(this));
  }
  componentWillUnmount(){
    // unsubscribe
    chrome.ipcRenderer.removeAllListeners('got-public-key');
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
      return dispatch(checkAccountConfig(address));
    },
    addToTokenList: function(tokenObj){
      return dispatch(addToken(tokenObj));
    }
  }
}

export default connect(mapState, mapDispatchToProps)(CreateToken)
