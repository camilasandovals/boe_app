import { Col, Container, Row } from "react-bootstrap";
import AppLayout from "../layout/AppLayout";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../App";
import Subscribe from "../components/Subscribe";
import { PencilFill } from "react-bootstrap-icons";
import { Spinner } from 'react-bootstrap';
import { useRef } from 'react';

export default function Profile() {
    const fileInputRef = useRef(null);
    const [user, setUser] = useContext(UserContext)
    const [favorites, setFavorites] = useState([])
    const [isBioExpanded, setIsBioExpanded] = useState(false);
    const [img, setImg] = useState("")
    const [isLoading, setIsLoading] = useState(false);
    const wordCount = user?.bio ? user.bio.split(' ').length : 0;
    const shortBio = `${user?.bio?.split(' ').slice(0, 40).join(' ')}${wordCount > 40 ? '...' : ''}`;
    const fullBio = user?.bio;


    const navigate = useNavigate()

    useEffect(() => {
        if (!user) {
          navigate('/signup');
          return;
        }
        setIsLoading(true);  // Start loading
        fetch(`http://localhost:3000/userlikes?user=${user.email}`)
          .then((response) => response.json())
          .then(data => {
            setFavorites(data);
            setIsLoading(false);  // End loading
          })
          .catch(err => {
            console.error(err);
            setIsLoading(false);  // End loading
          });
      }, []);
      
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
            setImg(newImage);
            setUser({...user, image: newImage}); // Update the user object with the new image
          };
        }
    }

    const handleImageClick = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = (event) => {
        convertFile(event.target.files);
    };

    return(
        <AppLayout>
            <Container >
                    <h1></h1>
                <Row>
                    <Col sm={12} md={12} lg={6}>
                        <div className="profile-container">
                        <div style={{alignSelf: 'flex-end'}} onClick={() => {navigate("/account")}}>
                            <PencilFill color="grey" size={30}/>
                        </div>
                        <input type="file" ref={fileInputRef} style={{ display: 'none' }} onChange={handleFileChange} />
                        <div className="image-container" onClick={handleImageClick}>
                            {user?.image? <img src={user.image} alt="User profile" /> : <img src="/images/user-avatar.png" alt="Default user image" />}
                        </div>             
                                <h2>{user?.firstName} {user?.lastName}</h2>
                                <p>{user?.email}</p>
                                <p onClick={() => setIsBioExpanded(!isBioExpanded)}>
                                    {isBioExpanded ? fullBio : shortBio}
                                    {wordCount > 40 && <span style={{color: 'green', cursor: 'pointer'}}> {isBioExpanded ? 'Read Less' : 'Read More'}</span>}
                                </p>
                                <p>{user?.city}, {user?.state}</p>
                                <p>{user?.category}</p>
                            <div className="skills">
                                {user?.skills?.map((skill, index) => (<span key={index} style={{paddingLeft:10, fontWeight:200}}>{skill}</span>))}
                            </div>
                        </div>
                        
                    </Col>
                    <Col sm={12} md={12} lg={6}>
                    <div className="profile-container">
                        <h3>Favorites</h3>
                        <div className="favorites-container" style={isLoading || favorites.filter(favorite => favorite.is_liked).length === 0 ? {overflow: 'hidden'} : {}}>
                            {isLoading ? (
                                <Spinner animation="border" role="status">
                                <span className="visually-hidden">Loading...</span>
                                </Spinner>
                            ) : favorites.filter(favorite => favorite.is_liked).length > 0 ? (
                                favorites.filter(favorite => favorite.is_liked).map((favorite, index) => (
                                <div key={index} className="favorite">
                                    <div className="favorite-info">
                                    <p><strong>{favorite.school}</strong></p>
                                    <small>{favorite.program}</small>
                                    </div>
                                </div>
                                ))) : 
                                <p>No favorites yet</p>
                            }
                        </div>
                    </div>
                </Col>

                </Row>
            </Container>
        </AppLayout>
    )
}