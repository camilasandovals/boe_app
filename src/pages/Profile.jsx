import { Col, Container, Row } from "react-bootstrap";
import AppLayout from "../layout/AppLayout";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../App";
import { PencilFill, XCircle, XCircleFill, ReplyFill } from "react-bootstrap-icons";
import { Spinner } from "react-bootstrap";
import { useRef } from "react";
import { Helmet } from "react-helmet";
import Account from "./Account";
import Apply from "../components/Apply";
import Message from "../components/Message";

export default function Profile() {
  const fileInputRef = useRef(null);
  const [user, setUser] = useContext(UserContext);
  const [programs, setPrograms] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [applications, setApplications] = useState([]);
  const [messages, setMessages] = useState([]);
  const [isBioExpanded, setIsBioExpanded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [image, setImage] = useState("");
  const [showApply, setShowApply] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const wordCount = user?.bio ? user.bio.split(" ").length : 0;
  const shortBio = user?.bio
    ? `${user?.bio?.split(" ").slice(0, 40).join(" ")}${
        wordCount > 40 ? "..." : ""
      }`
    : "Click on edit to update your information";
  const fullBio = user?.bio;

  const navigate = useNavigate();

  useEffect(() => {
    const headers = {
      Authorization: `Bearer ${user?.token}`,
    };

    if (user?.type == "user") {
      if (!user?.name) {
        navigate("/account");
        return;
      }

      setIsLoading(true);
      Promise.all([
        fetch(`https://boepartners-api.web.app/userlikes`, { headers }),
        fetch(`https://boepartners-api.web.app/premiumApplication`, {
          headers,
        }),
        fetch(`https://boepartners-api.web.app/userMessages`, { headers }),
      ])
        .then(([res1, res2, res3]) => Promise.all([res1.json(), res2.json(), res3.json()]))
        .then(([data1, data2, data3]) => {
          setFavorites(data1);
          setApplications(data2);
          setMessages(data3);
          setIsLoading(false);
        })
        .catch((err) => {
          console.error(err);
          setIsLoading(false);
        });
    }

    if (user?.type == "member") {
      setIsLoading(true);
      Promise.all([
        fetch(`https://boepartners-api.web.app/memberPrograms`, { headers }),
        fetch(`https://boepartners-api.web.app/memberlikes`, { headers }),
        fetch(`https://boepartners-api.web.app/memberApplications`, {
          headers,
        }),
        fetch(`https://boepartners-api.web.app/messages`, { headers }),
      ])
        .then(([res1, res2, res3, res4]) =>
          Promise.all([res1.json(), res2.json(), res3.json(), res4.json()])
        )
        .then(([data1, data2, data3, data4]) => {
          setPrograms(data1);
          setFavorites(data2);
          setApplications(data3);
          setMessages(data4);
          setIsLoading(false);
        })
        .catch((err) => {
          console.error(err);
          setIsLoading(false);
        });
    }
  }, [user, image]);

  function convertFile(files) {
    if (files) {
      // picks the first file from all the files selected
      const fileRef = files[0] || "";
      // picks the type so that it can send the right one to the database
      const fileType = fileRef.type || "";
      // sets reader as a new FileReader instance
      const reader = new FileReader();
      // converts fileref (the File) to a binary string
      reader.readAsBinaryString(fileRef);
      reader.onload = (ev) => {
        // convert it to base64
        const newImage = `data:${fileType};base64,${window.btoa(
          ev.target.result
        )}`;
        setImage(newImage);
        setUser({ ...user, image: newImage }); // Update the user object with the new image
        localStorage.setItem("userImage", newImage);
      };
    }
  }

  const handleImageClick = () => {
    // fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    convertFile(event.target.files);
  };

  const handleShowApply = () => {
    setShowApply(true);
  };

  const handleShowMessage = () => {
    setShowMessage(true);
  };

  const handleDeleteProgram = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this program?"
    );
    if (!confirmDelete) {
      return;
    }
    const headers = {
      "Content-Type": "application/json",
    };

    fetch(`https://boepartners-api.web.app/api/programs/${id}`, {
      method: "DELETE",
      headers,
    })
      .then((res) => res.json())
      .then((data) => {
        if (data?.success) {
          setPrograms(programs.filter((program) => program._id !== id));
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <AppLayout>
      <Helmet>
        <title>Account Verification - BOE</title>
        <meta name="description" content="Verify your account at Bringing Opportunities Everywhere (BOE). Complete your registration to access more features and opportunities in vocational schools and skilled trades in South Florida." />
      </Helmet>
      <Container className="profile">
        <h1>
          Account Information
        </h1>
        {user?.type == "user" ? (
          <Row className="profile-row">
            <Col sm={12} md={12} lg={4}>
              <div className="profile-container">
                <h3>{user?.name ? user.name : "Name"}{" "}
                {user?.lastName ? `${user.lastName}` : ""}</h3>
                <div
                  style={{
                    alignSelf: "flex-end",
                    cursor: "pointer",
                    position: "absolute",
                  }}
                  onClick={() => {
                    navigate("/account");
                  }}
                >
                  <PencilFill
                    color="grey"
                    size={20}
                    onClick={() => {
                      navigate("/account");
                    }}
                  />
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-evenly",
                    alignItems: "center",
                  }}
                >
                  <input
                    type="file"
                    ref={fileInputRef}
                    style={{ display: "none" }}
                    onChange={handleFileChange}
                  />

                  <div className="image-container" onClick={handleImageClick}>
                    <img
                      src={
                        user?.avatarUrl
                          ? `${user.avatarUrl}`
                          : "/images/user-avatar.png"
                      }
                      alt="BOE South Florida User"
                    />
                  </div>
                  <div className="favorite">
                    <p onClick={() => setIsBioExpanded(!isBioExpanded)}>
                      <strong>Bio: </strong>
                      {isBioExpanded ? fullBio : shortBio}
                      {wordCount > 40 && (
                        <span style={{ color: "green", cursor: "pointer" }}>
                          {" "}
                          {isBioExpanded ? "Read Less" : "Read More"}
                        </span>
                      )}
                    </p>
                    <div className="skills">
                      <p>
                        <strong>Interests: </strong>
                        {user?.skills && user.skills.length > 0
                          ? user.skills.map((skill, index) => (
                              <span key={index} className="skill">
                                {skill}{" "}
                              </span>
                            ))
                          : "Skills"}
                      </p>
                    </div>
                    <p>
                      <strong>Email: </strong>
                      {user?.email ? user?.email : "Email"}
                    </p>
                    <p>
                      <strong>Location: </strong>
                      {user?.location ? user.location : "State"}
                    </p>
                    <p>
                      <strong>Reason for account: </strong>
                      {user?.category ? user.category : "Category"}
                    </p>
                  </div>
                </div>
              </div>
            </Col>
            <Col sm={12} md={12} lg={4}>
              <div className="profile-container">
                <h3>Likes</h3>
                <div>
                  {isLoading ? (
                    <Spinner animation="border" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </Spinner>
                  ) : favorites?.length > 0 ? (
                    favorites.map((favorite, index) => {
                      const date = new Date(favorite?.Date);
                      return (
                        <div key={index} className="favorite">
                          <div style={{ display: "flex" }}>
                            <div className="logo-wrapper">
                              <img
                                src={
                                  favorite?.schoolDetails?.logoUrl? `${favorite?.schoolDetails.logoUrl}`
                                    : "/images/school-logo.png"
                                }
                                alt="BOE South Florida Vocational School"
                              />
                            </div>
                            <div style={{ textAlign: "left", marginLeft: 30 }}>
                              <p>
                                <strong>{favorite?.schoolDetails?.name}</strong>
                              </p>
                              <p>
                                <small>{favorite?.programDetails?.name}</small>
                              </p>
                              <p>
                                <small>Liked on {date.toLocaleDateString()}</small>
                              </p>
                            </div>
                          </div>
                          {!showApply ? (
                            <button
                              className="button-class m-3"
                              onClick={handleShowApply}
                            >
                              Apply
                            </button>
                          ) : (
                            <Apply program={favorite?.programDetails?._id} />
                          )}
                        </div>
                      );
                    })
                  ) : (
                    <p>No favorites yet</p>
                  )}
                </div>
              </div>
            </Col>
            <Col sm={12} md={12} lg={4}>
              <div className="profile-container">
                <h3>Applications</h3>
                {isLoading ? (
                  <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </Spinner>
                ) : applications?.length > 0 ? (
                  applications?.map((application, index) => {
                    const date = new Date(application?.date);
                    return (
                      <div key={index} className="favorite">
                        <div style={{ display: "flex" }}>
                          <div className="logo-wrapper">
                            <img
                              src={
                                application?.schoolDetails?.logoUrl
                                  ? `${application?.schoolDetails.logoUrl}`
                                  : "/images/school-logo.png"
                              }
                              alt="BOE South Florida Vocational School"
                            />
                          </div>
                          <div style={{ textAlign: "left", marginLeft: 30 }}>
                            <p>
                              <strong>
                                {application?.schoolDetails?.name}
                              </strong>
                            </p>
                            <p>
                              <small>{application?.programDetails?.name}</small>
                            </p>
                            <p>
                              <small>Applied on {date.toLocaleDateString()}</small>
                            </p>
                          </div>
                        </div>
                        {!showMessage ? (
                          <button
                            className="button-class m-3"
                            onClick={handleShowMessage}
                          >
                            Message School
                          </button>
                        ) : (
                          <Message school={application.schoolDetails?._id} />
                        )}
                      </div>
                    );
                  })
                ) : (
                  <p>No applications yet</p>
                )}
              </div>
            </Col>
            <Col sm={12} md={12} lg={4}>
              <div className="profile-container">
                <h3>Messages</h3>
                {isLoading ? (
                  <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </Spinner>
                ) : messages?.length > 0 ? (
                  messages?.map((message, index) => {
                    const date = new Date(message?.date);
                    return (
                      <div key={index} className="favorite">
                        <div style={{ display: "flex" }}>
                        <div className="logo-wrapper">
                            <img
                              src={
                                message?.schoolDetails?.logoUrl
                                  ? `${message?.schoolDetails.logoUrl}`
                                  : "/images/school-logo.png"
                              }
                              alt="BOE South Florida Vocational School"
                            />
                          </div>
                          <div style={{ textAlign: "left", marginLeft: 30 }}>
                            <p>
                              <strong>
                                {message?.schoolDetails?.name}
                              </strong>
                            </p>
                            <p>
                              <small>{message?.message}</small>
                            </p>
                            <p>
                              <small>Sent on {date.toLocaleDateString()}</small>
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <p>No messages yet</p>
                )}
              </div>
            </Col>
          </Row>
        ) : (
          // -------------------------------------------------------------- MEMBERS --------------------------------------------------------------------
          <>
            <Row>
            <Col sm={12} md={12} lg={4}>
              <div className="profile-container">
                <h3>{user?.name ? user.name : "Name"}{" "}
                {user?.lastName ? `${user.lastName}'s BOE Account` : ""}</h3>
                <div
                  style={{
                    alignSelf: "flex-end",
                    cursor: "pointer",
                    position: "absolute",
                  }}
                  onClick={() => {
                    navigate("/account");
                  }}
                >
                  <PencilFill
                    color="grey"
                    size={20}
                    onClick={() => {
                      navigate("/account");
                    }}
                  />
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-evenly",
                    alignItems: "center",
                  }}
                >
                  <input
                    type="file"
                    ref={fileInputRef}
                    style={{ display: "none" }}
                    onChange={handleFileChange}
                  />

                  <div className="image-container" onClick={handleImageClick}>
                    <img
                      src={
                        user?.avatarUrl
                          ? `${user.avatarUrl}`
                          : "/images/user-avatar.png"
                      }
                      alt="BOE South Florida User"
                    />
                  </div>
                  <div className="favorite">
                    <p onClick={() => setIsBioExpanded(!isBioExpanded)}>
                      <strong>School Description: </strong>
                      {isBioExpanded ? fullBio : shortBio}
                      {wordCount > 40 && (
                        <span style={{ color: "green", cursor: "pointer" }}>
                          {" "}
                          {isBioExpanded ? "Read Less" : "Read More"}
                        </span>
                      )}
                    </p>
                    <p>
                      <strong>Industry: </strong>
                      {user?.industry ? user.industry : "Industry"}
                    </p>
                    <p>
                      <strong>Email: </strong>
                      {user?.email ? user?.email : "Email"}
                    </p>
                    <p>
                      <strong>Type: </strong>
                      {user?.typeOf ? user.typeOf : "Type"}
                    </p>
                    <p>
                      <strong>Website: </strong>
                      {user?.website ? user.website : "Website"}
                    </p>
                  </div>
                </div>
              </div>
            </Col>
              <Col sm={12} md={12} lg={4}>
                <div className="profile-container">
                  <h3>Entries</h3>
                  <div>
                    
                    {isLoading ? (
                      <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                      </Spinner>
                    ) : programs?.length > 0 ? (
                      programs.map((program, index) => {
                        return (
                          <div key={index} className="favorite">
                            <div
                              className="delete-icon"
                              onClick={() => {
                                handleDeleteProgram(program._id);
                              }}
                            >
                              <XCircleFill color="pink" size={25} />
                            </div>

                            <div style={{ textAlign: "left", margin: '0.6rem' }}>
                              <p>
                                <strong>{program?.name}</strong>
                              </p>
                              
                              <p>
                                <small><strong>Program Description:</strong> {program?.description}</small>
                              </p>
                              <p>
                                <small><strong>Location:</strong> {program?.location}</small>
                              </p>
                              <p>
                                <small><strong>Duration:</strong> {program?.duration}</small>
                              </p>
                              <p>
                                <small><strong>Cost:</strong> {parseFloat(program.cost).toLocaleString('en-US')} USD</small>
                              </p>
                              <p>
                                <small><strong>Financing:</strong> {program?.financing}</small>
                              </p>
                            </div>
                          </div>
                        );
                      })
                    ) : (
                      <p>No programs yet</p>
                    )}
                  </div>
                  <button
                    className="button-class m-3"
                    onClick={() => navigate("/programs")}
                  >
                    Add Program
                  </button>
                </div>
              </Col>
              <Col sm={12} md={4} lg={4}>
                <div className="profile-container">
                  <h3>Likes</h3>
                  <div>
                    {isLoading ? (
                      <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                      </Spinner>
                    ) : favorites?.length > 0 ? (
                      favorites.map((favorite, index) => {
                        const date = new Date(favorite?.Date);
                        return (
                          <div key={index} className="favorite">
                            <div style={{ display: "flex" }}>
                              <div className="logo-wrapper">
                                {favorite?.userDetails?.avatarUrl ? (
                                  <img
                                    src={`${favorite?.userDetails?.avatarUrl}`}
                                    alt="BOE South Florida User"
                                  />
                                ) : (
                                  <img
                                    src="/images/user-avatar.png"
                                    alt="BOE South Florida User"
                                  />
                                )}
                              </div>
                              <div
                                style={{ textAlign: "left", marginLeft: 30 }}
                              >
                                <p>
                                  <strong>
                                    {favorite?.userDetails?.name}{" "}
                                    {favorite?.userDetails?.lastName}
                                  </strong>
                                </p>
                                <p>
                                  <small>{favorite?.userDetails?.email}</small>
                                </p>
                                <p>
                                  <small>
                                    Liked{" "}
                                    <strong>
                                      {favorite?.programDetails?.name}
                                    </strong>
                                  </small>
                                </p>
                                <p>
                                  <small>
                                    Liked on {date.toLocaleDateString()}
                                  </small>
                                </p>
                              </div>
                            </div>
                          </div>
                        );
                      })
                    ) : (
                      <p>No favorites yet</p>
                    )}
                  </div>
                </div>
              </Col>
            </Row>
            <Row>
              <Col sm={12} md={12} lg={6}>
                <div className="profile-container-member">
                  <h3>Applications</h3>
                  {isLoading ? (
                    <Spinner animation="border" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </Spinner>
                  ) : applications?.length > 0 ? (
                    applications?.map((application, index) => {
                      const date = new Date(application?.date);
                      return (
                        <div key={index} className="favorite">
                          <div style={{ display: "flex" }}>
                            <div className="logo-wrapper">
                              {application?.userDetails?.avatarUrl ? (
                                <img
                                  src={`${application?.userDetails?.avatarUrl}`}
                                  alt="BOE South Florida User"
                                />
                              ) : (
                                <img
                                  src="/images/user-avatar.png"
                                  alt="BOE South Florida User"
                                />
                              )}
                            </div>
                            <div style={{ textAlign: "left", marginLeft: 30 }}>
                              <p>
                                <strong>
                                  {application?.userDetails?.name}{" "}
                                  {application?.userDetails?.lastName}
                                </strong>
                              </p>
                              <p>
                                <small>{application?.userDetails?.email}</small>
                              </p>
                              <p>
                                <small>
                                  Applied to:{" "}
                                  <strong>
                                    {application?.programDetails?.name}
                                  </strong>
                                </small>
                              </p>
                              <p>
                                <small>{date.toLocaleDateString()}</small>
                              </p>
                              <a
                                href={`${application?.resumePath}`}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                Open Resume
                              </a>
                            </div>
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <p>No applications yet</p>
                  )}
                </div>
              </Col>
              <Col sm={12} md={12} lg={6}>
                <div className="profile-container-member">
                  <h3>Messages</h3>
                  {isLoading ? (
                    <Spinner animation="border" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </Spinner>
                  ) : messages?.length > 0 ? (
                    messages?.map((message, index) => {
                      const date = new Date(message?.date);
                      return (
                        <div key={index} className="favorite">
                          <div style={{ display: "flex" }}>
                            <div className="logo-wrapper">
                              {message.userDetails.avatarUrl ? (
                                <img
                                  src={`${message?.userDetails?.avatarUrl}`}
                                  alt="BOE South Florida User"
                                />
                              ) : (
                                <img
                                  src="/images/user-avatar.png"
                                  alt="Default user image"
                                />
                              )}
                            </div>
                            <div style={{ textAlign: "left", marginLeft: 30 }}>
                              <p>
                                <strong>
                                  {message?.userDetails?.name}{" "}
                                  {message?.userDetails?.lastName}
                                </strong>
                              </p>
                              <p>
                                <small>{message?.userDetails?.email}</small>
                              </p>
                              <p>
                                <small>{message?.message}</small>
                              </p>
                              <p>
                                <small>
                                  Sent on {date.toLocaleDateString()}
                                </small>
                              </p>
                              <p>
                                <small>
                                  <a href={`mailto:${message?.userDetails?.email}`}><ReplyFill />{message?.userDetails?.name? ` Reply to ${message?.userDetails?.name}` : ` Reply to User`} </a>
                                </small>
                              </p>
                            </div>
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <p>No messages yet</p>
                  )}
                </div>
              </Col>
            </Row>
          </>
        )}
      </Container>
    </AppLayout>
  );
}
