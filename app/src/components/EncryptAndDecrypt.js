import React, { Component } from 'react'
import { connect } from 'react-redux'
import EthCrypto from 'eth-crypto';
import Wallet from 'ethereumjs-wallet'


class EncryptAndDecrypt extends Component {
  constructor() {
    super()
    this.state = { files: [], publicKey: "" }
  }

  componentDidMount(){

  }

  decrypt(e) {
    e.preventDefault()
    const privateKey = '8998113b848249101259e816338a001ebabced2aa28604f3a4f0974b4569c4e4'
  }

  async encrypt(e) {
    e.preventDefault()
    console.log('publivc key', this.state.publicKey)
    let encrypted = await EthCrypto.encryptWithPublicKey(this.state.publicKey, 'test')
    console.log(encrypted)
  }

  getKey(e) {
    e.preventDefault()
    let privateKey = '8998113b848249101259e816338a001ebabced2aa28604f3a4f0974b4569c4e4'
    privateKey = new Buffer(privateKey, 'hex')
    const wallet = Wallet.fromPrivateKey(privateKey)
    //removes the 0x from key and prepends 04 for public key encryption
    let publicKey = '04' + wallet.getPublicKeyString().slice(2)
    this.setState({ publicKey })
  }

  render() {
    return (
      <div>
        <div>{this.state.publicKey}</div>
        <button onClick={this.encrypt.bind(this)}>Encrypt</button>
        <button onClick={this.decrypt}>Decrypt</button>
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
