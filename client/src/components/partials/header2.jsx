import React, { useState } from "react";
import { Navbar, Container, Row, Col, NavItem, Nav } from "react-bootstrap";
import NavMenu from "./navMenu";

function Header() {

  const [sideNavClass, setSideNavClass] = useState("");

  function openNav() {
    setSideNavClass("sidenavOpen");
    document.getElementById("main").style.marginLeft = "100%";
    document.getElementById("mySidenav").style.width = "103%";
  }

  /* Set the width of the side navigation to 0 and the left margin of the page content to 0, and the background color of body to white */
  function closeNav() {
    setSideNavClass("sidenavClose");
    setTimeout(() => {
      document.getElementById("mySidenav").style.width = "0";
      document.getElementById("main").style.marginLeft = "0";
    }, 200);
  }

  return  <FullScreen openNav={openNav} closeNav={closeNav} sideNavClass={sideNavClass} />
    // <div style={{ width: "100%" }}>
    //   <Navbar className="p-3" style={{ padding: "0" }} bg="" expand="lg">
    //     <Container>
    //       <Navbar.Brand href="/" className="">
    //         {" "}
    //         <img src="./logo.png" className="brandLogo" />
    //       </Navbar.Brand>
    //       <Navbar.Toggle onClick={openNav} aria-controls="basic-navbar-nav" />
    //       <Navbar.Collapse id="basic-navbar-nav">
    //         <Nav className="ms-auto">
    //           <Nav.Link href="/">
    //             Map
    //           </Nav.Link>
    //           <Nav.Link  href="/list">
    //             List
    //           </Nav.Link>
    //           <Nav.Link href="/about">
    //             About
    //           </Nav.Link>
    //           <Nav.Link href="/contact">
    //             Contact
    //           </Nav.Link>
    //           <Nav.Link className="addMarker" href="/add">
    //             <div className="addMarkerText">+</div>
    //           </Nav.Link>
    //         </Nav>
    //       </Navbar.Collapse>
    //     </Container>
    //   </Navbar>

    //   <Row id="mySidenav" className="sidenav">
    //     <Col className={sideNavClass} sm={colSize.wrap}></Col>
    //     <Col className="sidenavContent" sm={colSize.content}>
    //       <div
    //         className="navHeader text-center"
    //         style={{ borderBottom: "1px solid black", position: "relative" }}
    //       >
    //         <a className="closebtn" onClick={closeNav}>
    //           &times;
    //         </a>
    //       </div>
    //     </Col>
    //   </Row>
    //   <div id="main" hidden></div>
    // </div>
}


const FullScreen = (props) => {
 
    
    return  <div style={{ width: "100%" }}>
      <Navbar className="p-3" style={{ padding: "0" }} bg="" expand="lg">
        <Container>
          <Navbar.Brand href="/" className="">
            {" "}
            <img src="./logo.png" className="brandLogo" />
          </Navbar.Brand>
            <Nav className="ms-auto">
              <Nav.Link  className="me-2" href="/">
                Map
              </Nav.Link>
              <Nav.Link className="me-2" href="/list">
                List
              </Nav.Link>
              <Nav.Link className="me-2" href="/about">
                About
              </Nav.Link>
              <Nav.Link className="me-5" href="/contact">
                Contact
              </Nav.Link>
              <div className="addMarker" onClick={props.openNav} >
                <div className="addMarkerText">+</div>
              </div>
            </Nav>
        </Container>
      </Navbar>

      <Row id="mySidenav" className="sidenav">
        <Col md="6" lg="7" xl="8" ></Col>
        <Col  md="6" lg="5" xl="4" className="sidenavContent">
        <Container>
        <NavMenu closeNav={props.closeNav} />
        </Container>
        </Col>
      </Row>
      <div id="main" hidden></div>
    </div>
}



export default Header;


