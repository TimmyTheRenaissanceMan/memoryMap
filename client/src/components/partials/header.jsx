import React, { useState, useEffect } from "react";
import { Navbar, Container, Row, Col, NavItem, Nav } from "react-bootstrap";
import NavMenu from "./navMenu";

function Header(props) {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [screenType, setScreenType] = useState();

  function reportWindowSize() {
    if (window.innerWidth > 795 && screenType == "mobile") {
      setScreenType("full");
    } else if (window.innerWidth <= 795 && screenType == "full") {
      setScreenType("mobile");
    }
  }

  if (props.windowWidth != windowWidth) {
    reportWindowSize();
    setWindowWidth(props.windowWidth);
  }

  useEffect(() => {
    window.innerWidth > 795 ? setScreenType("full") : setScreenType("mobile");
  }, []);

  const [sideNavClass, setSideNavClass] = useState("");

  function openNav() {
    setSideNavClass("sidenavOpen");
    document.getElementById("main").style.marginLeft = "100%";
    document.getElementById("mySidenav").style.width = "100%";
  }

  /* Set the width of the side navigation to 0 and the left margin of the page content to 0, and the background color of body to white */
  function closeNav() {
    setSideNavClass("sidenavClose");
    setTimeout(() => {
      document.getElementById("mySidenav").style.width = "0";
      document.getElementById("main").style.marginLeft = "0";
    }, 500);
  }

  return window.location.pathname == "/" ?(
   screenType == "full" ? (
    <FullScreen
      openNav={openNav}
      closeNav={closeNav}
      sideNavClass={sideNavClass}
    />
  ) : (
    <MobileScreen
      openNav={openNav}
      closeNav={closeNav}
      sideNavClass={sideNavClass}
    />
  )
  ) : 
  (<AutoHeader />)
}

const FullScreen = (props) => {
  return (
    <div className="mapHeaderContainer" style={{ width: "100%" }}>
      <Navbar className="p-3" style={{ padding: "0" }} bg="" expand="sm">
        <Container>
          <Navbar.Brand href="/" className="">
            {" "}
            <img src="./logo.png" className="brandLogo" />
          </Navbar.Brand>
          <Nav className="ms-auto">
            <Nav.Link className="me-2" href="/">
              Map
            </Nav.Link>
            <Nav.Link className="me-2" href="/list">
              List
            </Nav.Link>
            <Nav.Link className="me-2" href="/">
              About
            </Nav.Link>
            <Nav.Link className="me-5" href="/">
              Contact
            </Nav.Link>
            <div className="addMarker" onClick={props.openNav}>
              <div className="addMarkerText">+</div>
            </div>
          </Nav>
        </Container>
      </Navbar>

      <Row id="mySidenav" className="sidenav">
        <Col md="6" lg="7" xl="8"></Col>
        <Col md="6" lg="5" xl="4" className="sidenavContent">
          <Container>
            <NavMenu closeNav={props.closeNav} />
          </Container>
        </Col>
      </Row>
      <div id="main" hidden></div>
    </div>
  );
};

const MobileScreen = (props) => {
  return (
    <div className="mapHeaderContainer" style={{ width: "100%" }}>
      <Navbar
        className="p-3"
        style={{ padding: "0", pointerEvents: "none" }}
        bg=""
        expand="lg"
      >
        <Container>
          <Navbar.Brand href="/" className="">
            {" "}
            <img src="./logo.png" className="brandLogo" />
          </Navbar.Brand>
          <Nav className="ms-auto">
            <Nav.Link href="/" style={{ pointerEvents: "visible" }}>
              Map
            </Nav.Link>
            <Nav.Link href="/list" style={{ pointerEvents: "visible" }}>
              List
            </Nav.Link>
            <Nav.Link href="/" style={{ pointerEvents: "visible" }}>
              About
            </Nav.Link>
            <Nav.Link href="/" style={{ pointerEvents: "visible" }}>
              Contact
            </Nav.Link>
            <div
              className="addMarker mt-3"
              onClick={props.openNav}
              style={{ pointerEvents: "visible" }}
            >
              <div className="addMarkerText">+</div>
            </div>
          </Nav>
        </Container>
      </Navbar>

      <Row id="mySidenav" className="sidenav">
        <Col md="6" lg="7" xl="8"></Col>
        <Col md="6" lg="5" xl="4" className="sidenavContent">
          <Container>
            <NavMenu closeNav={props.closeNav} />
          </Container>
        </Col>
      </Row>
      <div id="main" hidden></div>
    </div>
  );
};

// HEADER THAT'S USED ON ALL THE PAGES OTHER THAN MAP
const AutoHeader = () => {

  return  <div style={{ width: "100%" }}>
      <Navbar
        className=" p-3 bg-white rounded"
        style={{ padding: "0" }}
        bg="light"
        expand="sm"
      >
        <Container>
        <Navbar.Brand href="/" className="">
            {" "}
            <img src="./logo.png" className="brandLogo" />
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="ms-auto">

          <Nav.Link href="/" style={{ pointerEvents: "visible" }}>
              Map
            </Nav.Link>
            <Nav.Link href="/list" style={{ pointerEvents: "visible" }}>
              List
            </Nav.Link>
            <Nav.Link href="/" style={{ pointerEvents: "visible" }}>
              About
            </Nav.Link>
            <Nav.Link href="/" style={{ pointerEvents: "visible" }}>
              Contact
            </Nav.Link>
            </Nav>
            </Navbar.Collapse>

        </Container>
      </Navbar>
    </div>
}

export default Header;
