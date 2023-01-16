import React, { useState } from "react";
import {
  MDBContainer,
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarToggler,
  MDBIcon,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBBtn,
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBDropdownItem,
  MDBCollapse,
  MDBInputGroup,
  MDBInput,
} from "mdb-react-ui-kit";

export default function Navbar() {
  const [showBasic, setShowBasic] = useState(false);

  return (
    <MDBNavbar expand="lg" light bgColor="light">
      <MDBContainer fluid>
        <MDBNavbarBrand href="#">
          <img src={"/public/logo.png"} height="50" />
        </MDBNavbarBrand>
        <MDBInputGroup
          className="d-flex justify-content-center"
          style={{ width: "50vw" }}
        >
          <MDBInput
            type="text"
            style={{
              width: "50vw",
              border: "1px solid #ced4da",
            }}
            placeholder="Search"
            aria-label="Search"
          />
        </MDBInputGroup>
        <MDBBtn
          color="primary"
          className="rounded-4 "
          // add spacing to the left of the button
          style={{ marginLeft: "1vw" }}
          type="button"
          role="button"
        >
          <MDBIcon icon="search" />
        </MDBBtn>

        <MDBNavbarToggler
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
          onClick={() => setShowBasic(!showBasic)}
        >
          <MDBIcon icon="bars" fas />
        </MDBNavbarToggler>
        <MDBCollapse navbar show={showBasic}>
          <MDBNavbarNav right fullWidth={false} className="mb-2 mb-lg-0">
            <MDBNavbarItem>
              <MDBNavbarLink active aria-current="page" href="#">
                Home
              </MDBNavbarLink>
            </MDBNavbarItem>
            <MDBNavbarItem>
              <MDBNavbarLink href="#">Link</MDBNavbarLink>
            </MDBNavbarItem>
            <MDBNavbarItem>
              <MDBNavbarLink href="#">Link</MDBNavbarLink>
            </MDBNavbarItem>
            <MDBNavbarItem>
              <MDBDropdown>
                <MDBDropdownToggle tag="a" className="nav-link">
                  Dropdown
                </MDBDropdownToggle>
                <MDBDropdownMenu right>
                  <MDBDropdownItem href="#">Action</MDBDropdownItem>
                  <MDBDropdownItem href="#">Another Action</MDBDropdownItem>
                  <MDBDropdownItem href="#">
                    Something else here
                  </MDBDropdownItem>
                  <MDBDropdownItem href="#">
                    Something else here
                  </MDBDropdownItem>
                </MDBDropdownMenu>
              </MDBDropdown>
            </MDBNavbarItem>
          </MDBNavbarNav>
        </MDBCollapse>
      </MDBContainer>
    </MDBNavbar>
  );
}
