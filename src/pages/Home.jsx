import React from 'react';
import { Helmet } from 'react-helmet';
import { Col, Container, Row } from 'react-bootstrap';
import AppLayout from '../layout/AppLayout';
import SchoolListing from '../components/SchoolListing';
import Hero from '../components/Hero';
import SignModal from '../components/SignModal';

export default function Home() {
  return (
    <AppLayout>
      <Helmet>
        <title>Home - Vocational Schools and Skilled Trades in South Florida</title>
        <meta name="description" content="Discover vocational schools and academies in Miami, Fort Lauderdale, and all the South Florida Area. Skilled trade jobs are in high demand, and Bringing opportunities everywhere's goal is to connect people with the information and resources they need for a path to success!" />
      </Helmet>
      <Hero />
      <SignModal />
      <SchoolListing />
    </AppLayout>
  );
}
