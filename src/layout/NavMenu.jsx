import { useContext } from "react"
import { Navbar, Container, Nav, NavLink } from "react-bootstrap"
import { Link } from "react-router-dom"
import { UserContext } from "../App"
import { DoorClosedFill, DoorOpenFill, FileEarmarkTextFill, HouseDoorFill, PersonFill } from "react-bootstrap-icons"


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
              <Nav.Link as={Link}to="/about"><div className="text-center"><HouseDoorFill /></div><div>Home</div></Nav.Link>
              <Nav.Link as={Link}to="/resources"><div className="text-center"><FileEarmarkTextFill /></div><div>Resources</div></Nav.Link>
              {user ? (
                <Nav.Link as={Link}to="/profile"><div className="text-center"><PersonFill size={19}/></div><div>Profile</div></Nav.Link>) : ""}
              {user ? (
                <Nav.Link as={Link} to="/login" onClick={handleLogout}><div className="text-center"><DoorOpenFill /></div><div>Logout</div></Nav.Link>
                ): (
                  <NavLink as={Link} to="/login"><div className="text-center"><DoorClosedFill /></div><div>Login</div></NavLink>
                )
              }
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    )
}