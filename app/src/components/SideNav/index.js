import React, { Component } from 'react';
import { Nav, NavItem, Glyphicon } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap'
import './style.css'

class SideNav extends Component {
  constructor(){
    super();
    this.state = { selectedKey: "2" }
  }
  handleSelect(selectedKey){
    this.setState({ selectedKey })
  }
  render(){
    return(
      <div id="side-nav">
        <Nav bsStyle="pills" stacked activeKey={this.state.selectedKey} onSelect={this.handleSelect.bind(this)}>
          <LinkContainer to="/exchange" >
            <NavItem eventKey="1" title="exchange" className="side-nav-item">
              <Glyphicon glyph="inbox" className="side-nav-icon"/>
              Exchange
            </NavItem>
          </LinkContainer>

          <LinkContainer to="/create-note" >
            <NavItem eventKey="2" title="create-note" className="side-nav-item">
              <Glyphicon glyph="pencil" className="side-nav-icon"/>
              Create Note
            </NavItem>
          </LinkContainer>

          <LinkContainer to="/my-token-list" >
            <NavItem eventKey="3" title="my-token-list" className="side-nav-item">
              <Glyphicon glyph="record" className="side-nav-icon"/>
              My Tokens
            </NavItem>
          </LinkContainer>

          <LinkContainer to="/account" >
            <NavItem eventKey="4" title="Configure" className="side-nav-item">
              <Glyphicon glyph="user" className="side-nav-icon"/>
              Account
            </NavItem>
          </LinkContainer>
        </Nav>
      </div>
    )
  }
}

export default SideNav;
