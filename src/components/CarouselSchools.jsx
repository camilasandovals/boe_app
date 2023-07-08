export default function Carousel() {
    return(
    <>
        <div className="slider ">
            <div className="slide-track ">
            {renderSlides()}
            {renderSlides()}
            </div>
        </div>
    </>
    )
}

function renderSlides() {
    const slides = [
        "../images/company-logos/ironhack.png",
        "../images/company-logos/atlantis-aviation.png",
        "../images/company-logos/paul-mitchell-mia.jpeg",
        "../images/company-logos/yatc.png",
        "../images/company-logos/plumbers-519.png",
        "../images/company-logos/abc-institute.png",
        "https://d92mrp7hetgfk.cloudfront.net/images/sites/misc/4G_LOGO_NEGRO-01__1_/original.png?1560209943",
        "https://www.brighteducationinstitute.com/wp-content/uploads/2021/08/BEI.png",
        "https://res-1.cloudinary.com/crunchbase-production/image/upload/c_lpad,h_256,w_256,f_auto,q_auto:eco/srbjs6l8gsg2lscg2p6j",
        "https://arpec.org/wp-content/uploads/2021/11/cropped-ARPEC-logo-2021.png",
        "https://floridatrainingservices.com/wp-content/themes/fltrnsvc/images/header-logo.png",
        "https://wepowerfl.com/wp-content/uploads/2020/06/International-Brotherhood-of-Electrical-Workers-IBEW-Union-Contractors.png",
        "https://southfloridatechnicaltraining.com/logo.svg"
    ];

    return slides.map((slide, index) => (
        <div key={index} className="slide">
            <img src={slide} height="100" width="100" alt="" />
        </div>
    ));
}
