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
            <NavItem eventKey="1" title="Configure" className="bottom-nav-item">
              <Glyphicon glyph="cog" className="bottom-nav-icon"/>
              Setup
            </NavItem>
          </LinkContainer>

          <LinkContainer to="/store" >
            <NavItem eventKey="2" title="Store" className="bottom-nav-item">
              <Glyphicon glyph="upload" className="bottom-nav-icon"/>
              Backup
            </NavItem>
          </LinkContainer>

          <LinkContainer to="/about" >
            <NavItem eventKey="3" title="About" className="bottom-nav-item">
              <Glyphicon glyph="info-sign" className="bottom-nav-icon"/>
              About
            </NavItem>
          </LinkContainer>
        </Nav>
      </div>
    )
  }
}

export default BottomNav;
