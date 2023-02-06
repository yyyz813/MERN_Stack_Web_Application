import React, { useState, useEffect } from 'react';
import { Carousel } from 'react-bootstrap'
import "./carousel.css"

const MyCarousel = ()=> {
    const [index, setIndex] = useState(0);
    const handleSelect = (selectedIndex, e) => {
      setIndex(selectedIndex);
    };
  
    return (
      <Carousel className='myCarousel' activeIndex={index} onSelect={handleSelect}>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="/img/carousel1.jpg"
            alt="First slide"
          />
          <Carousel.Caption>
            <h3>Welcome master!</h3>
            <p>We gethering world's leading tuitors</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="/img/carousel2.jpg"
            alt="Second slide"
          />
  
          <Carousel.Caption>
            <h3>Our tutors!</h3>
            <p>Learn more about them</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="/img/carousel3.jpg"
            alt="Third slide"
          />
  
          <Carousel.Caption>
            <h3>Explore!</h3>
            <p>Browse our tutor gallery</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    );
}
  
export default MyCarousel;