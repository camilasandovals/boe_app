import { Col, Container, Row } from "react-bootstrap";
import AppLayout from "../layout/AppLayout";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../App";
import Subscribe from "../components/Subscribe";
import { PencilFill } from "react-bootstrap-icons";

export default function Profile() {
    const [user, setUser] = useContext(UserContext)
    const navigate = useNavigate()
    return(
        <AppLayout>
            <Container >
                    <h1>Profile</h1>
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
                                <p>{user?.skills}</p>
                            </div>
                        </div>
                    </Col>
                    <Col sm={12} md={6}>
                        <div className="favorites-container">
                            
                        </div>
                    </Col>
                </Row>
            </Container>
        </AppLayout>
    )
}