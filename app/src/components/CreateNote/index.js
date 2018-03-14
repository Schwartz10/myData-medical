import React, { Component } from 'react'
import { connect } from 'react-redux'
import { CreateToken } from '../'
import { FormControl, Form, FormGroup, ControlLabel, InputGroup } from 'react-bootstrap'

import './style.css'

class CreateNote extends Component {
  constructor() {
    super()
    this.state = {
      name: "",
      gender: "",
      age: "21",
      medicalNotes: ""
    }
  }
  handleChange = (e, field) => {
    let newStateProp = {};
    newStateProp[field] = e.target.value;
    console.log('CHANGE', e.target.value)
    console.log('state', this.state)
    this.setState(newStateProp);
  }

  render() {
    return (
      <div id="note-creation-container">
        <h3>Create your medical note token!</h3>

        <Form inline>

          <FormGroup>
            <ControlLabel className="note-metadata-input">Patient Name</ControlLabel>{' '}
            <FormControl onChange={(e) => this.handleChange(e, 'name')} type="text" placeholder="Patient name" />
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

        <CreateToken />

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
  }
}

export default connect(mapState)(CreateNote)
