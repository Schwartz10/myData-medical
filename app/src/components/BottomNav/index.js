import React, { Component } from 'react';
import { Nav, NavItem, Glyphicon } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap'
import './style.css'

class BottomNav extends Component {
  constructor(){
    super();
    this.state = { selectedKey: "2" }
  }
  handleSelect(selectedKey){
    this.setState({ selectedKey })
  }

  render(){
    return(
      <div id="bottom-nav">
        <Nav bsStyle="pills" activeKey={this.state.selectedKey} onSelect={this.handleSelect.bind(this)}>
          <LinkContainer to="/setup" >
            <NavItem eventKey="1" title="Configure">
              <Glyphicon glyph="cog"/>
            </NavItem>
          </LinkContainer>

          <LinkContainer to="/store" >
            <NavItem eventKey="2" title="Store">
              <Glyphicon glyph="upload"/>
            </NavItem>
          </LinkContainer>

          <LinkContainer to="/about" >
            <NavItem eventKey="3" title="About">
              <Glyphicon glyph="info-sign"/>
            </NavItem>
          </LinkContainer>
        </Nav>
      </div>
    )
  }
}

export default BottomNav;
