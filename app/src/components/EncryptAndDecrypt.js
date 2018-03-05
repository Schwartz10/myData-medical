import React, { Component } from 'react'
import { connect } from 'react-redux'
import { encryptWithPublicKey, decryptWithPrivateKey } from 'eth-crypto';
import Wallet from 'ethereumjs-wallet'

class EncryptAndDecrypt extends Component {
  constructor() {
    super()
    this.state = { files: [], publicKey: "", encrypted: '', decrypted: '' }
  }

  componentDidMount(){

  }

  async decrypt(e) {
    e.preventDefault()
    //make sure to prepend the private key with 0x
    const privateKey = ''
    const decryption = JSON.parse(this.state.encrypted)
    const decrypted = await decryptWithPrivateKey(privateKey, decryption)
    this.setState({ decrypted })
  }

  async encrypt(e) {
    e.preventDefault()
    let encrypted = await encryptWithPublicKey(this.state.publicKey, 'test')
    encrypted = JSON.stringify(encrypted)
    this.setState({ encrypted })
  }

  getKey(e) {
    e.preventDefault()
    let privateKey = ''
    // turns privateKey into a buffer so the walletjs-eth module can get the public key
    privateKey = new Buffer(privateKey, 'hex')
    const wallet = Wallet.fromPrivateKey(privateKey)
    //removes the 0x from key for public key encryption
    let publicKey = wallet.getPublicKeyString().slice(2)
    this.setState({ publicKey })
  }

  render() {
    return (
      <div>
        <div>{this.state.publicKey}</div>
        <div>{this.state.encrypted}</div>
        <div>{this.state.decrypted}</div>
        <button onClick={this.encrypt.bind(this)}>Encrypt</button>
        <button onClick={this.decrypt.bind(this)}>Decrypt</button>
        <button onClick={this.getKey.bind(this)}>get key</button>
        <button onClick={this.getAddress}>get address</button>
      </div>
    );
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

export default connect(mapState)(EncryptAndDecrypt)
