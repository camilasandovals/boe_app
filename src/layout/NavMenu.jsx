import { useContext, useState } from "react";
import { Navbar, Container, Nav, NavLink, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import { UserContext } from "../App";
import { useNavigate } from "react-router-dom";
import {
  DoorClosedFill,
  DoorOpenFill,
  FileEarmarkTextFill,
  HouseDoorFill,
  PeopleFill,
  PersonFill,
} from "react-bootstrap-icons";

export default function NavMenu() {
  const [showDropdown, setShowDropdown] = useState(false);

  const [user, setUser] = useContext(UserContext);
  const navigate = useNavigate();
  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("user");
    navigate("/");
  };
  return (
    <Navbar fixed="top" className="p-0 nav" variant="dark" expand="md">
      <Container>
        <Navbar.Brand href="/">
          <img src="/images/boe.png" alt="BOE logo" height="50" />
          <span className="company-name">
            Bringing Opportunities Everywhere
          </span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/">
              <HouseDoorFill />
              <div>Home</div>
            </Nav.Link>

            <Nav.Link as={Link} to="/about">
              <PeopleFill />
              <div>About</div>
            </Nav.Link>

            {/* <NavDropdown
              title={
                <span onClick={() => navigate("/about")}>
                  <PeopleFill />
                  <div>About Us</div>
                </span>
              }
              id="about-us-dropdown"
              show={showDropdown}
              onMouseEnter={() => setShowDropdown(true)}
              onMouseLeave={() => setShowDropdown(false)}
            > */}
            {/* <NavDropdown.Item
                className="about-us-dropdown"
                as={Link}
                to="/about#who-we-are"
              >
                Who we are
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/about#what-we-do">
                What we do
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/about#get-involved">
                Get involved
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/about#resources">
                Resources
              </NavDropdown.Item> 
            </NavDropdown>*/}

            {user ? (
              <Nav.Link as={Link} to="/profile">
                <PersonFill size={19} />
                <div>Account</div>
              </Nav.Link>
            ) : (
              ""
            )}
            {/* {user ? (
                <Nav.Link as={Link}to="/edit"><PencilFill size={19}/><div>Edit</div></Nav.Link>) : ""} */}
            {user ? (
              <Nav.Link as={Link} to="/login" onClick={handleLogout}>
                <DoorOpenFill />
                <div>Logout</div>
              </Nav.Link>
            ) : (
              <NavLink as={Link} to="/login">
                <DoorClosedFill />
                <div>Login</div>
              </NavLink>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
