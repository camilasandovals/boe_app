import { useContext } from "react"
import { Navbar, Container, Nav, NavLink } from "react-bootstrap"
import { Link } from "react-router-dom"
import { UserContext } from "../App"
import { DoorClosedFill, DoorOpenFill, FileEarmarkTextFill, HouseDoorFill, PeopleFill, PersonFill } from "react-bootstrap-icons"


export default function NavMenu() {
  const [user, setUser] = useContext(UserContext)

  const handleLogout = () => {
    setUser(null)
    localStorage.removeItem("user")
  }
    return(
        <Navbar fixed='top' className="p-0 nav" variant="dark" expand="md">
        <Container>
          <Navbar.Brand href="/"><img src="./images/boe.png" alt="BOE logo" height="50"/>
            <span className="company-name">Bringing opportunities everywhere</span>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbar-nav" />
          <Navbar.Collapse id="navbar-nav">
            <Nav className="ms-auto">             
              <Nav.Link as={Link}to="/"><div className="nav-icon"><HouseDoorFill /></div><div>Home</div></Nav.Link>
              <Nav.Link as={Link}to="/about"><div className="nav-icon"><PeopleFill /></div><div>About</div></Nav.Link>
              <Nav.Link as={Link}to="/resources"><div className="nav-icon"><FileEarmarkTextFill /></div><div>Resources</div></Nav.Link>
              {user ? (
                <Nav.Link as={Link}to="/profile"><div className="nav-icon"><PersonFill size={19}/></div><div>Profile</div></Nav.Link>) : ""}
              {user ? (
                <Nav.Link as={Link} to="/login" onClick={handleLogout}><div className="nav-icon"><DoorOpenFill /></div><div>Logout</div></Nav.Link>
                ): (
                  <NavLink as={Link} to="/login"><div className="nav-icon"><DoorClosedFill /></div><div>Login</div></NavLink>
                )
              }
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    )
}