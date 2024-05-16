import {
  Col,
  Tab,
  Row,
  ListGroup,
  Accordion,
  Stack,
  Form,
  Modal,
  Button,
  InputGroup,
} from "react-bootstrap";
import { HeartFill, Search } from "react-bootstrap-icons";
import { useEffect, useRef, useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import "../styles/SchoolsModal.css";
import Apply from "./Apply";
import Favorites from "./Favorites";
import Message from "./Message";
import { Spinner } from "react-bootstrap";

export default function ProgramListing() {
  const [searchTerm, setSearchTerm] = useState("");
  const [programs, setPrograms] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedProgram, setselectedProgram] = useState(null);
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [selectedIndustry, setSelectedIndustry] = useState("");
  const [loading, setLoading] = useState(true);
  const user = JSON.parse(localStorage.getItem("user"));



  useEffect(() => {
    fetch("https://api.boepartners/api/programs", {
      headers: {
        Authorization: `Bearer ${user?.token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => setPrograms(data), setLoading(false))
      .catch((error) => console.error(error));
  }, []);

  const handleClearFilters = () => {
    setSearchTerm("");
    setSelectedCity("");
    setSelectedType("");
    setSelectedIndustry("");
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
      filteredPrograms = filteredPrograms.filter((program) =>
        program?.school?.name?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    if (selectedCity) {
      filteredPrograms = filteredPrograms.filter(
        (program) => program?.school?.location?.city === selectedCity
      );
    }
    if (selectedType) {
      filteredPrograms = filteredPrograms.filter(
        (program) => program?.school?.type === selectedType
      );
    }
    if (selectedIndustry) {
      filteredPrograms = filteredPrograms.filter(
        (program) => program?.school?.industry === selectedIndustry
      );
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
    <Tab.Container defaultActiveKey="65e669834d31650e1ce5a2f1">
      <Row className="schools-container">
        <Col
          className="p-0 overflow-auto"
          style={{ maxHeight: "704px" }}
          md={5}
          sm={12}
        >
          <ListGroup className="border-list-group">
            <ListGroup.Item>
              <h3>Find South Florida Training Programs</h3>
            </ListGroup.Item>
            <div style={{ padding: '10px' }}>
            <InputGroup>
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
            </div>
            <Stack
              direction="horizontal"
              gap={2}
              className="justify-content-center m-2 responsive-stack"
            >
              <DropdownButton
                id="dropdown-button-dark-example1"
                variant="secondary"
                title={selectedCity ? selectedCity : "Location"}
              >
                {loading ? (
                  <p>Loading...</p>
                ) : (
                  Array.from(
                    new Set(
                      programs?.map(
                        (program) => program?.school?.location?.city
                      )
                    )
                  ).map((city) => (
                    <Dropdown.Item onClick={() => handleCitySelect(city)}>
                      {city}
                    </Dropdown.Item>
                  ))
                )}
              </DropdownButton>

              <DropdownButton
                id="dropdown-button-dark-example1"
                variant="secondary"
                title={selectedType ? selectedType : "Type of program"}
              >
                {loading ? (
                  <p>Loading...</p>
                ) : (
                  Array.from(
                    new Set(programs?.map((program) => program?.school?.type))
                  ).map((type) => (
                    <Dropdown.Item onClick={() => handleTypeSelect(type)}>
                      {type}
                    </Dropdown.Item>
                  ))
                )}
              </DropdownButton>

              <DropdownButton
                id="dropdown-button-dark-example1"
                variant="secondary"
                title={selectedIndustry ? selectedIndustry : "Industry"}
              >
                {loading? (
                  <p>Loading...</p>
                ) : (
                  Array.from(
                    new Set(
                      programs?.map((program) => program?.school?.industry)
                    )
                  ).map((industry) => (
                    <Dropdown.Item onClick={() => handleTypeIndustry(industry)}>
                      {industry}
                    </Dropdown.Item>
                  ))
                )}
              </DropdownButton>

              <Button variant="secondary" onClick={handleClearFilters}>
                Clear
              </Button>
            </Stack>

            {loading ? (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "100%",
                }}
              >
                <Spinner animation="border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </Spinner>
              </div>
            ) : 
              filterTabs(programs).map((tab) => (
                <ListGroup.Item
                  className="tab?"
                  action
                  eventKey={tab?._id}
                  key={tab?._id}
                  ref={(el) => {
                    if (tab?._id === "65e669834d31650e1ce5a2f1") {
                      tabRef.current = el;
                    }
                  }}
                  onClick={() => {
                    if (window.innerWidth <= 767) {
                      handleShow(tab);
                    } else {
                      handleTabClick(tab?._id);
                    }
                  }}
                >
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <div className="d-flex">
                      <div className="logo-wrapper">
                        <img
                          src={
                            tab?.school?.logoUrl
                              ? tab.school.logoUrl.startsWith("logo")
                                ? `https://api.boepartners/${tab.school.logoUrl}`
                                : tab.school.logoUrl
                              : "/images/user-avatar.png"
                          }
                          alt="program logo"
                        />
                      </div>
                      <div style={{ textAlign: "left", marginLeft: 30 }}>
                        <strong>{tab?.school?.name}</strong>
                        <div>
                          <small>{tab?.school?.type}</small>
                        </div>
                        <div>
                          <small>{tab?.name}</small>
                        </div>
                        <div>
                          {tab?.location? (
                          <small>{tab?.location}</small>) :
                          <small>{tab?.school?.location?.city}</small>}
                        </div>
                      </div>
                    </div>

                    {/* <Favorites program={tab?.name} program={tab?.program?}/> */}
                  </div>
                </ListGroup.Item>
              ))
            }
            
          </ListGroup>
        </Col>

        <Col
          className="depth-listing"
          style={{ maxHeight: "704px" }}
          md={7}
          sm={8}
        >
          <Tab.Content style={{ padding: 40, textAlign: "left" }}>
            {loading ? (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "100%",
                }}
              >
                <Spinner animation="border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </Spinner>
              </div>
            ) : (
              programs?.map((tab) => (
                <Tab.Pane eventKey={tab?._id} key={tab?._id}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <div className="d-flex">
                      <div className="logo-wrapper-depth">
                        <img
                          src={
                            tab?.school?.logoUrl
                              ? tab.school.logoUrl.startsWith("logo")
                                ? `https://api.boepartners/${tab.school.logoUrl}`
                                : tab.school.logoUrl
                              : "/images/user-avatar.png"
                          }
                          alt="program logo"
                        />
                      </div>
                      <div style={{ textAlign: "left", marginLeft: 30 }}>
                        <h3>
                          {" "}
                          <strong>{tab?.school?.name}</strong>
                        </h3>
                        <div>
                          <small>{tab?.school?.type}</small>
                        </div>
                        <div>
                          <small>{tab?.name}</small>
                        </div>
                        <div>
                          <small>{tab?.school.location?.city}</small>
                        </div>
                      </div>
                    </div>
                    {user?.type != "member" ? (
                      <Favorites program={tab?._id} isLiked={tab?.isLiked} />
                    ) : null}
                  </div>
                  <div style={{ marginTop: 30 }}>
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
                      <p>
                        {tab?.financing
                          ? tab?.financing
                          : "Contact us for more information"}
                      </p>
                    </div>
                    <div>
                      <h4>Duration</h4>
                      <p>
                        {tab?.duration
                          ? tab?.duration
                          : "Contact us for more information"}
                      </p>
                    </div>
                    {user?.type != "member" ? (
                      <>
                        <h4>Apply Today</h4>
                        <Apply program={tab?._id} />
                        <h4>Message School</h4>
                        <Message school={tab?.school?._id} />
                      </>
                    ) : null}
                  </div>
                </Tab.Pane>
              ))
            )}
          </Tab.Content>
        </Col>
      </Row>

      <Modal className="schools-modal" show={showModal} onHide={handleClose}>
        <div className="modal-container">
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div className="d-flex">
              <div className="logo-wrapper-depth">
                <img
                  src={
                    selectedProgram?.school?.logoUrl
                      ? selectedProgram.school.logoUrl.startsWith("logo")
                        ? `https://api.boepartners/${selectedProgram.school.logoUrl}`
                        : selectedProgram.school.logoUrl
                      : "/images/user-avatar.png"
                  }
                  alt="program logo"
                />
              </div>

              <div style={{ textAlign: "left", marginLeft: 30 }}>
                <h3>
                  {" "}
                  <strong>{selectedProgram?.school?.name}</strong>
                </h3>
                <div>
                  <small>{selectedProgram?.school?.type}</small>
                </div>
                <div>
                  <small>{selectedProgram?.name}</small>
                </div>
                <div>
                  <small>{selectedProgram?.school?.location?.city}</small>
                </div>
              </div>
            </div>
            {user?.type != "member" ? (
              <Favorites
                program={selectedProgram?._id}
                isLiked={selectedProgram?.isLiked}
              />
            ) : null}
          </div>
          <div style={{ marginTop: 30 }}>
            <div>
              <h4>Program Description</h4>
              <p>{selectedProgram?.school?.description}</p>
            </div>
            <div>
              <h4>About {selectedProgram?.school?.name}</h4>
              <p>{selectedProgram?.school?.description}</p>
            </div>
            <div>
              <h4>Cost & Financing Options</h4>
              <p>{selectedProgram?.school?.cost}</p>
              <p>
                {selectedProgram?.school?.financing
                  ? selectedProgram?.school?.financing
                  : "Contact us for more information"}
              </p>
            </div>
            <div>
              <h4>Duration</h4>
              <p>
                {selectedProgram?.school?.duration
                  ? selectedProgram?.school?.duration
                  : "Contact us for more information"}
              </p>
            </div>
            <h4>Apply Today</h4>
            <Apply program={selectedProgram?._id} />
            <h4>Message School</h4>
            <Message school={selectedProgram?.school?._id} />
          </div>
        </div>
      </Modal>
    </Tab.Container>
  );
}
