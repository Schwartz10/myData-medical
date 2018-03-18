import React, { Component } from 'react'
import { connect } from 'react-redux'
import { CreateToken } from '../'
import { FormControl, Form, FormGroup, ControlLabel, InputGroup } from 'react-bootstrap'

import './style.css'

class CreateNote extends Component {
  constructor() {
    super()
    this.state = {
      metadata: "",
      gender: "",
      age: "21",
      medicalNotes: ""
    }
  }
  handleChange = (e, field) => {
    let newStateProp = {};
    newStateProp[field] = e.target.value;
    this.setState(newStateProp);
  }
  handleClick = (e, func) => {
    e.preventDefault();
    // call the func with the input data
    func(JSON.stringify(this.state));
  }
  render() {
    return (
      <div id="note-creation-container">
        <h3>Create your medical note token!</h3>

        <Form inline>

          <FormGroup>
            <ControlLabel className="note-metadata-input">Note Metadata</ControlLabel>{' '}
            <FormControl onChange={(e) => this.handleChange(e, 'metadata')} type="text" placeholder="Note Metadata" />
          </FormGroup>{' '}

          <FormGroup>
            <ControlLabel className="note-metadata-input">Gender</ControlLabel>
            <FormControl
              onChange={(e) => this.handleChange(e, 'gender')}componentClass="select" placeholder="select"
            >
              <option value="select">select</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </FormControl>
          </FormGroup>{' '}

          <FormGroup>
            <ControlLabel className="note-metadata-input">Age</ControlLabel>
            <FormControl onChange={(e) => this.handleChange(e, 'age')} componentClass="select" placeholder="select">
              <option value="select">select</option>
              {new Array(100).fill(0).map((ele, i) =>
                <option key={i} value={i}>{i}</option>)}
            </FormControl>
          </FormGroup>{' '}

        </Form>

        <FormControl
          id="medical-notes-input-field"
          componentClass="textarea"
          placeholder="Medical Notes Go Here"
          onChange={(e) => this.handleChange(e, 'medicalNotes')}
        />

        <CreateToken onClick={this.handleClick}/>

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

export default connect(mapState)(CreateNote)
