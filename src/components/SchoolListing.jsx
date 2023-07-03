import { Col, Tab, Row, ListGroup, Accordion, Stack, Form, Modal, Button, InputGroup } from "react-bootstrap";
import { HeartFill, Search } from 'react-bootstrap-icons';
import { useEffect, useRef, useState } from "react";
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import "../styles/SchoolsModal.css"
import Apply from "./Apply";
import Favorites from "./Favorites";


export default function SchoolListing() {
  const [searchTerm, setSearchTerm] = useState('');
  const [schools, setSchools] = useState('');
  const [showModal, setShowModal] = useState(false); 
  const [selectedSchool, setSelectedSchool] = useState(null);
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [selectedIndustry, setSelectedIndustry] = useState('');

  useEffect(() => {
    fetch('http://localhost:3000/api/schools')
      .then(response => response.json())
      .then(data => setSchools(data))
      .catch(alert)
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleCitySelect = (city) => {
    setSelectedCity(city);
  };

  const handleTypeSelect = (type) => {
    setSelectedType(type);
  };

  const handleTypeIndustry = (industry) => {
    setSelectedIndustry(industry);
  };

  const filterTabs = (tabs) => {
    let filteredTabs = tabs;
    if (searchTerm) {
      filteredTabs = filteredTabs.filter((tab) => tab.name.toLowerCase().includes(searchTerm.toLowerCase()));
    }
    if (selectedCity) {
      filteredTabs = filteredTabs.filter((tab) => tab.location.city === selectedCity);
    }
    if (selectedType) {
      filteredTabs = filteredTabs.filter((tab) => tab.type === selectedType);
    }
    if (selectedIndustry) {
      filteredTabs = filteredTabs.filter((tab) => tab.industry === selectedIndustry);
    }

    
    return filteredTabs;
  };
  
  const tabRef = useRef(null);

  const handleTabClick = (school) => {
  if (window.innerWidth < 700) {
    setSelectedSchool(school);
    setShowModal(true);
  }
};


  const handleClose = () => setShowModal(false);
  const handleShow = (school) => {
    setSelectedSchool(school);
    setShowModal(true);
  };

  return (
    <Tab.Container  defaultActiveKey='63c00d7afbff54dd5e32ef6e'>
      <Row className="schools-container">
        <Col className="p-0 overflow-auto" style={{ maxHeight: "704px" }} md={5} sm={12}>
          <ListGroup className="border-list-group">
            <ListGroup.Item><h3>Find South Florida Training Programs</h3></ListGroup.Item>
            <InputGroup >
            <InputGroup.Text>
              <Search />
            </InputGroup.Text>
            <Form.Control 
              type="text" 
              placeholder="Search" 
              value={searchTerm} 
              onChange={handleSearch} 
            />
          </InputGroup>
            <Stack direction="horizontal" gap={1} className=" justify-content-center m-3">
            <DropdownButton
              id="dropdown-button-dark-example1"
              variant="secondary"
              title="Location"
              >
              {(!schools)
                ? <p>Loading...</p>
                : Array.from(new Set(schools.map((school) => school.location.city))).map((city) => (
                  <Dropdown.Item onClick={() => handleCitySelect(city)}>{city}</Dropdown.Item>
                ))}
            </DropdownButton>

            <DropdownButton
              id="dropdown-button-dark-example1"
              variant="secondary"
              title="Type of program"
              >
              {(!schools)
                ? <p>Loading...</p>
                : Array.from(new Set(schools.map((school) => school.type))).map((type) => (
                  <Dropdown.Item onClick={() => handleTypeSelect(type)}>{type}</Dropdown.Item>
                ))}
            </DropdownButton>

            <DropdownButton
              id="dropdown-button-dark-example1"
              variant="secondary"
              title="Industry"
              >
              {(!schools)
                ? <p>Loading...</p>
                : Array.from(new Set(schools.map((school) => school.industry))).map((industry) => (
                  <Dropdown.Item onClick={() => handleTypeIndustry(industry)}>{industry}</Dropdown.Item>
                ))}
            </DropdownButton>
            </Stack>

            {
              (!schools)
                ? <p>Loading...</p>
                : filterTabs(schools).length > 0
                ? filterTabs(schools).map((tab) => (
                  <ListGroup.Item className="tab"
                    action
                    eventKey={tab._id}
                    key={tab._id}
                    ref={(el) => {
                      if (tab._id === '63c00d7afbff54dd5e32ef6e') {
                        tabRef.current = el;
                      }
                    }}
                    onClick={() => {if(window.innerWidth <= 767) {handleShow(tab)} else {handleTabClick(tab._id)}}}
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
                      <Favorites />
                    </div>
                  </ListGroup.Item>
                ))
                : <p className="m-5">No schools found for your criteria.</p>
            }

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
                      <h3> <strong>{tab.name}</strong></h3>
                      <div><small>{tab.type}</small></div>
                      <div><small>{tab.location.city}</small></div>
                    </div>
                    <Favorites />
                  </div>
                  <div style={{marginTop:30}}>
                    <div>
                      <h4>Description</h4>
                      <p>{tab.description}</p>
                    </div>
                    <div>
                      <h4>Program</h4>
                      <p>{tab.type}</p>
                    </div>
                    <div>
                      <h4>Contact</h4>
                      <p>{tab.pointOfContact.number}</p>
                      <p><a href={tab.pointOfContact.contactUrl} target="_blank">Request information</a></p>
                    </div>
                    <div style={{textAlign:"center"}}>
                    <Apply />
                    
                    </div>
                  </div>
                </Tab.Pane>
              ))}
          </Tab.Content>
          </Col>
        </Row>
        
      <Modal className="schools-modal" show={showModal} onHide={handleClose} >
        <div className="modal-container" >
        <div style={{display:"flex"}}>
                    <div className="logo-wrapper-depth">
                        <img src={selectedSchool?.logoUrl} alt="School logo"/>
                    </div>
                    
                    <div style={{textAlign:"left", marginLeft: 30}}>
                      <h3> <strong>{selectedSchool?.name}</strong></h3>
                      <div><small>{selectedSchool?.type}</small></div>
                      <div><small>{selectedSchool?.location.city}</small></div>
                    </div>
                  </div>
                  <div style={{marginTop:30}}>
                    <div>
                      <h4>Description</h4>
                      <p>{selectedSchool?.description}</p>
                    </div>
                    <div>
                      <h4>Program</h4>
                      <p>{selectedSchool?.type}</p>
                    </div>
                    <div>
                      <h4>Contact</h4>
                      <p>{selectedSchool?.pointOfContact.number}</p>
                      <p><a href={selectedSchool?.pointOfContact.contactUrl} target="_blank">Request information</a></p>
                    </div>
                    <div style={{textAlign:"center"}}>
                    <button className="button-class">Apply now</button>
                    </div>
                  </div>
                </div>
      </Modal>
      
    </Tab.Container>
  );
}
