import { Col, Tab, Row, ListGroup, Accordion, Stack, Form, Modal, Button, InputGroup } from "react-bootstrap";
import { HeartFill, Search } from 'react-bootstrap-icons';
import { useEffect, useRef, useState } from "react";
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import "../styles/SchoolsModal.css"
import Apply from "./Apply";
import Favorites from "./Favorites";
import Message from "./Message";

export default function ProgramListing() {
  const [searchTerm, setSearchTerm] = useState('');
  const [programs, setPrograms] = useState([]);
  const [showModal, setShowModal] = useState(false); 
  const [selectedProgram, setselectedProgram] = useState(null);
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [selectedIndustry, setSelectedIndustry] = useState('');
  const user = JSON.parse(localStorage.getItem('user'));
  const isLoading = programs.length === 0;

  const renderSkeletons = () => {
    return Array.from({ length: 5 }).map((_, index) => (
      <div key={index} className="skeleton-item">
        <div className="skeleton-img"></div>
        <div className="skeleton-text"></div>
        <div className="skeleton-text"></div>
      </div>
    ));
  };
  useEffect(() => {
    fetch('http://localhost:3001/api/programs', {
      headers: {
        'Authorization': `Bearer ${user?.token}`
      }
    })
      .then(response => response.json())
      .then(data => setPrograms(data))
      .catch(alert)
  }, []);

  const handleClearFilters = () => {
    setSearchTerm('');
    setSelectedCity('');
    setSelectedType('');
    setSelectedIndustry('');
  };

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

  const filterTabs = (programsList) => {
    let filteredPrograms = programsList;
    if (searchTerm) {
      filteredPrograms = filteredPrograms.filter((program) => program?.name?.toLowerCase().includes(searchTerm.toLowerCase()));
    }
    if (selectedCity) {
      filteredPrograms = filteredPrograms.filter((program) => program?.school?.location?.city === selectedCity);
    }
    if (selectedType) {
      filteredPrograms = filteredPrograms.filter((program) => program?.school?.type === selectedType);
    }
    if (selectedIndustry) {
      filteredPrograms = filteredPrograms.filter((program) => program?.school?.industry === selectedIndustry);
    }
    return filteredPrograms;
  };
  
  const tabRef = useRef(null);

  const handleTabClick = (program) => {
    if (window.innerWidth < 700) {
      setselectedProgram(program);
      setShowModal(true);
    }
  };

  const handleClose = () => setShowModal(false);
  const handleShow = (program) => {
    setselectedProgram(program);
    setShowModal(true);
  };

  return (
    <Tab.Container  defaultActiveKey='65e669834d31650e1ce5a2f4'>
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
            <Stack direction="horizontal" gap={2} className="justify-content-center m-2 responsive-stack">
            <DropdownButton
              id="dropdown-button-dark-example1"
              variant="secondary"
              title="Location"
              >
              {(!programs)
                ? <p>Loading...</p>
                : Array.from(new Set(programs?.map((program) => program?.school?.location?.city))).map((city) => (
                  <Dropdown.Item onClick={() => handleCitySelect(city)}>{city}</Dropdown.Item>
                ))}
            </DropdownButton>

            <DropdownButton
              id="dropdown-button-dark-example1"
              variant="secondary"
              title="Type of program"
              >
              {(!programs)
                ? <p>Loading...</p>
                : Array.from(new Set(programs?.map((program) => program?.school?.type))).map((type) => (
                  <Dropdown.Item onClick={() => handleTypeSelect(type)}>{type}</Dropdown.Item>
                ))}
            </DropdownButton>

            <DropdownButton
              id="dropdown-button-dark-example1"
              variant="secondary"
              title="Industry"
              >
              {(!programs)
                ? <p>Loading...</p>
                : Array.from(new Set(programs?.map((program) => program?.school?.industry))).map((industry) => (
                  <Dropdown.Item onClick={() => handleTypeIndustry(industry)}>{industry}</Dropdown.Item>
                ))}
            </DropdownButton>

            <Button variant="secondary" onClick={handleClearFilters}>
            Clear
          </Button>
            </Stack>

            {
              (!programs)
                ? <p>Loading...</p>
                : filterTabs(programs).length > 0
                ? filterTabs(programs).map((tab) => (
                  <ListGroup.Item className="tab?"
                    action
                    eventKey={tab?._id}
                    key={tab?._id}
                    ref={(el) => {
                      if (tab?._id === '63c00d7afbff54dd5e32ef6e') {
                        tabRef.current = el;
                      }
                    }}
                    onClick={() => {if(window.innerWidth <= 767) {handleShow(tab)} else {handleTabClick(tab?._id)}}}
                  >
                    <div style={{display:"flex", justifyContent:"space-between"}}>
                      <div className="d-flex">
                        <div className="logo-wrapper" >
                            <img src={tab?.school?.logoUrl} alt="program logo"/>
                        </div>
                        <div style={{textAlign:"left", marginLeft: 30}}>
                          <strong>{tab?.school?.name}</strong>
                          <div><small>{tab?.school?.type}</small></div>
                          <div><small>{tab?.name}</small></div>
                          <div><small>{tab?.school?.location?.city}</small></div>
                        </div>
                      </div>
                     
                      {/* <Favorites program={tab?.name} program={tab?.program?}/> */}
                      
                    </div>
                  </ListGroup.Item>
                ))
                : <p className="m-5">No programs found for your criteria.</p>
            }

          </ListGroup>
        </Col>

        <Col  className="depth-listing" style={{ maxHeight: "704px" }} md={7} sm={8}>
          <Tab.Content style={{padding:40, textAlign:"left"}}>
            {(!programs)
              ? <p>Loading...</p>
              : programs?.map((tab) => (
                <Tab.Pane eventKey={tab?._id} key={tab?._id}>
                  <div style={{display:"flex" , justifyContent:"space-between"}}>
                  <div className="d-flex">
                    <div className="logo-wrapper-depth">
                        <img src={tab?.school?.logoUrl} alt="program logo"/>
                    </div>
                    <div style={{textAlign:"left", marginLeft: 30}}>
                      <h3> <strong>{tab?.school?.name}</strong></h3>
                      <div><small>{tab?.school?.type}</small></div>
                      <div><small>{tab?.name}</small></div>
                      <div><small>{tab?.school.location?.city}</small></div>
                    </div>
                    </div>
                    <Favorites program={tab?._id} isLiked={tab?.isLiked}/>
                  </div>
                  <div style={{marginTop:30}}>
                    <div>
                      <h4>Program Description</h4>
                      <p>{tab?.description}</p>
                    </div>
                    <div>
                      <h4>About {tab?.school?.name}</h4>
                      <p>{tab?.school?.description}</p>
                    </div>
                    <div>
                      <h4>Cost & Financing Options</h4>
                      <p>{tab?.cost}</p>
                      <p>{tab?.financing ? tab?.financing : "Contact us for more information"}</p>
                    </div>
                    <div>
                      <h4>Duration</h4>
                      <p>{tab?.duration ? tab?.duration : "Contact us for more information"}</p>
                    </div>
                    <div style={{textAlign:"center" , marginTop:35}}>
                    <Apply program={tab?._id}/>
                    <Message school={tab?.school?._id}/>
                    </div>
                  </div>
                </Tab.Pane>
              ))}
          </Tab.Content>
          </Col>
        </Row>
        
      <Modal className="schools-modal" show={showModal} onHide={handleClose} >
        <div className="modal-container" >
        <div style={{display:"flex" , justifyContent:"space-between"}}>
                  <div className="d-flex">
                    <div className="logo-wrapper-depth">
                        <img src={selectedProgram?.school?.logoUrl} alt="program logo"/>
                    </div>
                    
                    <div style={{textAlign:"left", marginLeft: 30}}>
                      <h3> <strong>{selectedProgram?.school?.name}</strong></h3>
                      <div><small>{selectedProgram?.school?.type}</small></div>
                      <div><small>{selectedProgram?.name}</small></div>
                      <div><small>{selectedProgram?.school?.location?.city}</small></div>
                    </div>
                    </div>
                    <Favorites program={selectedProgram?._id} isLiked={selectedProgram?.isLiked}/>
                  </div>
                  <div style={{marginTop:30}}>
                    <div>
                      <h4>Description</h4>
                      <p>{selectedProgram?.school?.description}</p>
                    </div>
                    <div>
                      <h4>Program</h4>
                      <p>{selectedProgram?.school?.type}</p>
                    </div>
                    <div>
                      <h4>Contact</h4>
                      <p>{selectedProgram?.school?.pointOfContact.number}</p>
                      <p><a href={selectedProgram?.school?.pointOfContact.contactUrl} target="_blank">Request information</a></p>
                    </div>
                    <Apply program={selectedProgram?._id}/>
                    <Message school={selectedProgram?.school?._id}/>
                  </div>
                </div>
      </Modal>
      
    </Tab.Container>
  );
}
