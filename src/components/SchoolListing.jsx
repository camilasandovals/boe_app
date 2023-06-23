import { Col, Tab, Row, ListGroup, Accordion, Stack, Form } from "react-bootstrap";
import { useEffect, useRef, useState } from "react";
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

export default function SchoolListing() {
  const [searchTerm, setSearchTerm] = useState('');
  const [schools, setSchools] = useState('');

  useEffect(() => {
    fetch('http://localhost:3000/api/schools')
      .then(response => response.json())
      .then(data => setSchools(data))
      .catch(alert)
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filterTabs = (tabs) => {
    if (!searchTerm) {
      return tabs;
    }

    return tabs.filter((tab) => tab.name.toLowerCase().includes(searchTerm.toLowerCase()));
  };

  const tabRef = useRef(null);

  const handleTabClick = (eventKey) => {
    if (tabRef.current && window.innerWidth < 576) {
      const selectedTab = tabRef.current.querySelector(`[data-rb-event-key="${eventKey}"]`);
      if (selectedTab) {
        selectedTab.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <Tab.Container  defaultActiveKey='63c00d7afbff54dd5e32ef6e'>
      <Row className="schools-container">
        <Col className="p-0 overflow-auto" style={{ maxHeight: "704px" }} md={5} sm={12}>
          <ListGroup>
            <ListGroup.Item><h3>Find South Florida Training Programs</h3></ListGroup.Item>
            <input type="text" placeholder="Search" value={searchTerm} onChange={handleSearch} />
            <Stack direction="horizontal" gap={1}>
              <DropdownButton
                id="dropdown-button-dark-example2"
                variant="secondary"
                title="Type of program"
                className="mt-2"
                data-bs-theme="light">
                <Dropdown.Item >
                <Form.Check type="radio" aria-label="radio 1" />
                <small>Vocational school</small></Dropdown.Item>
                <Dropdown.Item >
                <Form.Check type="radio" aria-label="radio 1" />
                Apprenteship</Dropdown.Item>
              
              </DropdownButton>
              <DropdownButton
                id="dropdown-button-dark-example2"
                variant="secondary"
                title="Location"
                className="mt-2"
                data-bs-theme="light">
                <Dropdown.Item href="#/action-1" >Action</Dropdown.Item>
                <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
              </DropdownButton>

              <DropdownButton
                id="dropdown-button-dark-example2"
                variant="secondary"
                title="Industry"
                className="mt-2"
                data-bs-theme="light">
                <Dropdown.Item href="#/action-1" >Action</Dropdown.Item>
                <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
              </DropdownButton>
            </Stack>
            {(!schools)
              ? <p>Loading...</p>
              : filterTabs(schools).map((tab) => (
                <ListGroup.Item className="tab"
                  action
                  eventKey={tab._id}
                  key={tab._id}
                  ref={(el) => {
                    if (tab._id === '63c00d7afbff54dd5e32ef6e') {
                      tabRef.current = el;
                    }
                  }}
                  onClick={() => handleTabClick(tab._id)}
                >
                  <div style={{display:"flex"}}>
                    <div className="logo-wrapper">
                        <img src={tab.logoUrl} alt="School logo"/>
                    </div>
                    <div style={{textAlign:"left", marginLeft: 30}}>
                      <strong>{tab.name}</strong>
                      <div><small>{tab.type}</small></div>
                      <div><small>{tab.program}</small></div>
                      <div><small>{tab.location.city}</small></div>
                    </div>
                  </div>
                </ListGroup.Item>
              ))}
          </ListGroup>
        </Col>
        <Col  className="depth-listing" style={{ maxHeight: "704px" }} md={7} sm={8}>
          <Tab.Content style={{padding:40, textAlign:"left"}}>
            {(!schools)
              ? <p>Loading...</p>
              : schools.map((tab) => (
                <Tab.Pane eventKey={tab._id} key={tab._id}>
                  <div style={{display:"flex"}}>
                    <div className="logo-wrapper-depth">
                        <img src={tab.logoUrl} alt="School logo"/>
                    </div>
                    <div style={{textAlign:"left", marginLeft: 30}}>
                      <h2> <strong>{tab.name}</strong></h2>
                      <div><small>{tab.type}</small></div>
                      <div><small>{tab.location.city}</small></div>
                    </div>
                  </div>
                  <div style={{marginTop:30}}>
                    <div>
                      <h3>Description</h3>
                      <p>{tab.description}</p>
                    </div>
                    <div>
                      <h3>Program</h3>
                      <p>{tab.type}</p>
                    </div>
                    <div>
                      <h3>Contact</h3>
                      <p>{tab.pointOfContact.number}</p>
                      <p><a href={tab.pointOfContact.contactUrl} target="_blank">Request information</a></p>
                    </div>
                    <div style={{textAlign:"center"}}>
                    <button className="button-class">Apply now</button>
                    </div>
                  </div>
                </Tab.Pane>
              ))}
          </Tab.Content>
        </Col>
      </Row>
    </Tab.Container>
  );
}
