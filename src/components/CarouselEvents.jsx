import { useEffect, useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';

function CarouselEvents() {
const [events, setEvents] = useState('')

  useEffect (() => {
    fetch("http://localhost:3000/api/events")
    .then(response => response.json())
    .then(setEvents)
    .catch(e => alert(e))
  } ,[])

  return (
    <Carousel fade>
      {!events? "loading" : events.map((event) => (
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={event.image}
          alt="First slide"
        />
        <div className='carousel-content'>
          <h3>{event.title}</h3>
          <p>{event.description}</p>
        </div>
      </Carousel.Item>
      ))}
    </Carousel>
  );
}

export default CarouselEvents;