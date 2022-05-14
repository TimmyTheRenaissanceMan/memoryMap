import React, { useState, useEffect } from "react";
import { Navbar, Container, Row, Col, Nav } from "react-bootstrap";
import NavMenu from "./navMenu";
import store from "../../store";

function Header(props) {
  // Side nav class => class comes with animation => onchage opens/closes side nav bar
  const [sideNavClass, setSideNavClass] = useState("");

  //Screen width state
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [screenType, setScreenType] = useState();

  /* Listen to screen width changes that are passed from App.js => 
  adjust screen width state => adjust screen width type            */
  function reportWindowSize() {
    if (window.innerWidth > 795 && screenType === "mobile") {
      setScreenType("full");
    } else if (window.innerWidth <= 795 && screenType === "full") {
      setScreenType("mobile");
    }
  }

  if (props.windowWidth !== windowWidth) {
    reportWindowSize();
    setWindowWidth(props.windowWidth);
  }

  store.subscribe(()=> {
    if(store.getState().sideNavState === "open" && sideNavClass !== "sidenavOpen"){
      openNav();
    }
  })

  useEffect(() => {
    window.innerWidth > 795 ? setScreenType("full") : setScreenType("mobile");
  }, []);

  /* Check if marker exists: */
  /* No: alert the user*/ 
  /* Yes: set the width of the side navigation to 104% (due to z-index distortion) and the left margin of the page content to 100% */
  function openNav() {
    if(store.getState().marker.lat !== 0 && store.getState().marker.lmg !== 0){
      setSideNavClass("sidenavOpen");
    document.getElementById("main").style.marginLeft = "100%";
    document.getElementById("mySidenav").style.width = "104%";
    } else {
      window.alert("Please place a marker by click on the map")
    }
  }

  /* Set the width of the side navigation to 0 and the left margin of the page content to 0*/
  function closeNav() {
    store.dispatch({
      type: "closeSideNav"
    });
    setSideNavClass("sidenavClose");
    setTimeout(() => {
      document.getElementById("mySidenav").style.width = "0";
      document.getElementById("main").style.marginLeft = "0";
    }, 500);
  }

  return window.location.pathname === "/" ? (
    <MapHeader
      screenType={screenType}
      openNav={openNav}
      closeNav={closeNav}
      sideNavClass={sideNavClass}
    />
  ) : (
    <StandardHeader />
  );
}
// HEADER THAT IS USED ON HOME (MAP) PAGE
const MapHeader = (props) => {
  return (
    <div className="mapHeaderContainer" style={{ width: "100%" }}>
      <Navbar style={{ padding: "0", pointerEvents: "none" }} bg="" expand="md">
        <Container className="p-3">
          <Navbar.Brand href="/" className="">
            {" "}
            <img src="./logo.png" alt="brandLogo" className="brandLogo" />
          </Navbar.Brand>
          <Nav className="ms-auto">
            <Nav.Link
              className={props.screenType === "full" ? "me-2" : ""}
              href="/"
              style={{ pointerEvents: "visible" }}
            >
              Map
            </Nav.Link>
            <Nav.Link
              className={props.screenType === "full" ? "me-2" : ""}
              href="/list"
              style={{ pointerEvents: "visible" }}
            >
              List
            </Nav.Link>
            <Nav.Link
              className={props.screenType === "full" ? "me-2" : ""}
              href="/"
              style={{ pointerEvents: "visible" }}
            >
              About
            </Nav.Link>
            <Nav.Link
              className={props.screenType === "full" ? "me-5" : ""}
              href="/"
              style={{ pointerEvents: "visible" }}
            >
              Contact
            </Nav.Link>
            <div
              className={
                props.screenType === "full" ? "addMarker" : "addMarker mt-3"
              }
              onClick={props.openNav}
              style={{ pointerEvents: "visible" }}
            >
              <div className="addMarkerText">+</div>
            </div>
          </Nav>
        </Container>
      </Navbar>

      <Row id="mySidenav" className="sidenav">
        <Col md="6" lg="7" xl="8" xs="0" className="leftSidenav"></Col>
        <Col md="6" lg="5" xl="4" xs="12" className="sidenavContent">
          <Container>
            <NavMenu closeNav={props.closeNav} />
          </Container>
        </Col>
      </Row>
      <div id="main" hidden></div>
    </div>
  );
};

// HEADER THAT'S USED ON ALL THE PAGES OTHER THAN HOME (MAP) PAGE
const StandardHeader = () => {
  return (
    <div style={{ width: "100%" }}>
      <Navbar
        className="p-3 bg-white rounded"
        style={{ padding: "0" }}
        bg="light"
        expand="sm"
      >
        <Container>
          <Navbar.Brand href="/" className="">
            {" "}
            <img src="./logo.png" alt="brandLogo" className="brandLogo" />
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
  );
};

export default Header;
