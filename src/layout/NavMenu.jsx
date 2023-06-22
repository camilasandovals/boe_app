import { useContext } from "react"
import { Navbar, Container, Nav, NavLink } from "react-bootstrap"
import { Link } from "react-router-dom"
import { UserContext } from "../App"

export default function NavMenu() {
  const [user, setUser] = useContext(UserContext)
  
  const handleLogout = () => {
    setUser(null)
  }
    return(
        <Navbar fixed='top' className="p-0 nav" variant="dark" expand="md">
        <Container>
          <Navbar.Brand href="/"><img src="./images/boe.png" alt="BOE logo" height="50"/>
            <span className="m-5">Bringing opportunities everywhere</span>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbar-nav" />
          <Navbar.Collapse id="navbar-nav">
            <Nav className="ms-auto"> 
              <Nav.Link as={Link}to="/">Home</Nav.Link>
              <Nav.Link as={Link}to="/about">About us</Nav.Link>
              <Nav.Link as={Link}to="/resources">Resources</Nav.Link>
              <Nav.Link as={Link}to="/profile">Profile</Nav.Link>
              {user ? (
                <Nav.Link as={Link} to="/login" onClick={handleLogout}>Logout</Nav.Link>
                ): (
                  <NavLink as={Link} to="/login">Login</NavLink>
                )
              }
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    )
}