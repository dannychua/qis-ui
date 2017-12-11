import React, { Component } from 'react';

import { Navbar, NavbarBrand, NavbarToggler, Collapse, Nav, NavItem, NavLink } from 'reactstrap';



class Header extends Component {

	constructor(props) {
		super(props);

		this.state = {
			isOpen: true
		}
	}

	render() {
		return (
		   <Navbar color="dark" dark expand="md">
		      <NavbarBrand><img src="/assets/brand/logo.png" width="30" height="30" className="d-inline-block align-top" alt="" /></NavbarBrand>
		      <NavbarBrand href="/">QIS Backend</NavbarBrand>
		      <NavbarToggler onClick={this.toggle} />
		      <Collapse isOpen={this.state.isOpen} navbar>
		        <Nav className="ml-auto" navbar>
		          <NavItem>
		            <a className="nav-link" to="/factory">DataFetcher</a>
		          </NavItem>
		          <NavItem>
		            <a className="nav-link" to="/explorer"></a>
		          </NavItem>
		        </Nav>
		      </Collapse>
		    </Navbar>
		)
	}

}

export default Header;
