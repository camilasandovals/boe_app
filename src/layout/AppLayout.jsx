import { Container } from "react-bootstrap";
import NavMenu from "./NavMenu";
import Footer from "./Footer";

export default function AppLayout({children}) {
    return(
        <div className="app-layout">
            <NavMenu />
            <div className="content">
                {children}
            </div>
            <Footer />
        </div>
    )
}