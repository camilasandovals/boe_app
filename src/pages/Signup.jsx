import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import AppLayout from "../layout/AppLayout";
import LoginForm from "../components/LoginForm";
import SignUpMemberForm from "../components/SignUpMemberForm";
import { useContext } from "react";
import { UserContext } from "../App";
import { PeopleFill, PersonFill } from "react-bootstrap-icons";
export default function Login() {
  const [user, setUser] = useContext(UserContext);
  const [typeOfUser, setTypeOfUser] = useState(null);

  const TypeOfUserSelectionView = () => (
    <Container
      style={{
        height: "50vh",
        textAlign: "center",
        alignContent: "center",
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <h1>Sign up</h1>
      <Row
        className="row-gap"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "4rem",
        }}
      >
        <Col
          onClick={() => setTypeOfUser("user")}
          style={{
            textAlign: "center",
          }}
        >
          <div className="icon-container">
            <PersonFill color="lightgray" size={100} />
            <p>I am a person looking for schools</p>
          </div>
        </Col>
        <Col
          onClick={() => setTypeOfUser("member")}
          style={{ textAlign: "center" }}
          className="justify-content-center"
        >
          <div className="icon-container">
            <PeopleFill color="lightgray" size={100} />
            <p>I am a school looking to become a partner</p>
          </div>
        </Col>
      </Row>
    </Container>
  );

  const SignUpUsers = () => (
    <div className="login">
      <h1>Sign up as User</h1>
      <p>
        Are you part of the South Florida community and looking to explore
        career opportunities that don't require a 4-year degree? Create your BOE
        account today and start connecting with programs near you.
      </p>
      <LoginForm endpoint={"api/signup"} setUser={setUser} />
      <p>
        Already a member?{" "}
        <a href="/login">
          <strong>Login</strong>
        </a>
      </p>
    </div>
  );

  const SignUpMembers = () => (
    <div className="login">
      <h1>Sign up as Member</h1>
      <p>
        Are you a vocational school or apprenticeship program in South Florida?
        Create your BOE account today, connect with future students near you,
        and start getting more applicants.
      </p>
      <SignUpMemberForm endpoint={"api/members/signup"} setUser={setUser} />
      <p>
        Already a member?{" "}
        <a href="/login">
          <strong>Login</strong>
        </a>
      </p>
    </div>
  );

  return (
    <AppLayout>
      {!typeOfUser ? (
        <TypeOfUserSelectionView />
      ) : typeOfUser === "user" ? (
        <SignUpUsers />
      ) : (
        <SignUpMembers />
      )}
    </AppLayout>
  );
}
