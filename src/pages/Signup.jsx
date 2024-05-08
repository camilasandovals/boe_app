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
    <seccion
      style={{
        textAlign: "center",
        alignContent: "center",
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <h1>Sign up</h1>
      <div
        className="row-gap"
        style={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "4rem",
        }}
      >
        <div
          onClick={() => setTypeOfUser("user")}
          style={{
            textAlign: "center",
          }}
        >
          <div className="icon-container">
            <div className="icon-signup">
              <PersonFill color="lightgray" size={"100%"}/>
            </div>
            <p>I am a South Florida resident and looking for skilled trade career opportunities</p>
          </div>
        </div>

        <div
          onClick={() => setTypeOfUser("member")}
          style={{ textAlign: "center" }}
          className="justify-content-center"
        >
          <div className="icon-container">
            <div className="icon-signup">
              <PeopleFill color="lightgray" size={"100%"}/>
            </div>
            <p>I am a trade school or vocational training program based in South Florida looking to
              partner with BOE and connect with future students</p>
          </div>
        </div>
      </div>
    </seccion>
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
