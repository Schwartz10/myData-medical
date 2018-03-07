import React, { Component } from 'react'
import { connect } from 'react-redux'
import { SendEmail } from '../'
import { Editor } from 'react-draft-wysiwyg';
import { EditorState } from 'draft-js';
import { FormControl, InputGroup } from 'react-bootstrap'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import './style.css'

class Compose extends Component {
  constructor() {
    super()
    this.state = {
      editorState: EditorState.createEmpty(),
      to: "",
      subject: "",
    }
  }
  onEditorStateChange = (editorState) => {
    this.setState({
      editorState,
    });
  };
  handleChange = (e, field) => {
    let newStateProp = {};
    newStateProp[field] = e.target.value;
    this.setState(newStateProp);
  }

  render() {
    const { editorState, to, subject, hasAccount } = this.state
    return (
      <div>

        <InputGroup>
          <InputGroup.Addon>To</InputGroup.Addon>
          <FormControl
            type="text"
            value={to}
            onChange={(e) => this.handleChange(e, 'to')}
          />
        </InputGroup>

        <InputGroup>
          <InputGroup.Addon>Subject</InputGroup.Addon>
          <FormControl
            type="text"
            value={subject}
            onChange={(e) => this.handleChange(e, 'subject')}
          />
        </InputGroup>

        <Editor
          editorState={editorState}
          toolbarClassName="toolbarClassName"
          wrapperClassName="wrapperClassName"
          editorClassName="editorClassName"
          onEditorStateChange={this.onEditorStateChange}
        />
        <SendEmail active={this.props.configuredAccount}/>

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
    accounts: state.accounts,
    configuredAccount: state.configuredAccount
  }
}

export default connect(mapState)(Compose)
