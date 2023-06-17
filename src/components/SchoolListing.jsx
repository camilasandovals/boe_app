import { Col, Tab, Row, ListGroup } from "react-bootstrap";
import { useEffect, useState } from "react";

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

  return (
    <Tab.Container id="list-group-tabs-example" defaultActiveKey='63c00d7afbff54dd5e32ef6e'>
      <Row className="schools-container">
        <Col className="p-0 border-0" md={4} sm={12}>
          <ListGroup>
            <ListGroup.Item>Find South Florida Training Programs</ListGroup.Item>
            <input type="text" placeholder="Search" value={searchTerm} onChange={handleSearch} />
            {(!schools)
              ? <p>Loading...</p>
              : filterTabs(schools).map((tab) => (
                <ListGroup.Item action eventKey={tab._id} key={tab._id}>
                  {tab.name}
                </ListGroup.Item>
              ))}
          </ListGroup>
        </Col>
        <Col sm={8}>
          <Tab.Content>
            {(!schools)
              ? <p>Loading...</p>
              : schools.map((tab) => (
                <Tab.Pane eventKey={tab._id} key={tab._id}>
                  <h4>{tab.name}</h4>
                  <p>{tab.description}</p>
                  {/* Add other desired information from the 'tab' object */}
                </Tab.Pane>
              ))}
          </Tab.Content>
        </Col>
      </Row>
    </Tab.Container>
  );
}
