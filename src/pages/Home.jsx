import { Col, Container, Row } from "react-bootstrap";
import AppLayout from "../layout/AppLayout";
import SchoolListing from "../components/SchoolListing";
import Hero from "../components/Hero";
import SignModal from "../components/SignModal";

export default function Home() {
    return(
        <AppLayout>
            <Hero />
                <SignModal />
                <SchoolListing />
        </AppLayout>
    )
}