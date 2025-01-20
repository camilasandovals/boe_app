import React from "react";
import { Helmet } from "react-helmet";
import AppLayout from "../layout/AppLayout";
import Carousel from "../components/CarouselSchools";

export default function About() {
  return (
    <AppLayout>
      <Helmet>
        <title>About Us - BOE</title>
        <meta name="description" content="Learn about BOE, connecting people to careers in skilled trades in South Florida. Discover information and resources for jobs in construction, technology, aviation, and healthcare." />
      </Helmet>
      <section className="about">
      <h1>Connecting People to Careers in the Skilled Trades</h1>
        <div className="row-about">
          
          <div className="about-content">
            
            <h2>Discover Opportunities in South Florida</h2>
            <p className="about-us-text">
              You don't need a 4-year college degree in order to have a
              successful career. Bringing Opportunities Everywhere (BOE) gives
              you the information and resources you need in order to find{" "}
              <strong>jobs</strong> near you in{" "}
              <strong>
                construction, technology, aviation, and healthcare
              </strong>.
            </p>
          </div>
          <div className="about-content">
            <div className="about-main-image">
              <img
                className="about-image"
                src="/images/Guidecover.png"
                alt="A Guide To Careers in the Skilled Trades in South Florida from BOE"
              />
            </div>
          </div>
        </div>

        <div className="row-about reverse-order">
          <div className="about-content">
            <h2>Can't Afford College? No Problem.</h2>
            <p className="about-us-text">
              Students enrolled in <strong>vocational schools</strong> and{" "}
              <strong>apprenticeship</strong> programs are finding financial
              success in their early 20s... without the student loan debt.
            </p>
          </div>
          <div className="about-content">
            <div className="about-image-container">
              <img
                className="about-image"
                src="/images/salaries.png"
                alt="Average Salary for Skilled Trades in South Florida"
              />
            </div>
          </div>
        </div>

        <div className="row-about">
          <div className="about-statistics">
            <h2>$50,000</h2>
            <p className="about-us-text">
              Typical tuition cost for a 4-year, public university in Florida
            </p>
          </div>
          <div className="about-statistics">
            <h2>$80,000+</h2>
            <p className="about-us-text">
              Expected salary for a skilled trade employee in South Florida
            </p>
          </div>
          <div className="about-statistics">
            <h2>$37,090</h2>
            <p className="about-us-text">
              Average federal student loan debt in the US
            </p>
          </div>
        </div>

        <div className="row-about">
          <div className="about-content">
            <h2>Who We Are</h2>
            <p className="about-us-text">
              Bringing Opportunities Everywhere (BOE) was founded on the idea
              that not everyone needs a college degree in order to have a
              successful career. Skilled trade jobs are in high demand, and our
              goal is to connect people with the information and resources they
              need for a path to success. Get started in an industry of your
              choice such as construction, aviation, technology, or healthcare
              and earn a 6-figure salary before age 30, without the student loan
              debt.
            </p>
          </div>
          <div className="about-content">
            <div className="about-image-container">
              <img className="about-image" src="/images/img1.jpg" alt="BOE Academy Member" />
            </div>
          </div>
        </div>

        <div className="row-about reverse-order">
          <div className="about-content">
            <h2>What We Do</h2>
            <p className="about-us-text">
              BOE is your one-stop shop for becoming a skilled trade employee.
              We connect people with incredible training programs by partnering
              with over 25 vocational schools and apprenticeship programs. The
              best part? Everything we offer is free of charge.
            </p>
          </div>
          <div className="about-content">
            <div className="about-image-container">
              <img
                className="about-image"
                src="/images/img2.JPEG"
                alt="Construction Spending and Employment Forecast in South Florida"
              />
            </div>
          </div>
        </div>

        <div className="row-about">
          <div className="about-content">
            <h2>Get Involved</h2>
            <p className="about-us-text">
              Create a free user account for access to exclusive BOE content
              including interviews with our partner schools, up-to-date cost
              information, and research about the best local opportunities
              throughout South Florida. If you are an organization that would
              like to partner with BOE for an event, feel free to contact us!
            </p>
          </div>
          <div className="about-content">
            <div className="about-image-container">
              <img className="about-image" src="/images/img3.JPEG" alt="Bootcamp Grads Salary in South Florida" />
            </div>
          </div>
        </div>
        <Carousel />
      </section>
    </AppLayout>
  );
}