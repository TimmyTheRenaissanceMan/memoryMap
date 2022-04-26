import {Container, Navbar, NavDropdown, Nav} from 'react-bootstrap/';
import SideNavBar from "./sideNavBar";

export default function Header(){
    return <Navbar bg="" expand="lg">
    <Container>
      <Navbar.Brand href=""><img className="brandLogo" src="/logo.png"/></Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ms-auto">
          <Nav.Link className="interText" href="/">Map</Nav.Link>
          <Nav.Link className="interText" href="/list">List</Nav.Link>
          <Nav.Link className="interText" href="/about">About</Nav.Link>
          <Nav.Link className="interText" href="/contact">Contact</Nav.Link>
          <Nav.Link className="interText" href="/add">Add</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Container>
    <SideNavBar />
  </Navbar>
}
