import { Navbar, Container, Nav } from "react-bootstrap"
import { Link } from "react-router-dom"
export default function NavMenu() {
    return(
        <Navbar fixed='top' className="p-0 nav" variant="dark" expand="md">
        <Container>
          <Navbar.Brand href="#home"><img src="./images/boe.png" alt="BOE logo" height="50"/>
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="navbar-nav" />
          <Navbar.Collapse id="navbar-nav">
            <Nav className="ms-auto"> 
            {/* me-auto */}
              <Nav.Link as={Link}to="/">Home</Nav.Link>
              <Nav.Link as={Link}to="/about">About us</Nav.Link>
              <Nav.Link as={Link}to="/resources">Resources</Nav.Link>
              <Nav.Link as={Link}to="/profile">Profile</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    )
}