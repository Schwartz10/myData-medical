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
          <LinkContainer to="/inbox" >
            <NavItem eventKey="1" title="Configure" className="side-nav-item">
              <Glyphicon glyph="inbox" className="side-nav-icon"/>
              Inbox
            </NavItem>
          </LinkContainer>

          <LinkContainer to="/compose" >
            <NavItem eventKey="2" title="Store" className="side-nav-item">
              <Glyphicon glyph="pencil" className="side-nav-icon"/>
              Compose
            </NavItem>
          </LinkContainer>

          <LinkContainer to="/account" >
            <NavItem eventKey="3" title="Configure" className="side-nav-item">
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
