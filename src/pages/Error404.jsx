import React from 'react';
import { Helmet } from 'react-helmet';
import { Col, Container, Row } from 'react-bootstrap';
import AppLayout from '../layout/AppLayout';

export default function Error404() {
  return (
    <AppLayout>
      <Helmet>
        <title>Page Not Found - BOE</title>
        <meta name="description" content="The page you are looking for does not exist. Please check the URL or return to the home page." />
      </Helmet>
      <Container style={{ height: "80vh", textAlign: "center" }}>
        <Row>
          <Col>
            <h1>Error 404</h1>
            <h2>Page not found</h2>
          </Col>
        </Row>
      </Container>
    </AppLayout>
  );
}
