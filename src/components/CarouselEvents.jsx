import { useEffect, useState } from "react";
import Carousel from "react-bootstrap/Carousel";

function CarouselEvents() {
  const [events, setEvents] = useState("");

  useEffect(() => {
    fetch("https://boepartners-api.web.app/api/events")
      .then((response) => response.json())
      .then(setEvents)
      .catch((e) => alert(e));
  }, []);

  return (
    <Carousel fade>
      {!events
        ? "loading"
        : events.map((event) => (
            <Carousel.Item>
              <img
                className="d-block w-100"
                src={event.image}
                alt="BOE Vocational School"
              />
              <div className="carousel-content">
                <p>
                  <strong>{event.title}</strong>
                </p>
                <p>{event.description}</p>
              </div>
            </Carousel.Item>
          ))}
    </Carousel>
  );
}

export default CarouselEvents;
