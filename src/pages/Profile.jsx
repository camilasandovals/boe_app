import { Col, Container, Row } from "react-bootstrap";
import AppLayout from "../layout/AppLayout";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../App";
import Subscribe from "../components/Subscribe";
import { PencilFill } from "react-bootstrap-icons";

export default function Profile() {
    const [user, setUser] = useContext(UserContext)
    const [favorites, setFavorites] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        if (!user) {
            navigate('/signup');
            return;
        }
        fetch(`http://localhost:3000/userlikes?user=${user.email}`)
            .then((response) => response.json())
            .then(setFavorites)
            .catch(console.error);
        }, []);


    return(
        <AppLayout>
            <Container >
                    <h1></h1>
                <Row>
                    <Col sm={12} md={6}>
                        <div className="profile-container">
                        <div style={{alignSelf: 'flex-end', padding:25}} onClick={() => {navigate("/account")}}>
                            <PencilFill color="grey" size={30}/>
                        </div>
                            <div className="image-container"> 
                                {user?.image? <img src={user.image} alt="User profile" /> : <img src="/images/user-avatar.png" alt="Default user image" />}
                            </div>
                                <h2>{user?.firstName} {user?.lastName}</h2>
                                <p>{user?.email}</p>
                                <p>{user?.bio}</p>
                                <p>{user?.city}, {user?.state}</p>
                                <p>{user?.category}</p>
                            <div className="skills">
                                {user?.skills?.map((skill, index) => (<span key={index} style={{paddingLeft:10, fontWeight:200}}>{skill}</span>))}
                            </div>
                        </div>
                    </Col>
                    <Col sm={12} md={6}>
                        <div className="profile-container">
                            <h3>Favorites</h3>
                        <div className="favorites-container">
                            {favorites? favorites.filter(favorite => favorite.is_liked).map((favorite, index) => (
                                <div key={index} className="favorite">
                                    {/* <div className="favorite-image">
                                        <img src={favorite.image} alt="School logo" />
                                    </div> */}
                                    <div className="favorite-info">
                                        <p><strong>{favorite.school}</strong></p>
                                        <p>{favorite.program}</p>
                                    </div>
                                </div>
                            )
                            ) : <p>No favorites yet</p>}
                        </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </AppLayout>
    )
}