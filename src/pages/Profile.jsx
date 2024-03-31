import { Col, Container, Row } from "react-bootstrap";
import AppLayout from "../layout/AppLayout";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../App";
import { PencilFill } from "react-bootstrap-icons";
import { Spinner } from 'react-bootstrap';
import { useRef } from 'react';
import Account from "./Account";
import Apply from "../components/Apply";
import Message from "../components/Message";

export default function Profile() {
    const fileInputRef = useRef(null);
    const [user, setUser] = useContext(UserContext)
    const [favorites, setFavorites] = useState([])
    const [applications, setApplications] = useState([])
    const [messages, setMessages] = useState([])
    const [isBioExpanded, setIsBioExpanded] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [image, setImage] = useState("");
    const [showApply, setShowApply] = useState(false);
    const [showMessage, setShowMessage] = useState(false);
    const wordCount = user?.bio ? user.bio.split(' ').length : 0;
    const shortBio = user?.bio? `${user?.bio?.split(' ').slice(0, 40).join(' ')}${wordCount > 40 ? '...' : ''}` : "Click on edit to update your information";
    const fullBio = user?.bio;


    const navigate = useNavigate()

    useEffect(() => {
        const headers = {
            'Authorization': `Bearer ${user?.token}`
        };

        if (user?.type == "user") {

            if (!user?.name) {
            navigate('/account')
            return
            }
        
            setIsLoading(true);
            Promise.all([
                fetch(`http://localhost:3001/userlikes`, { headers }),
                fetch(`http://localhost:3001/premiumApplication`, { headers })
            ])
                .then(([res1, res2]) => Promise.all([res1.json(), res2.json()]))
                .then(([data1, data2]) => {
                    setFavorites(data1);
                    setApplications(data2);
                    setIsLoading(false);
                })
                .catch(err => {
                    console.error(err);
                    setIsLoading(false);
                });
        }

        if (user?.type == "member") {
            setIsLoading(true);
            Promise.all([
                fetch(`http://localhost:3001/memberlikes`, { headers }),
                fetch(`http://localhost:3001/memberApplication`, { headers }),
                fetch(`http://localhost:3001/messages`, { headers })
            ])
                .then(([res1, res2, res3]) => Promise.all([res1.json(), res2.json(), res3.json()]))
                .then(([data1, data2, data3]) => {
                    setFavorites(data1);
                    setApplications(data2);
                    setMessages(data3);
                    setIsLoading(false);
                })
                .catch(err => {
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
            const newImage = `data:${fileType};base64,${window.btoa(ev.target.result)}`;
            setImage(newImage);
            setUser({...user, image: newImage}); // Update the user object with the new image
            localStorage.setItem('userImage', newImage);
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
    setShowApply(true)
   }

   const handleShowMessage = () => {
    setShowMessage(true)
   }

    return(

        user?.type == 'user'? (
        <AppLayout>
            <Container className="profile">
            <h1>{user?.name?  user.name : "Name"} {user?.lastName? `${user.lastName}'s BOE Account` : ""}</h1>
                <Row>
                    <Col sm={12} md={12} lg={4}>
                        <div className="profile-container">
                        <div style={{alignSelf: 'flex-end', cursor: 'pointer', position: 'absolute'}} onClick={() => {navigate("/account")}}>
                            <PencilFill color="grey" size={20} onClick={() => {navigate("/account")}}/>
                        </div>
                    <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly', height: '100%', alignItems: 'center'}}>
                        <input type="file" ref={fileInputRef} style={{ display: 'none' }} onChange={handleFileChange} />
                            <h3>My Profile</h3>
                            <div className="image-container" onClick={handleImageClick}>
                                {image? <img src={image} alt="User profile" /> : <img src="/images/user-avatar.png" alt="Default user image" />}
                            </div> 
                            <p onClick={() => setIsBioExpanded(!isBioExpanded)}><strong>Bio: </strong>
                                    {isBioExpanded ? fullBio : shortBio}
                                    {wordCount > 40 && <span style={{color: 'green', cursor: 'pointer'}}> {isBioExpanded ? 'Read Less' : 'Read More'}</span>}
                            </p>
                            <div className="skills">
                                <p><strong>Interests:</strong></p>
                                {user?.skills? user.skills.map((skill, index) => (<span key={index} style={{paddingLeft:10, fontWeight:200}}>{skill}</span>)) : "Skills"}
                            </div>
                                <p><strong>Email: </strong>{user?.email? user?.email : "Email"}</p>
                                <p><strong>Location: </strong>{user?.location? user.location : "State"}</p>
                                <p><strong>Reason for account: </strong>{user?.category? user.category : "Category"}</p>
                            </div>
                        </div>

                    </Col>
                    <Col sm={12} md={12} lg={4}>
                    <div className="profile-container">
                        <h3>My Likes</h3>
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
                                    <div style={{display: 'flex'}}>
                                        <div className="logo-wrapper" >
                                            <img src={favorite?.schoolDetails?.logoUrl} alt="program logo"/>
                                        </div>
                                        <div style={{textAlign:"left", marginLeft: 30}}>
                                            <p><strong>{favorite?.schoolDetails?.name}</strong></p>
                                            <p><small>{favorite?.programDetails?.name}</small></p>
                                            <p><small>{favorite?.schoolDetails?.industry}</small></p>
                                            <p><small>{date.toLocaleDateString()}</small></p>
                                        </div>
                                    </div>
                                    {!showApply? (
                                    <button className="button-class m-3" onClick={handleShowApply}>
                                            Apply
                                    </button> 
                                    ) : (
                                        <Apply program={favorite?.programDetails?._id} />
                                    )}
                                </div>
                                );
                            })
                            ) : 
                                <p>No favorites yet</p>
                            }
                            </div>
                        </div>
                        </Col>
                        <Col sm={12} md={12} lg={4}>
                        <div className="profile-container">
                            <h3>My Applications</h3>
                                {isLoading ? (
                                    <Spinner animation="border" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                    </Spinner>
                                ) : applications?.length > 0?
                                applications?.map((application, index) => {
                                    const date = new Date(application?.date)
                                    return (
                                    <div key={index} className="favorite">
                                        <div style={{display: 'flex'}}>
                                            <div className="logo-wrapper">
                                                <img src={application?.schoolDetails?.logoUrl} alt="program logo" />
                                            </div>
                                            <div style={{textAlign:"left", marginLeft: 30}}>
                                                <p><strong>{application?.schoolDetails?.name}</strong></p>
                                                <p><small>{application?.programDetails?.name}</small></p>
                                                <p><small>{date.toLocaleDateString()}</small></p>
                                            </div>
                                        </div>
                                        {!showMessage? (
                                        <button className="button-class m-3" onClick={handleShowMessage}>
                                            Message School
                                        </button>
                                        ) : (
                                            <Message school={application.schoolDetails?._id} />
                                        )
                                        }
                                    </div>
                                    
                                    )}) : 
                                    <p>No applications yet</p>
                                }
                                </div>
                            </Col>
                    </Row>
            </Container>
        </AppLayout> ) :
        
         (
            // ---------------------------- MEMBERS ----------------------------------
            <AppLayout>
            <Container className="profile">
            <h1>{user?.name?  user.name : "Name"} {user?.lastName? `${user.lastName}'s BOE Account` : ""}</h1>
                <Row>
                    <Col sm={12} md={12} lg={6}>
                        <div className="profile-container-member">
                   
                            <h3>My Entries</h3>
                            <p onClick={() => setIsBioExpanded(!isBioExpanded)}><strong>Bio: </strong>
                                    {isBioExpanded ? fullBio : shortBio}
                                    {wordCount > 40 && <span style={{color: 'green', cursor: 'pointer'}}> {isBioExpanded ? 'Read Less' : 'Read More'}</span>}
                            </p>
                            <div className="skills">
                                <p><strong>Interests:</strong></p>
                                {user?.skills? user.skills.map((skill, index) => (<span key={index} style={{paddingLeft:10, fontWeight:200}}>{skill}</span>)) : "Skills"}
                            </div>
                                <p><strong>Email: </strong>{user?.email? user?.email : "Email"}</p>
                                <p><strong>Location: </strong>{user?.location? user.location : "State"}</p>
                                <p><strong>Reason for account: </strong>{user?.category? user.category : "Category"}</p>
                                <button className="button-class m-3" onClick={() => navigate('/programs')}>Add program</button>
                        </div>
   
                    </Col>
                    <Col sm={12} md={12} lg={6}>
                    <div className="profile-container-member">
                        <h3>My Likes</h3>
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
                                    <div style={{display: 'flex'}}>
                                        <div className="logo-wrapper" >
                                        {favorite.userDetails.avatar? <img src={favorite.userDetails.avatar} alt="User profile" /> : <img src="/images/user-avatar.png" alt="Default user image" />}
                                        </div>
                                        <div style={{textAlign:"left", marginLeft: 30}}>
                                            <p><strong>{favorite?.userDetails?.name} {favorite?.userDetails?.lastName}</strong></p>
                                            <p><small>{favorite?.userDetails?.email}</small></p>
                                            <p><small>Liked <strong>{favorite?.programDetails?.name}</strong></small></p>
                                            <p><small>{date.toLocaleDateString()}</small></p>
                                        </div>
                                    </div>
                                </div>
                                );
                            })
                            ) : 
                                <p>No favorites yet</p>
                            }
                            </div>
                        </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col sm={12} md={12} lg={6}>
                        <div className="profile-container-member">
                            <h3>My Applications</h3>
                                {isLoading ? (
                                    <Spinner animation="border" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                    </Spinner>
                                ) : applications?.length > 0?
                                applications?.map((application, index) => {
                                    const date = new Date(application?.date)
                                    return (
                                    <div key={index} className="favorite">
                                        <div style={{display: 'flex'}}>
                                            <div className="logo-wrapper">
                                                <img src={application?.schoolDetails?.logoUrl} alt="program logo" />
                                            </div>
                                            <div style={{textAlign:"left", marginLeft: 30}}>
                                                <p><strong>{application?.schoolDetails?.name}</strong></p>
                                                <p><small>{application?.programDetails?.name}</small></p>
                                                <p><small>{date.toLocaleDateString()}</small></p>
                                            </div>
                                        </div>
                                        {!showMessage? (
                                        <button className="button-class m-3" onClick={handleShowMessage}>
                                            Message School
                                        </button>
                                        ) : (
                                            <Message school={application.schoolDetails?._id} />
                                        )
                                        }
                                    </div>
                                    
                                    )}) : 
                                    <p>No applications yet</p>
                                }
                                </div>
                            </Col>
                            <Col sm={12} md={12} lg={6}>
                                <div className="profile-container-member">
                                    <h3>My Applications</h3>
                                        {isLoading ? (
                                            <Spinner animation="border" role="status">
                                            <span className="visually-hidden">Loading...</span>
                                            </Spinner>
                                        ) : messages?.length > 0?
                                        messages?.map((application, index) => {
                                            const date = new Date(application?.date)
                                            return (
                                            <div key={index} className="favorite">
                                                <div style={{display: 'flex'}}>
                                                    <div className="logo-wrapper">
                                                        <img src={application?.schoolDetails?.logoUrl} alt="program logo" />
                                                    </div>
                                                    <div style={{textAlign:"left", marginLeft: 30}}>
                                                        <p><strong>{application?.schoolDetails?.name}</strong></p>
                                                        <p><small>{application?.programDetails?.name}</small></p>
                                                        <p><small>{date.toLocaleDateString()}</small></p>
                                                    </div>
                                                </div>
                                                {!showMessage? (
                                                <button className="button-class m-3" onClick={handleShowMessage}>
                                                    Message School
                                                </button>
                                                ) : (
                                                    <Message school={application.schoolDetails?._id} />
                                                )
                                                }
                                            </div>
                                            
                                            )}) : 
                                            <p>No applications yet</p>
                                        }
                                </div>
                            </Col>
                        </Row>
            </Container>
        </AppLayout>
        )
    )
}