import { Col, Container, Row } from "react-bootstrap";
import AppLayout from "../layout/AppLayout";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../App";
import Subscribe from "../components/Subscribe";
import { PencilFill } from "react-bootstrap-icons";

export default function Profile() {
    const [user, setUser] = useContext(UserContext)
    const navigate = useNavigate()

    useEffect(() => {
        if (!user) {
            navigate('/signup');
            return;
        }
    } , [])
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
                            <div className="profile-info">
                                <h2>{user?.firstName} {user?.lastName}</h2>
                                <p>{user?.email}</p>
                                <p>{user?.bio}</p>
                                <p>{user?.city}, {user?.state}</p>
                                <p>{user?.category}</p>
                                {user?.skills?.map((skill, index) => (<span key={index} style={{paddingLeft:10, fontWeight:300}}>{skill}</span>))}
                            </div>
                        </div>
                    </Col>
                    <Col sm={12} md={6}>
                        <div className="favorites-container">
                            <h3>Favorites</h3>
                        </div>
                    </Col>
                </Row>
            </Container>
        </AppLayout>
    )
}